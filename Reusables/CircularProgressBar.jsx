import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';

const CircularProgressBar = ({
  progress = 0,
  size = 40,
  strokeWidth = 3,
  showText = true,
  textColor = '#fff',
  style,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const getProgressColor = (percent) => {
    if (percent >= 100) return '#22c55e'; // Green
    if (percent >= 70) return '#0ea5e9'; // Blue
    if (percent >= 40) return '#f59e0b'; // Orange
    return '#ef4444'; // Red
  };

  const progressColor = getProgressColor(progress);

  // Show checkmark when progress is 100%
  if (progress >= 100) {
    return (
      <View
        style={[{ width: size, height: size }, style]}
        className="items-center justify-center rounded-full bg-green-500">
        <Ionicons name="checkmark-done-outline" size={size * 0.6} color="#fff" />
      </View>
    );
  }

  return (
    <View style={[{ width: size, height: size }, style]} className="items-center justify-center">
      <Svg width={size} height={size}>
        {/* Background Circle */}
        <Circle
          stroke="#e5e7eb"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        {/* Progress Circle */}
        <Circle
          stroke={progressColor}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
      {showText && (
        <View className="absolute items-center justify-center text-black">
          <Text
            style={{
            //   color: textColor || progressColor,
              fontWeight: 'bold',
              fontSize: size * 0.25,
            }}>
            {Math.round(progress)}%
          </Text>
        </View>
      )}
    </View>
  );
};

export default CircularProgressBar;
