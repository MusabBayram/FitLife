import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import MainTabView from './screens/MainTabView';
import SettingsScreen from './screens/SettingsScreen'; // Import the new Settings screen

const Stack = createNativeStackNavigator();

const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="Main"
          component={MainTabView}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen} // Add the Settings screen to the stack
          options={{
            title: 'Ayarlar',
            headerStyle: {
              backgroundColor: '#000', // Arka plan rengi siyah yapılıyor
            },
            headerTintColor: '#FFD700', // Yazı rengi sarı
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}         />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;