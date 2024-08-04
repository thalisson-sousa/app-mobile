// AppNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';   
 // Remova o NavigationContainer
import Questionario from '@/app/components/questionario/Questionario';
import RankingScreen from '@/app/components/ranking/Ranking';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route   
 }) => ({
        tabBarIcon: ({ color, size }) => {
          let   
 iconName: string;

          if (route.name === 'Questionario') {
            iconName = 'help-circle';
          } else if (route.name === 'Ranking') {
            iconName = 'trophy';
          } else {
            iconName = 'help'; // Valor padrão para ícone
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Questionario" component={Questionario} />
      <Tab.Screen name="Ranking" component={RankingScreen} />
    </Tab.Navigator>
  );
};

export default AppNavigator;