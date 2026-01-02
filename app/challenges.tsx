import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { challenges } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ThemedView } from '@/components/themed-view';
import { Ionicons } from '@expo/vector-icons';

const difficultyColors = {
  Easy: 'success',
  Medium: 'warning',
  Hard: 'danger',
} as const;

export default function ChallengesScreen() {
  const handleStartChallenge = (challengeId: string) => {
    router.push(`/exercise/${challengeId}`);
  };

  const stats = {
    total: challenges.length,
    easy: challenges.filter(c => c.difficulty === 'Easy').length,
    medium: challenges.filter(c => c.difficulty === 'Medium').length,
    hard: challenges.filter(c => c.difficulty === 'Hard').length,
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ThemedView style={styles.content}>
        {/* Clean Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Challenges</Text>
          <Text style={styles.subtitle}>
            Test your computational thinking skills
          </Text>
        </View>

        {/* Stats Summary */}
        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.total}</Text>
            <Text style={styles.statText}>Total</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.easy}</Text>
            <Text style={styles.statText}>Easy</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.medium}</Text>
            <Text style={styles.statText}>Medium</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.hard}</Text>
            <Text style={styles.statText}>Hard</Text>
          </View>
        </View>

        {/* Challenges List */}
        <View style={styles.challengesList}>
          {challenges.map((challenge, index) => (
            <Card key={challenge.id} style={styles.challengeCard}>
              <CardHeader>
                <View style={styles.challengeHeader}>
                  <View style={styles.challengeTitleRow}>
                    <Text style={styles.challengeNumber}>{index + 1}</Text>
                    <CardTitle style={styles.challengeTitle}>{challenge.title}</CardTitle>
                  </View>
                  <Badge variant={difficultyColors[challenge.difficulty]}>
                    {challenge.difficulty}
                  </Badge>
                </View>
              </CardHeader>
              <CardContent>
                <Text style={styles.challengeDescription}>{challenge.description}</Text>
                <View style={styles.challengeMeta}>
                  <View style={styles.metaItem}>
                    <Ionicons name="help-circle-outline" size={16} color="#9ca3af" />
                    <Text style={styles.metaText}>
                      {challenge.questions.length} questions
                    </Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Ionicons name="star-outline" size={16} color="#9ca3af" />
                    <Text style={styles.metaText}>
                      {challenge.totalPoints} pts
                    </Text>
                  </View>
                </View>
                <Button
                  title="Start Exercise"
                  onPress={() => handleStartChallenge(challenge.id)}
                  size="md"
                  style={styles.startButton}
                />
              </CardContent>
            </Card>
          ))}
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
    paddingBottom: 32,
  },
  header: {
    paddingTop: 40,
    paddingBottom: 24,
    paddingHorizontal: 24,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 6,
    color: '#111827',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: '#6b7280',
  },
  stats: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#e5e7eb',
    marginHorizontal: 4,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  statText: {
    fontSize: 12,
    color: '#9ca3af',
  },
  challengesList: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  challengeCard: {
    marginBottom: 16,
  },
  challengeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  challengeTitleRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  challengeNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#f3f4f6',
    fontSize: 13,
    fontWeight: '600',
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 28,
    marginRight: 12,
  },
  challengeTitle: {
    flex: 1,
    fontSize: 16,
  },
  challengeDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 14,
    lineHeight: 20,
  },
  challengeMeta: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 13,
    color: '#9ca3af',
  },
  startButton: {
    width: '100%',
  },
});
