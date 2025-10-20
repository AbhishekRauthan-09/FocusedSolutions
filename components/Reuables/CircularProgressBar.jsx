import { View, Text } from 'react-native';
import React from 'react';

const CircularProgressBar = ({ progress }) => {
  const getProgressColor = (percent) => {
    if (percent >= 100) return '#22c55e'; // Green for complete
    if (percent >= 70) return '#0ea5e9'; // Blue for good progress
    if (percent >= 40) return '#f59e0b'; // Orange for medium progress
    return '#ef4444'; // Red for low progress
  };
  return (
    <View className="items-center justify-center">
      <View
        className="h-10 w-10 items-center justify-center rounded-full"
        style={{
          borderWidth: 3,
          borderColor: getProgressColor(progress),
        }}>
        <Text className="font-bold text-xs" style={{ color: getProgressColor(progress) }}>
          {progress}%
        </Text>
      </View>
    </View>
  );
};

export default CircularProgressBar;
