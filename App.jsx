import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import './global.css';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import HomeScreen from './components/screens/HomeScreen.jsx';
import TodosScreen from './components/screens/TodosScreen.jsx';
import LearningsScreen from './components/screens/LearningsScreen.jsx';
import AssessmentScreen from './components/screens/AssessmentScreen.jsx';

import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Provider } from 'react-redux';
import store from 'store/store';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView>
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
          <NavigationContainer>
            <Tab.Navigator
              screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: '#0ea5e9',
                tabBarInactiveTintColor: '#64748b',
                tabBarStyle: { paddingBottom: 6, height: 50 },
                tabBarIconStyle: {
                  size: 12,
                  fontSize: 12,
                },
                tabBarStyle: {
                  elevation: 0,
                },
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;
                  if (route.name === 'Home') {
                    iconName = focused ? 'home' : 'home-outline';
                  } else if (route.name === 'Todos') {
                    iconName = focused ? 'list' : 'list-outline';
                  } else if (route.name === 'My Learnings') {
                    iconName = focused ? 'school' : 'school-outline';
                  } else if (route.name === 'Assessment') {
                    iconName = focused ? 'clipboard' : 'clipboard-outline';
                  }
                  return (
                    <Ionicons name={iconName || 'checkmark-circle'} size={size} color={color} />
                  );
                },
              })}>
              <Tab.Screen name="Home" component={HomeScreen} />
              <Tab.Screen name="Todos" component={TodosScreen} />
              <Tab.Screen name="My Learnings" component={LearningsScreen} />
              <Tab.Screen name="Assessment" component={AssessmentScreen} />
            </Tab.Navigator>
          </NavigationContainer>
          <StatusBar style="auto" />
        </SafeAreaView>
      </GestureHandlerRootView>
    </Provider>
  );
}
