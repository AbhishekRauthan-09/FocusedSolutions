import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import CircularProgressBar from 'components/Reuables/CircularProgressBar';

export default function TodosScreen() {
  const [todos, setTodos] = useState([
    {
      title: 'Master Chapter 5: Photosynthesis',
      expanded: true,
      subtargets: [
        { text: 'Read pages 120-135', done: true },
        { text: 'Complete practice questions 1-10', done: true },
        { text: 'Review lecture notes', done: false },
      ],
    },
    {
      title: 'Prepare for Midterm Exam',
      expanded: false,
      subtargets: [],
    },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTodo, setNewTodo] = useState('');
  const [subtargets, setSubtargets] = useState(['']);

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([
        ...todos,
        {
          title: newTodo,
          subtargets: subtargets.filter((s) => s.trim()).map((s) => ({ text: s, done: false })),
        },
      ]);
      setNewTodo('');
      setSubtargets(['']);
      setModalVisible(false);
    }
  };

  const updateSubtarget = (idx, value) => {
    const updated = [...subtargets];
    updated[idx] = value;
    setSubtargets(updated);
  };

  const addSubtargetField = () => {
    setSubtargets([...subtargets, '']);
  };

  // Progress calculation
  const totalTasks = todos.reduce(
    (acc, todo) => acc + (todo.subtargets.length > 0 ? todo.subtargets.length : 1),
    0
  );
  const completedTasks = todos.reduce(
    (acc, todo) =>
      acc +
      (todo.subtargets.length > 0
        ? todo.subtargets.filter((sub) => sub.done).length
        : todo.done
          ? 1
          : 0),
    0
  );
  const progress = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  // Get progress color based on percentage

  // Expand/collapse handler
  const toggleExpand = (idx) => {
    setTodos((prev) =>
      prev.map((todo, i) => (i === idx ? { ...todo, expanded: !todo.expanded } : todo))
    );
  };

  // Checkbox handler
  const toggleSubtask = (todoIdx, subIdx) => {
    setTodos((prev) =>
      prev.map((todo, i) =>
        i === todoIdx
          ? {
              ...todo,
              subtargets: todo.subtargets.map((sub, j) =>
                j === subIdx ? { ...sub, done: !sub.done } : sub
              ),
            }
          : todo
      )
    );
  };

  return (
    <SafeAreaView edges={['bottom', 'top']} style={{ flex: 1, backgroundColor: '#f8fafc' }}>
      <View className="flex-1 px-4 pt-4">
        {/* Header with title and circular progress */}
        <View className="mb-4 flex-row items-center justify-between">
          <Text className="text-xl font-bold text-gray-900">My Todos</Text>
          <View className="items-center justify-center">
            <CircularProgressBar progress={progress} />
          </View>
        </View>

        {/* Todo cards */}
        <ScrollView className="flex-1 ">
          {todos.map((todo, idx) => (
            <View key={idx} className="mb border-b border-gray-200">
              {todo.subtargets.length === 0 ? (
                // Primary task with single checkbox, not collapsible, checkbox on right
                <View className="flex-row items-center justify-between p-4">
                  <Text
                    className={`text-base font-semibold ${todo.done ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                    {todo.title}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      setTodos((prev) =>
                        prev.map((t, i) => (i === idx ? { ...t, done: !t.done } : t))
                      );
                    }}
                    activeOpacity={0.7}>
                    <Ionicons
                      name={todo.done ? 'checkbox' : 'square-outline'}
                      size={22}
                      color={todo.done ? '#38bdf8' : '#cbd5e1'}
                    />
                  </TouchableOpacity>
                </View>
              ) : (
                // Collapsible card for todos with subtargets
                <>
                  <TouchableOpacity
                    className="flex-row items-center justify-between p-4"
                    onPress={() => toggleExpand(idx)}
                    activeOpacity={0.8}>
                    <Text className="text-base font-semibold text-gray-900">{todo.title}</Text>
                    <Ionicons
                      name={todo.expanded ? 'chevron-up' : 'chevron-down'}
                      size={22}
                      color="#64748b"
                    />
                  </TouchableOpacity>
                  {todo.expanded && (
                    <View className="px-4 pb-4">
                      {todo.subtargets.map((sub, sidx) => (
                        <TouchableOpacity
                          key={sidx}
                          className="mb-2 flex-row items-center"
                          onPress={() => toggleSubtask(idx, sidx)}
                          activeOpacity={0.7}>
                          <Ionicons
                            name={sub.done ? 'checkbox' : 'square-outline'}
                            size={22}
                            color={sub.done ? '#38bdf8' : '#cbd5e1'}
                            style={{ marginRight: 8 }}
                          />
                          <Text
                            className={`text-base ${sub.done ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                            {sub.text}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </>
              )}
            </View>
          ))}
        </ScrollView>

        {/* Floating Add Button */}
        <TouchableOpacity
          className="absolute bottom-8 right-8 rounded-full bg-blue-400 p-4 shadow-lg"
          onPress={() => setModalVisible(true)}
          activeOpacity={0.8}>
          <Ionicons name="add" size={32} color="#fff" />
        </TouchableOpacity>

        {/* Modal for adding todo (unchanged) */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <View className="flex-1 items-center justify-center bg-black/30">
            <View className="w-80 rounded-2xl bg-white p-6 shadow-lg">
              <Text className="mb-2 text-xl font-bold text-blue-500">Add New Target</Text>
              <TextInput
                className="mb-4 border-b border-blue-400 py-2 text-base text-gray-700"
                placeholder="Main target..."
                value={newTodo}
                onChangeText={setNewTodo}
                placeholderTextColor="#7dd3fc"
              />
              <Text className="mb-2 text-base text-gray-700">Subtargets</Text>
              {subtargets.map((sub, idx) => (
                <TextInput
                  key={idx}
                  className="mb-2 border-b border-gray-200 py-1 text-sm text-gray-600"
                  placeholder={`Subtarget ${idx + 1}`}
                  value={sub}
                  onChangeText={(val) => updateSubtarget(idx, val)}
                  placeholderTextColor="#64748b"
                />
              ))}
              <TouchableOpacity
                className="mb-4 mt-2 flex-row items-center"
                onPress={addSubtargetField}>
                <Ionicons name="add-circle-outline" size={20} color="#38bdf8" />
                <Text className="ml-1 text-blue-400">Add subtarget</Text>
              </TouchableOpacity>
              <View className="flex-row justify-end">
                <TouchableOpacity className="mr-4" onPress={() => setModalVisible(false)}>
                  <Text className="text-gray-500">Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity className="rounded-full bg-blue-400 px-4 py-2" onPress={addTodo}>
                  <Text className="font-semibold text-white">Add</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}
