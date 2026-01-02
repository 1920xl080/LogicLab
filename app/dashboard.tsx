import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { challenges } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import { ThemedView } from '@/components/themed-view';
import { Ionicons } from '@expo/vector-icons';

export default function DashboardScreen() {
  const { user } = useAuth();

  if (!user) {
    return (
      <ThemedView style={styles.container}>
        <Text style={styles.loadingText}>Loading dashboard...</Text>
      </ThemedView>
    );
  }

  const totalChallenges = challenges.length;
  const completedChallenges = user.completedChallenges?.length || 0;
  const totalScore = user.completedChallenges?.reduce((sum, c) => sum + c.score, 0) || 0;
  const averageScore = completedChallenges > 0 ? Math.round(totalScore / completedChallenges) : 0;
  const progressPercentage = (completedChallenges / totalChallenges) * 100;
  const maxPossibleScore = challenges.reduce((sum, c) => sum + c.totalPoints, 0);

  const completedChallengesDetails = user.completedChallenges?.map(cc => ({
    ...cc,
    challenge: challenges.find(c => c.id === cc.challengeId)
  })).filter(cc => cc.challenge) || [];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ThemedView style={styles.content}>
        {/* Clean Header */}
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
            </Text>
          </View>
          <Text style={styles.greeting}>
            Hi, {user.name.split(' ')[0]}
          </Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <Card style={styles.statCard}>
            <CardContent>
              <View style={styles.statIcon}>
                <Ionicons name="trophy-outline" size={20} color="#2563eb" />
              </View>
              <Text style={styles.statValue}>{totalScore}</Text>
              <Text style={styles.statLabel}>Points</Text>
            </CardContent>
          </Card>

          <Card style={styles.statCard}>
            <CardContent>
              <View style={styles.statIcon}>
                <Ionicons name="checkmark-circle-outline" size={20} color="#2563eb" />
              </View>
              <Text style={styles.statValue}>{completedChallenges}</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </CardContent>
          </Card>

          <Card style={styles.statCard}>
            <CardContent>
              <View style={styles.statIcon}>
                <Ionicons name="trending-up-outline" size={20} color="#2563eb" />
              </View>
              <Text style={styles.statValue}>{averageScore}%</Text>
              <Text style={styles.statLabel}>Average</Text>
            </CardContent>
          </Card>

          <Card style={styles.statCard}>
            <CardContent>
              <View style={styles.statIcon}>
                <Ionicons name="list-outline" size={20} color="#2563eb" />
              </View>
              <Text style={styles.statValue}>{totalChallenges - completedChallenges}</Text>
              <Text style={styles.statLabel}>Remaining</Text>
            </CardContent>
          </Card>
        </View>

        {/* Overall Progress */}
        <Card style={styles.section}>
          <CardHeader>
            <CardTitle>Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <View style={styles.progressRow}>
              <Text style={styles.progressLabel}>Exercises</Text>
              <Text style={styles.progressValue}>{completedChallenges} / {totalChallenges}</Text>
            </View>
            <Progress value={progressPercentage} style={styles.progressBar} />
            <Text style={styles.progressText}>
              {progressPercentage.toFixed(0)}% complete
            </Text>
          </CardContent>
        </Card>

        {/* Recent Submissions */}
        <Card style={styles.section}>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {completedChallengesDetails.length > 0 ? (
              completedChallengesDetails.slice().reverse().map((item) => (
                <View key={item.challengeId} style={styles.activityItem}>
                  <View style={styles.activityHeader}>
                    <Text style={styles.activityTitle}>{item.challenge?.title}</Text>
                    <Badge
                      variant={item.challenge?.difficulty === 'Easy' ? 'success' :
                        item.challenge?.difficulty === 'Medium' ? 'warning' : 'danger'}
                    >
                      {item.challenge?.difficulty}
                    </Badge>
                  </View>
                  <View style={styles.activityFooter}>
                    <Text style={styles.activityScore}>
                      {item.score}/100
                    </Text>
                    <Text style={styles.activityDate}>
                      {new Date(item.date).toLocaleDateString()}
                    </Text>
                  </View>
                </View>
              ))
            ) : (
              <View style={styles.emptyState}>
                <Ionicons name="document-outline" size={40} color="#d1d5db" />
                <Text style={styles.emptyText}>No submissions yet</Text>
                <Text style={styles.emptySubtext}>
                  Start solving exercises to track your progress
                </Text>
              </View>
            )}
          </CardContent>
        </Card>
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
  loadingText: {
    fontSize: 15,
    color: '#6b7280',
  },
  header: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 32,
    paddingHorizontal: 24,
    backgroundColor: '#ffffff',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#eff6ff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2563eb',
  },
  greeting: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 4,
    color: '#111827',
    letterSpacing: -0.3,
  },
  email: {
    fontSize: 14,
    color: '#9ca3af',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 16,
    marginTop: 24,
    gap: 12,
  },
  statCard: {
    width: '47.5%',
    alignItems: 'center',
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#eff6ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statLabel: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '600',
    color: '#111827',
    letterSpacing: -0.5,
  },
  section: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  progressLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  progressValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  progressBar: {
    marginBottom: 8,
  },
  progressText: {
    fontSize: 13,
    color: '#9ca3af',
  },
  activityItem: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  activityTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#111827',
    flex: 1,
  },
  activityFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  activityScore: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2563eb',
  },
  activityDate: {
    fontSize: 13,
    color: '#9ca3af',
  },
  emptyState: {
    padding: 32,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#9ca3af',
    marginTop: 12,
    marginBottom: 4,
  },
  emptySubtext: {
    fontSize: 13,
    color: '#d1d5db',
    textAlign: 'center',
  },
});
