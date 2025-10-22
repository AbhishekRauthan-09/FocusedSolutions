import * as React from 'react';
import { View, Text, useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useSelector } from 'react-redux';
import { todoSelector } from 'store/todos/selector';

const FirstRoute = () => <View><Text>First</Text></View>;
const SecondRoute = () => <View><Text>Second</Text></View>;

export default function MyTabs() {
  const data = useSelector(todoSelector)
  console.log("data in tabs", data)
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={SceneMap({
        first: FirstRoute,
        second: SecondRoute,
      })}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={props => <TabBar {...props} />}
    />
  );
}
