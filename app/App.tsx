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
          name="home" component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="questionario" component={AppNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const AppNavigator = () => {
  return (

    <Tab.Navigator
      screenOptions={{ headerShown: false,
        tabBarActiveBackgroundColor:'#6c4c40' ,
        tabBarInactiveBackgroundColor:'#795548' 
      }}
      
    >
      <Tab.Screen name="questionario" component={Questionario} />
      <Tab.Screen name="ranking" component={RankingScreen} />
    </Tab.Navigator>
  );
};

export default App;
