import { StyleSheet, Text, View } from "react-native"

export const Score: React.FC<{score: number}> = ({score}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.scoreText}>{score}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        flex: 0,
        backgroundColor: 'steelblue',
        borderWidth: 3,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
        width: 200
    },
    scoreText: {
        fontWeight: "bold",
        color: "white"
    }
  });