// frontend/RegistrationScreen.js

import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, ImageBackground } from 'react-native';
import bgImage from './assets/bg.jpeg';

const RegistrationScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegistration = () => {
    if (!username || !password || !confirmPassword) {
      Alert.alert("Error", "All fields must be completed");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
    registerUser(username, password);
  };

  const registerUser = (username, password) => {
    fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success') {
          Alert.alert('Registration Successful', 'You can now login with your credentials.');
          navigation.navigate('Login');
        } else {
          Alert.alert('Registration Failed', data.message);
        }
      })
      .catch((error) => {
        Alert.alert('Network Error', 'Failed to connect to the server');
      });
  };
  
  return (
    <ImageBackground source={bgImage} style={styles.backgroundContainer}>
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <Button title="Register" onPress={handleRegistration} />
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  input: {
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    width: '50%',
    backgroundColor: 'aliceblue',
  },
});

export default RegistrationScreen;
