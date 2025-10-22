import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';

const AddToDo = ({ closeModal = () => {}, onAddTodo }) => {
  const [newTodo, setNewTodo] = useState('');
  const [subtargets, setSubtargets] = useState(['']);
  const [newType, setNewType] = useState('Daily');
  const [subTasks, setSubTasks] = useState(['']);

  const updateSubTask = (idx, value) => {
    const updated = [...subTasks];
    updated[idx] = value;
    setSubTasks(updated);
  };

  const addSubTaskField = () => {
    setSubTasks([...subTasks, '']);
  };

  const handleSubmit = () => {
    onAddTodo({ newTodo, newType, subTasks });
    closeModal();
    setNewTodo('');
    setNewType('Daily');
    setSubTasks(['']);
  };

  return (
    <View className="w-full rounded-2xl bg-white p-6">
      <Text className="mb-2 text-3xl font-bold text-accent">Add New Task</Text>

      {/* <Text className="mb-2 mt-5 text-lg text-gray-600">Type</Text> */}
      <View className="mb-3 mt-4 flex-row" style={{ columnGap: 8 }}>
        {['Daily', 'Weekly', 'Monthly'].map((t) => (
          <TouchableOpacity
            key={t}
            onPress={() => setNewType(t)}
            className={`rounded px-3 py-1 ${newType === t ? 'bg-accent' : 'bg-accentValue/10'}`}>
            <Text className={`${newType === t ? 'text-white' : 'text-accent'} text-base`}>{t}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <BottomSheetTextInput
        className="mb-6 border-b border-accent py-2 text-lg text-gray-700"
        placeholder="Main task title..."
        value={newTodo}
        onChangeText={setNewTodo}
        placeholderTextColor="#6b7280"
      />

      {subTasks.map((sub, idx) => (
        <BottomSheetTextInput
          key={idx}
          className="mb-4 border-b border-accent py-2 text-lg text-gray-700"
          placeholder={`SubTask here`}
          value={sub}
          onChangeText={(val) => updateSubTask(idx, val)}
          placeholderTextColor="#6b7280"
        />
      ))}
      <TouchableOpacity className="mb-4 mt-2 flex-row items-center" onPress={addSubTaskField}>
        <Ionicons name="add-circle-outline" size={20} color="#38bdf8" />
        <Text className="ml-1 text-accent">Add SubTask</Text>
      </TouchableOpacity>
      <View className="mt-5 flex-row items-center justify-end">
        <TouchableOpacity className="mr-4" onPress={closeModal}>
          <Text className="text-gray-600 text-xl">Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity className="rounded-full bg-accent px-5 py-2 ml-1 flex-row items-center" onPress={handleSubmit}>
          <Text className="font- text-white mr-1 text-xl">Add</Text>
          <Ionicons name="add" color={'#fff'} size={18} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddToDo;
