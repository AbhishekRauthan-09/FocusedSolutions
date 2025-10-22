import React from 'react';
import { View, Text, Image } from 'react-native';

export default function LearningsScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <Image
        source={require('../../assets/Images/coming_soon.png')}
        style={{
          height: 300,
          width: 300,
        }}
      />
      <Text className="-mt-10 text-xl text-gray-500">
        Learning Material will be available soon.
      </Text>
    </View>
  );
}
