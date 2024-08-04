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
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: string;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Questionario') {
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
      {/* <Tab.Screen name="Home" component={HomeScreen} /> */}
      <Tab.Screen name="Questionario" component={Questionario} />
      <Tab.Screen name="Ranking" component={Ranking} />
    </Tab.Navigator>
  );
};

export default AppTabs;
