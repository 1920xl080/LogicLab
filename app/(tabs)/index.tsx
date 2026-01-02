import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const { user } = useAuth();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ThemedView style={styles.content}>
        {/* Clean Hero Section */}
        <View style={styles.hero}>
          <View style={styles.iconContainer}>
            <Ionicons name="school-outline" size={48} color="#2563eb" />
          </View>
          <Text style={styles.heroTitle}>
            Computational Thinking Lab
          </Text>
          <Text style={styles.heroSubtitle}>
            Master problem-solving skills through interactive challenges
          </Text>
          <Link href={user ? "/challenges" : "/auth"} asChild>
            <Button
              title="Get Started"
              onPress={() => { }}
              size="lg"
              style={styles.ctaButton}
            />
          </Link>
        </View>

        {/* About Section */}
        <Card style={styles.aboutCard}>
          <CardHeader>
            <CardTitle>About This Lab</CardTitle>
          </CardHeader>
          <CardContent>
            <Text style={styles.aboutText}>
              An educational platform designed to help ITB students develop computational
              thinking skills through interactive challenges and hands-on learning.
            </Text>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <View style={styles.features}>
          <Text style={styles.sectionTitle}>What You'll Get</Text>

          <Card style={styles.featureCard}>
            <View style={styles.featureIcon}>
              <Ionicons name="trophy-outline" size={24} color="#2563eb" />
            </View>
            <CardTitle style={styles.featureTitle}>Interactive Challenges</CardTitle>
            <Text style={styles.featureText}>
              10+ curated exercises across multiple difficulty levels
            </Text>
          </Card>

          <Card style={styles.featureCard}>
            <View style={styles.featureIcon}>
              <Ionicons name="flash-outline" size={24} color="#2563eb" />
            </View>
            <CardTitle style={styles.featureTitle}>Instant Feedback</CardTitle>
            <Text style={styles.featureText}>
              Real-time evaluation with detailed explanations
            </Text>
          </Card>

          <Card style={styles.featureCard}>
            <View style={styles.featureIcon}>
              <Ionicons name="stats-chart-outline" size={24} color="#2563eb" />
            </View>
            <CardTitle style={styles.featureTitle}>Track Progress</CardTitle>
            <Text style={styles.featureText}>
              Monitor your achievements and completion rates
            </Text>
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
  content: {
    paddingBottom: 40,
  },
  hero: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 60,
    backgroundColor: '#ffffff',
  },
  iconContainer: {
    marginBottom: 24,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    color: '#111827',
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  heroSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#6b7280',
    marginBottom: 32,
    lineHeight: 24,
    maxWidth: 320,
  },
  ctaButton: {
    minWidth: 160,
  },
  aboutCard: {
    marginHorizontal: 20,
    marginTop: 32,
  },
  aboutText: {
    fontSize: 15,
    lineHeight: 24,
    color: '#6b7280',
  },
  features: {
    marginTop: 40,
    marginHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 20,
    letterSpacing: -0.3,
  },
  featureCard: {
    marginBottom: 16,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#eff6ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 16,
    marginBottom: 6,
  },
  featureText: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
});
