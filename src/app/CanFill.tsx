import { Animated, StyleSheet, Text, View } from "react-native";

export const CanFill: React.FC<{canFill: number}> = ({canFill}) => {
    const canFillPercentage = `${Math.trunc(canFill)}%`;
    return (
        <View style={styles.container}>
            <View style={styles.progressBar}>
                <Animated.View style={[{...styles.progressFill, height: canFillPercentage}]}/>
            </View>
        </View>);
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },
    progressBar: {
        width: 40,
        height: 500,
        backgroundColor: '#fff',
        borderWidth: 3,
        borderRadius: 8,
        borderColor: '#555',
        flexDirection:"column",
        position: "relative"
    },
    progressFill: {
        backgroundColor: "#8BED4F",
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0
    },
    proggressText: {
        fontWeight: "bold"
    }
  });