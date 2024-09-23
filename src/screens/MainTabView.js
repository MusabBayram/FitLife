import React from 'react';
import { StatusBar } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from './HomeScreen';
import ExploreScreen from './ExploreScreen';
import MessagesScreen from './MessagesScreen';
import ProfileScreen from './ProfileScreen';


const Tab = createBottomTabNavigator();

const MainTabView = () => {
  return (
    <>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" /> 
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Ana Sayfa') {
              iconName = focused ? 'home' : 'home';
            } else if (route.name === 'Keşfet') {
              iconName = focused ? 'search' : 'search';
            } else if (route.name === 'Mesajlar') {
              iconName = focused ? 'chat-bubble' : 'chat-bubble-outline';
            } else if (route.name === 'Profil') {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#FFD700',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: { backgroundColor: '#000' },
        })}
      >
        <Tab.Screen name="Ana Sayfa" component={HomeScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Keşfet" component={ExploreScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Mesajlar" component={MessagesScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Profil" component={ProfileScreen} options={{ headerShown: false }} />
      </Tab.Navigator>
    </>
  );
};

export default MainTabView;