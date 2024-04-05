// frontend/App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MathGameScreen from './MathGameScreen';
import GameResultScreen from './GameResultScreen';
import RegistrationScreen from './RegistrationScreen';
import LoginScreen from './LoginScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ title: 'Login' }} // Ensures the login screen has a title
        />
        <Stack.Screen 
          name="Register" 
          component={RegistrationScreen} 
          options={{ title: 'Register' }} // Confirming the title for consistency
        />
        <Stack.Screen 
          name="GameResult" 
          component={GameResultScreen} 
          options={{ title: 'Game Result' }} // Confirms the title for the game result screen
        />
        <Stack.Screen 
          name="MathGame" 
          component={MathGameScreen} 
          options={{ title: 'Math Game' }} // Ensures the math game screen has a title
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
