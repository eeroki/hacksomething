import { StyleSheet, View } from "react-native";
import React, {useEffect, useState} from 'react';
import { Can, ShakeSpeed } from "./Can";
import {
    accelerometer,
    setUpdateIntervalForType,
    SensorTypes
  } from "react-native-sensors";
  import { map, filter } from "rxjs/operators";
import { CanFill } from "./CanFill";
import { Score } from "./Score";

export const GameArea: React.FC<{}> = () => {
    setUpdateIntervalForType(SensorTypes.accelerometer, 400);

    const [score, setScore] = useState(0);
    const [speed, setSpeed] = useState(0);
    const [showFoam, setShowFoam] = useState(false);
    const [canFill, setCanFill] = useState(100);

    useEffect(() => {
        const subscription = accelerometer
        .pipe(map(({ x, y, z }) => x + y + z), filter(speed => speed >= ShakeSpeed.Low))
        .subscribe({
            next: speed => {
                setSpeed(speed);
                if (canFill - speed < 0) {
                    setCanFill(100);
                    setScore(score + 1);
                    setShowFoam(true);
                } else {
                    setCanFill(canFill - speed);
                    setShowFoam(false);
                }
            },
            error: error => {
                console.log("The sensor is not available");
            }}
        );
        return () => subscription.unsubscribe();  
    });

    return (
    <View style={styles.gameAreaContainer}>
        <View style={styles.columnContainer}>
            <CanFill canFill={canFill} />
        </View>
        <View style={styles.columnContainer}>
            <Can shakeSpeed={speed} showFoam={showFoam}/>
            <View style={styles.score}>
                <Score score={score} />
            </View>
        </View>
    </View>)
}
const styles = StyleSheet.create({
    gameAreaContainer: {
        paddingHorizontal: 14,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: "100%",
        width: "100%",
    },
    columnContainer: {
        display: "flex",
        flexDirection: "column",
    },
    score: {
        marginTop: 60,
    }
  });