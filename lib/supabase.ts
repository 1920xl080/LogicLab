import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

// Get environment variables from Expo Constants
const supabaseUrl = Constants.expoConfig?.extra?.supabaseUrl || process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = Constants.expoConfig?.extra?.supabaseAnonKey || process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Missing Supabase environment variables. ' +
    'Please ensure your app.json or .env file contains:\n' +
    '  EXPO_PUBLIC_SUPABASE_URL=your-url-here\n' +
    '  EXPO_PUBLIC_SUPABASE_ANON_KEY=your-key-here'
  );
}

// Create and export Supabase client
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);

// TypeScript Types for Database Tables
export type User = {
  id: string;
  email: string;
  name: string;
  role: string;
  created_at: string;
  updated_at: string;
};

export type Challenge = {
  id: string;
  title: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  total_points: number;
  created_at: string;
};

export type UserChallengeSubmission = {
  id: string;
  user_id: string;
  challenge_id: string;
  score: number;
  total_points: number;
  submitted_at: string;
};

// Database Helper Functions
export async function getAllChallenges() {
  const { data, error } = await supabase
    .from('challenges')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching challenges:', error);
    return [];
  }

  return data as Challenge[];
}

export async function getUserSubmissions(userId: string) {
  const { data, error } = await supabase
    .from('user_challenge_submissions')
    .select(`
      *,
      challenges (
        id,
        title,
        category,
        difficulty,
        total_points
      )
    `)
    .eq('user_id', userId)
    .order('submitted_at', { ascending: false });

  if (error) {
    console.error('Error fetching submissions:', error);
    return [];
  }

  return data;
}

export async function submitChallengeScore(
  userId: string,
  challengeId: string,
  score: number,
  totalPoints: number
) {
  const { data, error } = await supabase
    .from('user_challenge_submissions')
    .upsert(
      {
        user_id: userId,
        challenge_id: challengeId,
        score: score,
        total_points: totalPoints,
        submitted_at: new Date().toISOString()
      },
      {
        onConflict: 'user_id,challenge_id',
      }
    )
    .select()
    .single();

  if (error) {
    console.error('Error submitting score:', error);
    throw error;
  }

  return data;
}

