import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { challenges, Question } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { FadeInView } from '@/components/ui/FadeInView';
import { ThemedView } from '@/components/themed-view';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Answer = {
  questionId: string;
  selectedOptionId: string;
};

export default function ExerciseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { user, saveCompletedChallenge } = useAuth();
  const challenge = challenges.find(c => c.id === id);

  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  // Load draft answers from AsyncStorage
  useEffect(() => {
    if (!challenge) return;

    const loadDraft = async () => {
      try {
        const draftKey = `exercise-draft-${challenge.id}`;
        const savedDraft = await AsyncStorage.getItem(draftKey);

        if (savedDraft) {
          const draft = JSON.parse(savedDraft);
          setAnswers(draft.answers || []);
        }
      } catch (error) {
        console.error('Failed to load draft:', error);
      }
    };

    loadDraft();
  }, [challenge?.id]);

  // Save draft answers to AsyncStorage
  useEffect(() => {
    if (!challenge || answers.length === 0 || isSubmitted) return;

    const saveDraft = async () => {
      try {
        const draftKey = `exercise-draft-${challenge.id}`;
        const draft = {
          answers,
          timestamp: Date.now()
        };
        await AsyncStorage.setItem(draftKey, JSON.stringify(draft));
      } catch (error) {
        console.error('Failed to save draft:', error);
      }
    };

    saveDraft();
  }, [answers, challenge?.id, isSubmitted]);

  if (!challenge) {
    return (
      <ThemedView style={styles.container}>
        <Text style={styles.errorText}>Exercise not found</Text>
        <Button title="Back to Exercises" onPress={() => router.back()} />
      </ThemedView>
    );
  }

  const handleAnswerChange = (questionId: string, optionId: string) => {
    setAnswers(prev => {
      const existingIndex = prev.findIndex(a => a.questionId === questionId);
      if (existingIndex >= 0) {
        const newAnswers = [...prev];
        newAnswers[existingIndex] = { questionId, selectedOptionId: optionId };
        return newAnswers;
      }
      return [...prev, { questionId, selectedOptionId: optionId }];
    });
  };

  const handleSubmit = async () => {
    if (isSaving || isSubmitted) return;

    if (answers.length < challenge.questions.length) {
      Alert.alert('Incomplete', 'Please answer all questions before submitting');
      return;
    }

    setIsSaving(true);

    try {
      // Calculate score
      let totalScore = 0;
      challenge.questions.forEach(question => {
        const answer = answers.find(a => a.questionId === question.id);
        if (answer) {
          const selectedOption = question.options.find(o => o.id === answer.selectedOptionId);
          if (selectedOption?.isCorrect) {
            totalScore += question.points;
          }
        }
      });

      // Save to database
      try {
        await saveCompletedChallenge(challenge.id, totalScore, challenge.totalPoints);
      } catch (error) {
        console.error('Save failed (but continuing):', error);
      }

      setScore(totalScore);
      setIsSubmitted(true);

      // Clear draft
      const draftKey = `exercise-draft-${challenge.id}`;
      await AsyncStorage.removeItem(draftKey);
    } catch (error) {
      Alert.alert('Error', 'Failed to submit. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const getSelectedOption = (questionId: string) => {
    return answers.find(a => a.questionId === questionId)?.selectedOptionId;
  };

  const isCorrect = (question: Question, optionId: string) => {
    if (!isSubmitted) return null;
    const selected = getSelectedOption(question.id);
    if (selected === optionId) {
      return optionId === question.options.find(o => o.isCorrect)?.id;
    }
    return null;
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ThemedView style={styles.content}>
        {/* Header */}
        <FadeInView delay={0}>
          <View style={styles.header}>
            <Text style={styles.title}>{challenge.title}</Text>
            <View style={styles.badges}>
              <Badge variant={challenge.difficulty === 'Easy' ? 'success' :
                challenge.difficulty === 'Medium' ? 'warning' : 'danger'}>
                {challenge.difficulty}
              </Badge>
              <Badge variant="outline">{challenge.category}</Badge>
            </View>
            <Text style={styles.description}>{challenge.description}</Text>
          </View>
        </FadeInView>

        {/* Questions */}
        {challenge.questions.map((question, index) => (
          <FadeInView key={question.id} delay={100 + (index * 100)}>
            <Card style={styles.questionCard}>
              <CardHeader>
                <View style={styles.questionHeader}>
                  <View style={styles.questionNumber}>
                    <Text style={styles.questionNumberText}>{index + 1}</Text>
                  </View>
                  <CardTitle style={styles.questionTitle}>
                    Question {index + 1}
                  </CardTitle>
                </View>
                <View style={styles.pointsBadge}>
                  <Ionicons name="star-outline" size={14} color="#d97706" />
                  <Text style={styles.pointsText}>{question.points} pts</Text>
                </View>
              </CardHeader>
              <CardContent>
                <Text style={styles.questionText}>{question.question}</Text>

                <View style={styles.options}>
                  {question.options.map((option) => {
                    const selected = getSelectedOption(question.id) === option.id;
                    const correct = isCorrect(question, option.id);

                    return (
                      <TouchableOpacity
                        key={option.id}
                        style={[
                          styles.option,
                          selected && styles.optionSelected,
                          correct === true && styles.optionCorrect,
                          correct === false && styles.optionIncorrect,
                        ]}
                        onPress={() => !isSubmitted && handleAnswerChange(question.id, option.id)}
                        disabled={isSubmitted}
                      >
                        <View style={[
                          styles.optionRadio,
                          selected && styles.optionRadioSelected,
                          correct === true && styles.optionRadioCorrect,
                          correct === false && styles.optionRadioIncorrect,
                        ]}>
                          {selected && !isSubmitted && <View style={styles.optionRadioInner} />}
                          {correct === true && <Ionicons name="checkmark" size={16} color="#16a34a" />}
                          {correct === false && <Ionicons name="close" size={16} color="#dc2626" />}
                        </View>
                        <Text style={[
                          styles.optionText,
                          correct === true && styles.optionTextCorrect,
                          correct === false && styles.optionTextIncorrect,
                        ]}>
                          {option.text}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>

                {isSubmitted && question.explanation && (
                  <View style={styles.explanation}>
                    <Text style={styles.explanationLabel}>Explanation</Text>
                    <Text style={styles.explanationText}>{question.explanation}</Text>
                  </View>
                )}
              </CardContent>
            </Card>
          </FadeInView>
        ))}

        {/* Submit Button */}
        {!isSubmitted && (
          <FadeInView delay={100 + (challenge.questions.length * 100)}>
            <Button
              title={isSaving ? 'Submitting...' : 'Submit Answers'}
              onPress={handleSubmit}
              disabled={isSaving || answers.length < challenge.questions.length}
              size="lg"
              style={styles.submitButton}
            />
          </FadeInView>
        )}

        {/* Results */}
        {isSubmitted && (
          <FadeInView delay={0}>
            <Card style={styles.resultsCard}>
              <CardHeader>
                <CardTitle>Your Result</CardTitle>
              </CardHeader>
              <CardContent>
                <View style={styles.scoreContainer}>
                  <Text style={styles.scoreLabel}>Score</Text>
                  <Text style={styles.scoreValue}>
                    {score} / {challenge.totalPoints}
                  </Text>
                  <Text style={styles.percentageText}>
                    {Math.round((score / challenge.totalPoints) * 100)}%
                  </Text>
                </View>
                <Button
                  title="Back to Challenges"
                  onPress={() => router.push('/challenges')}
                  variant="outline"
                  style={styles.backButton}
                />
              </CardContent>
            </Card>
          </FadeInView>
        )}
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
  errorText: {
    fontSize: 15,
    color: '#9ca3af',
  },
  header: {
    paddingTop: 40,
    paddingBottom: 24,
    paddingHorizontal: 24,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
    color: '#111827',
    letterSpacing: -0.3,
  },
  badges: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  questionCard: {
    marginHorizontal: 20,
    marginTop: 16,
  },
  questionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  questionNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  questionNumberText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  questionTitle: {
    fontSize: 16,
    flex: 1,
  },
  pointsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  pointsText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#d97706',
  },
  questionText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 16,
    lineHeight: 22,
  },
  options: {
    gap: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#e5e7eb',
    backgroundColor: '#ffffff',
  },
  optionSelected: {
    borderColor: '#2563eb',
    backgroundColor: '#eff6ff',
  },
  optionCorrect: {
    borderColor: '#16a34a',
    backgroundColor: '#f0fdf4',
  },
  optionIncorrect: {
    borderColor: '#dc2626',
    backgroundColor: '#fef2f2',
  },
  optionRadio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#d1d5db',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionRadioSelected: {
    borderColor: '#2563eb',
  },
  optionRadioCorrect: {
    borderColor: '#16a34a',
    backgroundColor: '#16a34a',
  },
  optionRadioIncorrect: {
    borderColor: '#dc2626',
    backgroundColor: '#dc2626',
  },
  optionRadioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2563eb',
  },
  optionText: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
  },
  optionTextCorrect: {
    color: '#16a34a',
    fontWeight: '500',
  },
  optionTextIncorrect: {
    color: '#dc2626',
    fontWeight: '500',
  },
  explanation: {
    marginTop: 16,
    padding: 14,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  explanationLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 6,
  },
  explanationText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  submitButton: {
    marginHorizontal: 20,
    marginTop: 24,
  },
  resultsCard: {
    marginHorizontal: 20,
    marginTop: 24,
  },
  scoreContainer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  scoreLabel: {
    fontSize: 13,
    color: '#9ca3af',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  scoreValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  percentageText: {
    fontSize: 40,
    fontWeight: '700',
    color: '#2563eb',
    marginBottom: 20,
    letterSpacing: -1,
  },
  backButton: {
    width: '100%',
  },
});
