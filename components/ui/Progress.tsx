import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

type ProgressProps = {
  value: number; // 0-100
  style?: ViewStyle;
  color?: string;
};

export function Progress({ value, style, color = '#2563eb' }: ProgressProps) {
  const clampedValue = Math.max(0, Math.min(100, value));

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.progress, { width: `${clampedValue}%`, backgroundColor: color }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 6,
    backgroundColor: '#f3f4f6',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    borderRadius: 3,
  },
});
