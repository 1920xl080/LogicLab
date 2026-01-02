import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Alert } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { ThemedView } from '@/components/themed-view';
import { Ionicons } from '@expo/vector-icons';

export default function AuthScreen() {
  const { loginWithGoogle } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const success = await loginWithGoogle();
      if (success) {
        router.replace('/dashboard');
      } else {
        Alert.alert('Login Failed', 'Please use a valid STEI ITB student email (@std.stei.itb.ac.id)');
      }
    } catch (error) {
      Alert.alert('Error', 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <ThemedView style={styles.content}>
        <View style={styles.center}>
          <View style={styles.iconContainer}>
            <Ionicons name="log-in-outline" size={56} color="#2563eb" />
          </View>

          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.subtitle}>
            Sign in to continue your learning journey
          </Text>

          <Card style={styles.card}>
            <CardContent>
              <Button
                title={isLoading ? 'Signing in...' : 'Sign in with Google'}
                onPress={handleGoogleLogin}
                disabled={isLoading}
                size="lg"
                style={styles.button}
              />

              <View style={styles.infoBox}>
                <Text style={styles.infoText}>
                  Only STEI ITB student accounts (@std.stei.itb.ac.id) are allowed
                </Text>
              </View>
            </CardContent>
          </Card>
        </View>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 40,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  center: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#eff6ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
    color: '#111827',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 40,
    textAlign: 'center',
  },
  card: {
    width: '100%',
    maxWidth: 400,
  },
  button: {
    width: '100%',
    marginBottom: 16,
  },
  infoBox: {
    backgroundColor: '#f3f4f6',
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  infoText: {
    fontSize: 13,
    color: '#6b7280',
    lineHeight: 18,
    textAlign: 'center',
  },
});
