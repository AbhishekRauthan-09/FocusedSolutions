import React from 'react';
import { View, Text } from 'react-native';

export default function AssessmentScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text className="text-2xl font-bold text-accent">Assessment</Text>
      <Text className="mt-2 text-base text-textDark">Assessment and quizzes will appear here.</Text>
    </View>
  );
}
