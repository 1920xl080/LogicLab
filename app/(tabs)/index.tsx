import React from 'react';
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import { Link } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { FadeInView } from '@/components/ui/FadeInView';
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
          <FadeInView delay={0}>
            <View style={styles.iconContainer}>
              <Ionicons name="school-outline" size={48} color="#2563eb" />
            </View>
          </FadeInView>
          <FadeInView delay={100}>
            <Text style={styles.heroTitle}>
              Computational Thinking Lab
            </Text>
          </FadeInView>
          <FadeInView delay={200}>
            <Text style={styles.heroSubtitle}>
              Master problem-solving skills through interactive challenges
            </Text>
          </FadeInView>
          <FadeInView delay={300}>
            <Link href={user ? "/challenges" : "/auth"} asChild>
              <Button
                title="Get Started"
                onPress={() => { }}
                size="lg"
                style={styles.ctaButton}
              />
            </Link>
          </FadeInView>
        </View>

        {/* Second Section - Black Background */}
        <View style={styles.blackSection}>
          <FadeInView delay={400}>
            <View style={styles.heroImageContainer}>
              <Image
                source={require('@/assets/images/Plaza_Widya_Nusantara.jpg')}
                style={styles.heroImage}
                resizeMode="cover"
              />
            </View>
          </FadeInView>

          {/* About Section */}
          <FadeInView delay={500}>
            <Card style={styles.aboutCard}>
              <CardHeader>
                <CardTitle style={styles.aboutTitleWhite}>About This Lab</CardTitle>
              </CardHeader>
              <CardContent>
                <Text style={styles.aboutTextWhite}>
                  An educational platform designed to help ITB students develop computational
                  thinking skills through interactive challenges and hands-on learning.
                </Text>
              </CardContent>
            </Card>
          </FadeInView>

          {/* Second Hero Image */}
          <FadeInView delay={600}>
            <View style={styles.heroImageContainer}>
              <Image
                source={require('@/assets/images/computer-screen-that-says-start-top-right-corner.jpg')}
                style={styles.heroImage}
                resizeMode="cover"
              />
            </View>
          </FadeInView>
        </View>

        {/* Third Section - Grey Background */}
        <View style={styles.greySection}>
          <FadeInView delay={700}>
            <Text style={styles.sectionTitle}>What You'll Get</Text>
          </FadeInView>

          <FadeInView delay={800}>
            <Card style={styles.featureCard}>
              <View style={styles.featureIcon}>
                <Ionicons name="trophy-outline" size={24} color="#2563eb" />
              </View>
              <CardTitle style={styles.featureTitle}>Interactive Challenges</CardTitle>
              <Text style={styles.featureText}>
                10+ curated exercises across multiple difficulty levels
              </Text>
            </Card>
          </FadeInView>

          <FadeInView delay={900}>
            <Card style={styles.featureCard}>
              <View style={styles.featureIcon}>
                <Ionicons name="flash-outline" size={24} color="#2563eb" />
              </View>
              <CardTitle style={styles.featureTitle}>Instant Feedback</CardTitle>
              <Text style={styles.featureText}>
                Real-time evaluation with detailed explanations
              </Text>
            </Card>
          </FadeInView>

          <FadeInView delay={1000}>
            <Card style={styles.featureCard}>
              <View style={styles.featureIcon}>
                <Ionicons name="stats-chart-outline" size={24} color="#2563eb" />
              </View>
              <CardTitle style={styles.featureTitle}>Track Progress</CardTitle>
              <Text style={styles.featureText}>
                Monitor your achievements and completion rates
              </Text>
            </Card>
          </FadeInView>
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
  blackSection: {
    backgroundColor: '#000000',
    paddingTop: 32,
    paddingBottom: 32,
  },
  greySection: {
    backgroundColor: '#f3f4f6',
    paddingTop: 32,
    paddingBottom: 40,
  },
  heroImageContainer: {
    marginHorizontal: 20,
    marginTop: 0,
    marginBottom: 24,
  },
  heroImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  aboutCard: {
    marginHorizontal: 20,
    marginTop: 0,
    marginBottom: 24,
    backgroundColor: '#1f2937',
    borderColor: '#374151',
  },
  aboutTitleWhite: {
    color: '#ffffff',
  },
  aboutText: {
    fontSize: 15,
    lineHeight: 24,
    color: '#6b7280',
  },
  aboutTextWhite: {
    fontSize: 15,
    lineHeight: 24,
    color: '#e5e7eb',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
    letterSpacing: -0.3,
    marginHorizontal: 20,
  },
  featureCard: {
    marginBottom: 16,
    marginHorizontal: 20,
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
