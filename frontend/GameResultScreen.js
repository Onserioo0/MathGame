import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const GameResultScreen = ({ navigation, route }) => {
    const { result, leaderboard } = route.params;

    return (
        <View style={styles.container}>
            <View style={result === 'correct' ? styles.correctResult : styles.incorrectResult}>
                <Text style={styles.resultText}>{result === 'correct' ? 'Correct!' : 'Incorrect!'}</Text>
            </View>
            <Text style={styles.leaderboardTitle}>Leaderboard</Text>
            <View style={styles.leaderboardContainer}>
                {/* Check if leaderboard is provided and not empty */}
                {leaderboard && leaderboard.length > 0 ? (
                    leaderboard.map((leader, index) => (
                        <Text key={index} style={styles.leaderText}>{index + 1}. {leader.username}</Text>
                    ))
                ) : (
                    <Text style={styles.leaderText}>No leaderboard data available.</Text>
                )}
            </View>
            <Button title="Next" onPress={() => navigation.navigate('MathGame')} />
        </View>
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
