import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './components/home/Home';
import Questionario from './components/questionario/Questionario';
import RankingScreen from './components/ranking/Ranking';
import Ionicons from 'react-native-vector-icons/Ionicons';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
 name="Home" component={Home} 
 options={{ headerShown: false }}
 />
        <Stack.Screen name="Questionario" component={AppNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const AppNavigator = () => {
  return (
    
    <Tab.Navigator
      screenOptions={{headerShown: false }}
     >
      <Tab.Screen name="Questionario" component={Questionario} />
      <Tab.Screen name="Ranking" component={RankingScreen} />
    </Tab.Navigator>
  );
};

export default App;