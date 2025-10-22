import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';

export default function ShowTodos({ todos = [], onTogglePrimary, onToggleSubTask }) {
  const areAllSubTasksComplete = (subTasks) => {
    return subTasks.length > 0 && subTasks.every((sub) => sub.done);
  };

  if (!todos || todos.length === 0)
    return (
      <View className="mt-20 flex-1 items-center justify-center px-8">
        <Ionicons name="checkmark-done-circle-outline" size={100} color="#38bdf8" />
        <Text className="mt-4 text-center text-xl text-gray-500">
          No tasks yet! Tap the + button to add your first task.
        </Text>
      </View>
    );

  return (
    <ScrollView style={{ flex: 1 }}>
      {todos
        .map((t, i) => ({ ...t, _idx: i }))
        .map((todo, idx, arr) => (
          <View
            key={todo.id ?? idx}
            className={`mb ${idx === arr.length - 1 ? '' : 'border-b border-gray-200'}`}>
            {todo.subTasks.length === 0 ? (
              <View className="flex-row items-center justify-between p-4">
                <Text
                  className={`text-lg ${todo.done ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                  {idx + 1}. {todo.title}
                </Text>
                <TouchableOpacity
                  onPress={() => onTogglePrimary && onTogglePrimary(todo._idx)}
                  activeOpacity={0.7}>
                  <Ionicons
                    name={todo.done ? 'checkbox' : 'square-outline'}
                    size={20}
                    color={todo.done ? '#38bdf8' : '#cbd5e1'}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <>
                <View className="flex-row items-center justify-between p-4">
                  <Text
                    className={`text-lg ${todo.done ? 'text-gray-400 line-through' : 'text-gray-700'} `}>
                    {idx + 1}. {todo.title}
                  </Text>
                  {/* <TouchableOpacity onPress={() => onToggleParentForSubTasks && onToggleParentForSubTasks(todo._idx)} activeOpacity={0.7}>
                    <Ionicons
                      name={todo.done || areAllSubTasksComplete(todo.subTasks) ? 'checkbox' : 'square-outline'}
                      size={20}
                      color={todo.done ? '#38bdf8' : '#cbd5e1'}
                    />
                  </TouchableOpacity> */}
                </View>
                {todo.subTasks.length > 0 && (
                  <View className="px-4 pb-4">
                    {todo.subTasks.map((sub, sidx) => (
                      <TouchableOpacity
                        key={sidx}
                        className="mb-2 flex-row items-center justify-between"
                        onPress={() => onToggleSubTask && onToggleSubTask(todo._idx, sidx)}
                        activeOpacity={0.7}>
                        <Text
                          className={`text-base ${sub.done ? 'text-gray-400 line-through' : 'text-gray-600'}`}>
                          {sub.text}
                        </Text>
                        <Ionicons
                          name={sub.done ? 'checkbox' : 'square-outline'}
                          size={20}
                          color={sub.done ? '#38bdf8' : '#cbd5e1'}
                        />
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </>
            )}
          </View>
        ))}
    </ScrollView>
  );
}
