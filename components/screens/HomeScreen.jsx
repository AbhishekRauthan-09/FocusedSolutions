import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <View className="bg-background flex-1 items-center justify-center">
        <Text className="text-accent text-2xl font-bold">Home</Text>
        <Text className="text-textDark mt-2 text-base">Welcome to Home</Text>
      </View>
    </SafeAreaView>
  );
}
