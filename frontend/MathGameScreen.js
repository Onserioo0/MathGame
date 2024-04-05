// frontend/MathGameScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const MathGameScreen = ({ navigation }) => {
  const [number1, setNumber1] = useState(Math.floor(Math.random() * 100) + 1);
  const [number2, setNumber2] = useState(Math.floor(Math.random() * 100) + 1);
  const [answer, setAnswer] = useState('');

  async function getLeaderboard() {
    try {
        const response = await fetch('http://localhost:3000/leaderboard');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new TypeError("Oops, we haven't got JSON!");
        }
        const data = await response.json();
        return data; // Assuming data is an array of leaderboard entries
    } catch (error) {
        console.error('Error fetching leaderboard:', error.message);
        return []; // Return an empty array in case of error
    }
}

  const checkAnswer = async () => {
    const correctAnswer = number1 + number2;
    const isCorrect = parseInt(answer) === correctAnswer;
    const leaderboardData = await getLeaderboard();
    navigation.navigate('GameResult', { result: isCorrect, leaderboard: leaderboardData });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>What is {number1} + {number2}?</Text>
      <TextInput
        style={styles.input}
        keyboardType='numeric'
        value={answer}
        onChangeText={setAnswer}
        placeholder="Your answer"
      />
      <Button title="Submit" onPress={checkAnswer} style={styles.btn}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  question: {
    fontSize: 24,
    margin: 20,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8,
    padding: 10,
  },
  btn: {
    color: 'red',
  }
});

export default MathGameScreen;
