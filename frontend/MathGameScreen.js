import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground } from 'react-native';
import bgImage from './assets/bg.jpeg'; // Make sure this path is correct

const MathGameScreen = ({ navigation }) => {
  const [number1, setNumber1] = useState(Math.floor(Math.random() * 100) + 1);
  const [number2, setNumber2] = useState(Math.floor(Math.random() * 100) + 1);
  const [answer, setAnswer] = useState('');

  const checkAnswer = () => {
    const isCorrect = parseInt(answer) === number1 + number2;
    navigation.navigate('GameResult', {
      result: isCorrect ? 'correct' : 'incorrect',
      // Assume you will handle the leaderboard state and passing in the `GameResultScreen`
    });

    setAnswer('');
    setNumber1(Math.floor(Math.random() * 100) + 1);
    setNumber2(Math.floor(Math.random() * 100) + 1);
  };

  return (
    <ImageBackground source={bgImage} style={styles.backgroundContainer}>
      <View style={styles.container}>
        <Text style={styles.question}>What is {number1} + {number2}?</Text>
        <TextInput
          style={styles.input}
          keyboardType='numeric'
          value={answer}
          onChangeText={setAnswer}
          placeholder="Your answer"
        />
        <Button title="Submit" onPress={checkAnswer} />
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
  },
  question: {
    fontSize: 24,
    margin: 20,
  },
  input: {
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    width: '80%', // Adjusted to 80% for better usability
    backgroundColor: 'aliceblue',
  },
});

export default MathGameScreen;
