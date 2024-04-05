// frontend/GameResultScreen.js
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import bgImage from './assets/bg.jpeg';

const GameResultScreen = ({ navigation, route }) => {
    const { result, leaderboard } = route.params;

    return (
        <ImageBackground source={bgImage} style={styles.backgroundContainer}>
        <View style={styles.container}>
            <View style={result ? styles.correctResult : styles.incorrectResult}>
                <Text style={styles.resultText}>{result ? 'Correct!' : 'Incorrect!'}</Text>
            </View>
            <Text style={styles.leaderboardTitle}>Leaderboard</Text>
            <View style={styles.leaderboardContainer}>
                {leaderboard.map((leader, index) => (
                    <Text key={index} style={styles.leaderText}>{index + 1}. {leader.username}</Text>
                ))}
            </View>
            <Button title="Try Again" onPress={() => navigation.navigate('MathGame')} />
        </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    correctResult: {
        backgroundColor: 'green',
        padding: 10,
    },
    incorrectResult: {
        backgroundColor: 'red',
        padding: 10,
    },
    resultText: {
        fontSize: 24,
        color: 'white',
    },
    leaderboardTitle: {
        fontSize: 20,
        marginVertical: 20,
    },
    leaderboardContainer: {
        marginBottom: 20,
    },
    leaderText: {
        fontSize: 16,
    },
});

export default GameResultScreen;
