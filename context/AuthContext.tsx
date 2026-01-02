import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as WebBrowser from 'expo-web-browser';

// Complete the OAuth flow in the browser
WebBrowser.maybeCompleteAuthSession();

export type User = {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'lecturer';
  enrolledClasses?: string[];
  completedChallenges?: { challengeId: string; score: number; date: string }[];
};

export type AuthContextType = {
  user: User | null;
  loginWithGoogle: () => Promise<boolean>;
  logout: () => Promise<void>;
  saveCompletedChallenge: (challengeId: string, score: number, totalPoints: number) => Promise<void>;
  isLoggingOut?: boolean;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [loading, setLoading] = useState(true);
  const isLoggingOutRef = useRef(false);
  const isHandlingAuthRef = useRef(false);
  const handledUserIdRef = useRef<string | null>(null);

  useEffect(() => {
    // Check if user is logged in (from AsyncStorage)
    const loadUser = async () => {
      try {
        const savedUser = await AsyncStorage.getItem('virtualLabUser');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error('Error loading user:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session?.user?.email || 'no user');
      
      if (session?.user) {
        if (handledUserIdRef.current === session.user.id && isHandlingAuthRef.current) {
          console.log('⏭️ Skipping duplicate auth handling for user:', session.user.email);
          return;
        }
        console.log('✅ User authenticated:', session.user.email);
        await handleAuthUser(session.user);
      } else if (event === 'SIGNED_OUT') {
        console.log('✅ User signed out via Supabase');
        handledUserIdRef.current = null;
        isHandlingAuthRef.current = false;
        setUser(null);
        await AsyncStorage.removeItem('virtualLabUser');
      }
    });

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        if (handledUserIdRef.current !== session.user.id) {
          console.log('✅ Existing session found:', session.user.email);
          handleAuthUser(session.user);
        }
      } else {
        console.log('ℹ️ No existing session');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleAuthUser = async (authUser: any) => {
    if (isHandlingAuthRef.current && handledUserIdRef.current === authUser.id) {
      console.log('⏭️ Auth handling already in progress for user:', authUser.id);
      return;
    }

    isHandlingAuthRef.current = true;
    const email = authUser.email || '';
    
    // Check email domain restriction
    const allowedDomain = process.env.EXPO_PUBLIC_ALLOWED_EMAIL_DOMAIN || 'std.stei.itb.ac.id';
    if (allowedDomain && !email.endsWith(`@${allowedDomain}`)) {
      isHandlingAuthRef.current = false;
      await supabase.auth.signOut();
      setUser(null);
      handledUserIdRef.current = null;
      return;
    }

    // Create base user data
    const baseUserData: User = {
      id: authUser.id,
      name: authUser.user_metadata?.full_name || email.split('@')[0],
      email: email,
      role: 'student',
      enrolledClasses: [],
      completedChallenges: []
    };

    try {
      // Try to check if user exists in database
      const { data: existingUser, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('id', authUser.id)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        console.warn('Error fetching user from database:', fetchError);
      } else if (!existingUser) {
        // Create new user in database
        const { error: insertError } = await supabase.from('users').insert({
          id: authUser.id,
          email: email,
          name: authUser.user_metadata?.full_name || email.split('@')[0],
          role: 'student'
        });
        
        if (insertError) {
          console.warn('Error creating user in database (non-critical):', insertError);
        }
      }

      // Sync any backup submissions
      await syncBackupSubmissions(authUser.id);

      // Try to fetch user's completed challenges from database
      const { data: submissions, error: submissionsError } = await supabase
        .from('user_challenge_submissions')
        .select('challenge_id, score, submitted_at')
        .eq('user_id', authUser.id);

      if (!submissionsError && submissions && submissions.length > 0) {
        baseUserData.completedChallenges = submissions.map((sub: any) => ({
          challengeId: sub.challenge_id,
          score: sub.score,
          date: sub.submitted_at
        }));
      }
    } catch (error) {
      console.error('Error during database operations (non-critical):', error);
    }

    // Always set user state
    setUser(baseUserData);
    await AsyncStorage.setItem('virtualLabUser', JSON.stringify(baseUserData));
    handledUserIdRef.current = authUser.id;
    isHandlingAuthRef.current = false;
    
    console.log('User authenticated:', baseUserData.email);
  };

  const syncBackupSubmissions = async (userId: string) => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const backupKeys = keys.filter(key => key.startsWith('challenge_submission_backup_'));

      if (backupKeys.length === 0) {
        return;
      }

      console.log(`Found ${backupKeys.length} backup submission(s) to sync...`);

      for (const key of backupKeys) {
        try {
          const backupData = await AsyncStorage.getItem(key);
          if (!backupData) continue;

          const backup = JSON.parse(backupData);
          
          if (backup.userId !== userId) {
            continue;
          }

          const { error } = await supabase
            .from('user_challenge_submissions')
            .upsert({
              user_id: userId,
              challenge_id: backup.challengeId,
              score: backup.score,
              total_points: backup.totalPoints,
              submitted_at: backup.timestamp || new Date().toISOString()
            }, {
              onConflict: 'user_id,challenge_id'
            });

          if (!error) {
            await AsyncStorage.removeItem(key);
            console.log(`✅ Synced backup submission for challenge: ${backup.challengeId}`);
          }
        } catch (error) {
          console.error(`Error processing backup ${key}:`, error);
        }
      }
    } catch (error) {
      console.error('Error syncing backup submissions:', error);
    }
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    try {
      const redirectUrl = process.env.EXPO_PUBLIC_PRODUCTION_URL || 'exp://localhost:8081';
      
      console.log('OAuth redirect to:', redirectUrl);
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
            hd: process.env.EXPO_PUBLIC_ALLOWED_EMAIL_DOMAIN || 'std.stei.itb.ac.id'
          }
        }
      });

      if (error) {
        console.error('Google OAuth error:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Unexpected error during login:', error);
      return false;
    }
  };

  const logout = async () => {
    if (isLoggingOutRef.current) {
      console.log('Logout already in progress');
      return;
    }

    isLoggingOutRef.current = true;
    setIsLoggingOut(true);
    
    console.log('Starting logout process...');
    
    setUser(null);
    await AsyncStorage.removeItem('virtualLabUser');
    
    supabase.auth.signOut().catch((error) => {
      console.error('Supabase logout error (non-blocking):', error);
    });
    
    console.log('✅ Logout successful');
    setIsLoggingOut(false);
    isLoggingOutRef.current = false;
  };

  const saveCompletedChallenge = async (challengeId: string, score: number, totalPoints: number) => {
    if (!user) {
      throw new Error('User not logged in');
    }

    // Update local state immediately
    const existingIndex = user.completedChallenges?.findIndex(
      c => c.challengeId === challengeId
    ) ?? -1;
    
    const updatedCompletedChallenges = existingIndex >= 0
      ? user.completedChallenges!.map((c, index) =>
          index === existingIndex
            ? { challengeId, score, date: new Date().toISOString() }
            : c
        )
      : [
          ...(user.completedChallenges || []),
          { challengeId, score, date: new Date().toISOString() }
        ];

    const updatedUser = {
      ...user,
      completedChallenges: updatedCompletedChallenges
    };

    setUser(updatedUser);
    await AsyncStorage.setItem('virtualLabUser', JSON.stringify(updatedUser));

    // Try to save to database
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !session?.user) {
      console.warn('⚠️ No active Supabase session, saving to AsyncStorage only');
      
      const backupKey = `challenge_submission_backup_${challengeId}`;
      const backupData = {
        challengeId,
        score,
        totalPoints,
        userId: user.id,
        timestamp: new Date().toISOString()
      };
      await AsyncStorage.setItem(backupKey, JSON.stringify(backupData));
      console.log('💾 Saved to AsyncStorage backup:', backupData);
      return;
    }

    const userId = session.user.id;

    // Try to save to database with retries
    const maxRetries = 3;
    let saveSuccess = false;
    let lastError: any = null;

    for (let attempt = 0; attempt < maxRetries && !saveSuccess; attempt++) {
      try {
        if (attempt > 0) {
          const delay = Math.min(1000 * Math.pow(2, attempt - 1), 5000);
          console.log(`⏳ Retrying save (attempt ${attempt + 1}/${maxRetries}) after ${delay}ms...`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }

        const { error: upsertError } = await supabase
          .from('user_challenge_submissions')
          .upsert({
            user_id: userId,
            challenge_id: challengeId,
            score: score,
            total_points: totalPoints,
            submitted_at: new Date().toISOString()
          }, {
            onConflict: 'user_id,challenge_id'
          });

        if (!upsertError) {
          saveSuccess = true;
          console.log('✅ Database save successful!');
          break;
        }

        lastError = upsertError;
        console.warn(`⚠️ Upsert error (attempt ${attempt + 1}):`, upsertError);
      } catch (error: any) {
        lastError = error;
        console.error(`❌ Save attempt ${attempt + 1} failed with exception:`, error);
      }
    }

    // If all retries failed, save to AsyncStorage as backup
    if (!saveSuccess && lastError) {
      console.warn('Database save failed after all retries, saving to AsyncStorage as backup');
      const backupKey = `challenge_submission_backup_${challengeId}`;
      await AsyncStorage.setItem(backupKey, JSON.stringify({
        challengeId,
        score,
        totalPoints,
        userId,
        timestamp: new Date().toISOString()
      }));
      throw lastError;
    }
  };

  const value: AuthContextType = {
    user,
    loginWithGoogle,
    logout,
    saveCompletedChallenge,
    isLoggingOut,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

