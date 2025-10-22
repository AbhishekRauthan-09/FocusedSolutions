import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CircularProgressBar from 'Reusables/CircularProgressBar';
import BottomSheetComponent from 'Reusables/BottomSheet';
import AddToDo from 'components/Todos/AddToDo';
import DailyTodos from 'components/Todos/DailyTodos';
import WeeklyTodos from 'components/Todos/WeeklyTodos';
import MonthlyTodos from 'components/Todos/MonthlyTodos';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
export default function TodosScreen() {
  // Separate lists for each range
  const [dailyTodos, setDailyTodos] = useState([
    {
      id: 1,
      title: 'Master Chapter 5: Photosynthesis',
      expanded: true,
      subTasks: [
        { text: 'Read pages 120-135', done: true },
        { text: 'Complete practice questions 1-10', done: true },
        { text: 'Review lecture notes', done: false },
      ],
    },
  ]);
  const [weeklyTodos, setWeeklyTodos] = useState([]);
  const [monthlyTodos, setMonthlyTodos] = useState([
    {
      id: 2,
      title: 'Prepare for Midterm Exam',
      expanded: false,
      subTasks: [],
    },
  ]);
  const [selectedRange, setSelectedRange] = useState('Daily');
  const [modalVisible, setModalVisible] = useState(false);

  // FAB visibility based on user activity (hide after 2s of inactivity)
  const [fabVisible, setFabVisible] = useState(true);
  const hideTimeoutRef = useRef(null);

  const registerActivity = () => {
    setFabVisible(true);
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    hideTimeoutRef.current = setTimeout(() => setFabVisible(false), 2000);
  };

  useEffect(() => {
    // start initial hide timer
    registerActivity();
    return () => {
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  const ranges = {
    0: 'Daily',
    1: 'Weekly',
    2: 'Monthly',
  };

  // tab view
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'Daily', title: 'Daily' },
    { key: 'Weekly', title: 'Weekly' },
    { key: 'Monthly', title: 'Monthly' },
  ]);

  const renderToDos = (range) => {
    if (range == 'Daily') {
      <DailyTodos
        todos={dailyTodos}
        onTogglePrimary={(idx) => togglePrimary('Daily', idx)}
        onToggleSubTask={(idx, subIdx) => toggleSubTask('Daily', idx, subIdx)}
      />;
    } else if (range === 'Weekly') {
      return (
        <WeeklyTodos
          todos={weeklyTodos}
          onTogglePrimary={(idx) => togglePrimary('Weekly', idx)}
          onToggleSubTask={(idx, subIdx) => toggleSubTask('Weekly', idx, subIdx)}
        />
      );
    } else return;
    <MonthlyTodos
      todos={monthlyTodos}
      onTogglePrimary={(idx) => togglePrimary('Monthly', idx)}
      onToggleSubTask={(idx, subIdx) => toggleSubTask('Monthly', idx, subIdx)}
    />;
  };

  const onAddTodo = ({ newTodo, newType, subTasks }) => {
    if (newTodo.trim()) {
      const newItem = {
        id: Date.now(),
        title: newTodo,
        subTasks: subTasks.filter((s) => s.trim()).map((s) => ({ text: s, done: false })),
        expanded: subTasks.filter((s) => s.trim()).length > 0,
      };
      if (newType === 'Daily') setDailyTodos((prev) => [...prev, newItem]);
      else if (newType === 'Weekly') setWeeklyTodos((prev) => [...prev, newItem]);
      else setMonthlyTodos((prev) => [...prev, newItem]);

      setModalVisible(false);
      return { success: true };
    }
    return { success: false };
  };

  // Progress calculation
  // Visible todos depend on the selected range
  // const visibleTodos =
  //   selectedRange === 'Daily'
  //     ? dailyTodos
  //     : selectedRange === 'Weekly'
  //       ? weeklyTodos
  //       : monthlyTodos;

  // const totalTasks = visibleTodos.reduce(
  //   (acc, todo) => acc + (todo.subTasks.length > 0 ? todo.subTasks.length : 1),
  //   0
  // );
  // const completedTasks = visibleTodos.reduce(
  //   (acc, todo) =>
  //     acc +
  //     (todo.subTasks.length > 0
  //       ? todo.subTasks.filter((sub) => sub.done).length
  //       : todo.done
  //         ? 1
  //         : 0),
  //   0
  // );
  // const progress = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  // Check if all subTasks are complete
  const areAllSubTasksComplete = (subTasks) => {
    return subTasks.length > 0 && subTasks.every((sub) => sub.done);
  };

  // Checkbox handler for subTasks
  const toggleSubTask = (type, todoIdx, subIdx) => {
    const updater = (arr) =>
      arr.map((todo, i) => {
        if (i === todoIdx) {
          const updatedSubTasks = todo.subTasks.map((sub, j) =>
            j === subIdx ? { ...sub, done: !sub.done } : sub
          );
          return {
            ...todo,
            subTasks: updatedSubTasks,
            done: areAllSubTasksComplete(updatedSubTasks),
          };
        }
        return todo;
      });

    if (type === 'Daily') setDailyTodos((prev) => updater(prev));
    else if (type === 'Weekly') setWeeklyTodos((prev) => updater(prev));
    else setMonthlyTodos((prev) => updater(prev));
  };

  // Toggle primary (no-subtargets) task done state using original index
  const togglePrimary = (type, origIdx) => {
    const updater = (arr) => arr.map((t, i) => (i === origIdx ? { ...t, done: !t.done } : t));
    if (type === 'Daily') setDailyTodos((prev) => updater(prev));
    else if (type === 'Weekly') setWeeklyTodos((prev) => updater(prev));
    else setMonthlyTodos((prev) => updater(prev));
  };

  const RenderDailyTodos = () => (
    <DailyTodos
      todos={dailyTodos}
      onTogglePrimary={(idx) => togglePrimary('Daily', idx)}
      onToggleSubTask={(idx, subIdx) => toggleSubTask('Daily', idx, subIdx)}
    />
  );

  const RenderWeeklyTodos = () => (
    <WeeklyTodos
      todos={weeklyTodos}
      onTogglePrimary={(idx) => togglePrimary('Weekly', idx)}
      onToggleSubTask={(idx, subIdx) => toggleSubTask('Weekly', idx, subIdx)}
    />
  );

  const RenderMonthlyTodos = () => (
    <MonthlyTodos
      todos={monthlyTodos}
      onTogglePrimary={(idx) => togglePrimary('Monthly', idx)}
      onToggleSubTask={(idx, subIdx) => toggleSubTask('Monthly', idx, subIdx)}
    />
  );

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      style={{
        backgroundColor: 'transparent', // Tab bar background
        elevation: 5,
        backgroundColor: '#fff',
        padding: 0,
      }}
      indicatorStyle={{
        backgroundColor: '#0ea5e9', // underline indicator color
      }}
      tabStyle={{
        padding: 0,
      }}
    />
  );

  return (
    <View className="flex-1" onStartShouldSetResponder={() => true} onResponderGrant={() => registerActivity()}>
      {/* Range selector */}

      {/* Header with title and circular progress */}
      {/* <View className="mb-4 flex-row items-center justify-between pb-1">
        <Text className="text-3xl font-bold text-gray-600">My Todos</Text>
        <View className="h-[40px] items-center justify-center">
          <CircularProgressBar progress={progress} />
        </View>
      </View> */}

      {/* <View className="mb-4 flex-row items-start justify-start " style={{ columnGap: 5 }}>
        {['Daily', 'Weekly', 'Monthly'].map((r) => (
          <TouchableOpacity
            key={r}
            onPress={() => setSelectedRange(r)}
            className={`rounded px-3 py-1 ${selectedRange === r ? 'bg-accent' : 'bg-accentValue/10'}`}>
            <Text className={`${selectedRange === r ? 'text-white' : 'text-accent'} font`}>
              {r}
            </Text>
          </TouchableOpacity>
        ))}
      </View> */}

      <TabView
        navigationState={{ index, routes }}
        renderScene={SceneMap({
          Daily: RenderDailyTodos,
          Weekly: RenderWeeklyTodos,
          Monthly: RenderMonthlyTodos,
        })}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
        commonOptions={{
          label: ({ route, labelText, focused, color }) => (
            <Text
              className="text-lg"
              style={{ color: focused ? '#0ea5e9' : '#4b5563', margin: 8, fontWeight: 500 }}>
              {labelText ?? route.name}
            </Text>
          ),
        }}
      />

      {/* Floating Action Buttons */}
      {fabVisible && (
        <View className="absolute bottom-8 right-4" style={{ rowGap: 12 }}>
          <TouchableOpacity
            className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-blue-400 shadow-lg"
            onPress={() => setModalVisible(!modalVisible)}
            activeOpacity={0.8}>
            <Ionicons name="add" size={32} color="#fff" />
          </TouchableOpacity>

          <View className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-white">
            <CircularProgressBar progress={80} size={50} />
          </View>
          <TouchableOpacity
            className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-green-500 shadow-lg"
            onPress={() => setModalVisible(!modalVisible)}
            activeOpacity={0.8}>
            <Ionicons name="cloud-done-outline" size={29} color="#fff" />
          </TouchableOpacity>
        </View>
      )}

      <BottomSheetComponent
        isOpen={modalVisible}
        onClose={() => {
          setModalVisible(false);
        }}
        children={<AddToDo onAddTodo={onAddTodo} closeModal={() => setModalVisible(false)} />}
      />
    </View>
  );
}
