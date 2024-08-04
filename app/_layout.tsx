// app/AppTabs.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '@/app/components/home/Home';
import Questionario from '@/app/components/questionario/Questionario';
import Ranking from '@/app/components/ranking/Ranking';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const AppTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
    >
      {/* <Tab.Screen name="Home" component={HomeScreen} /> */}
      <Tab.Screen name="questionario" component={Questionario} />
      <Tab.Screen name="ranking" component={Ranking} />
    </Tab.Navigator>
  );
};

export default AppTabs;
