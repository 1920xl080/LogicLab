import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

type BadgeProps = {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'success' | 'warning' | 'danger';
  style?: ViewStyle;
  textStyle?: TextStyle;
};

export function Badge({ children, variant = 'default', style, textStyle }: BadgeProps) {
  return (
    <View style={[styles.badge, styles[`badge_${variant}`], style]}>
      <Text style={[styles.text, styles[`text_${variant}`], textStyle]}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    borderWidth: 1,
  },
  badge_default: {
    backgroundColor: '#f3f4f6',
    borderColor: '#d1d5db',
  },
  badge_outline: {
    backgroundColor: 'transparent',
    borderColor: '#2563eb',
  },
  badge_success: {
    backgroundColor: '#f0fdf4',
    borderColor: '#86efac',
  },
  badge_warning: {
    backgroundColor: '#fffbeb',
    borderColor: '#fde68a',
  },
  badge_danger: {
    backgroundColor: '#fef2f2',
    borderColor: '#fecaca',
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  text_default: {
    color: '#6b7280',
  },
  text_outline: {
    color: '#2563eb',
  },
  text_success: {
    color: '#16a34a',
  },
  text_warning: {
    color: '#d97706',
  },
  text_danger: {
    color: '#dc2626',
  },
});
