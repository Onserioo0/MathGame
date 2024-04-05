import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, ImageBackground } from 'react-native';
import bgImage from './assets/bg.jpeg'; // Make sure this path is correct

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success') {
          navigation.navigate('MathGame');
        } else {
          setError('Username/password incorrect');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setError('An error occurred. Please try again later.');
      });
  };

  return (
    <ImageBackground source={bgImage} style={styles.backgroundContainer}>
      <View style={styles.container}>
        <View style={styles.arrange}>
          {error.length > 0 && <Text style={styles.errorText}>{error}</Text>}
          <TextInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            style={styles.input}
          />
          <Button title="Login" onPress={handleLogin} />
        </View>
        <View style={styles.arrange2}>
          <Button title="Sign up" styles={"background-color: red;"}
            onPress={() => navigation.navigate('Register')} />
        </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  arrange: {
    width: '50%',
    height: '50vh',
    justifyContent: 'flex-end',
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
  },
  arrange2: {
    width: '50%',
    height: '25vh',
    justifyContent: 'flex-end',
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'aliceblue',
  },
  box: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '100%',
  },
  errorText: {
    color: 'red',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 10,
  },
  signup: {
    position: 'absolute',
  },
});

export default LoginScreen;
