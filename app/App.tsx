import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';   

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './components/home/Home';
import Questionario from './components/questionario/Questionario';
import RankingScreen from './components/ranking/Ranking';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen   
 name="Home" component={Home}   
 />
        <Stack.Screen name="Questionario" component={QuestionarioStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const QuestionarioStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Questionário" component={Questionario} />
      <Tab.Screen name="Ranking" component={RankingScreen} />
    </Tab.Navigator>
  );
};

export default App;