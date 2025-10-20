import React from 'react';
import { View, Text } from 'react-native';

export default function LearningsScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text className="text-2xl font-bold text-accent">My Learnings</Text>
      <Text className="mt-2 text-base text-textDark">Track your learning progress here.</Text>
    </View>
  );
}
