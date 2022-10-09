import { Image, StyleSheet, Animated, Easing, Text } from "react-native"
import React, { useRef, useCallback, useEffect } from 'react';

export const Can: React.FC<{shakeSpeed: number, showFoam: boolean}> = ({shakeSpeed, showFoam}) => {
    const anim = useRef(new Animated.Value(0));
    const shake = useCallback(() => {
        const shakeValue = getShakeValue(shakeSpeed);
        ShakeAnimation(shakeValue, anim);
    }, [shakeSpeed]);

    useEffect(() => {
        shake();
    }, [shake]);

    return (
    <Animated.View style={{transform: [{translateX: anim.current}]}}>
        {showFoam && <Image source= {require("./../../assets/beer-foam.png")} style={styles.foam}/>}
        <Image source= {require("./../../assets/can.png")} style={styles.can}/>
    </Animated.View>);
}

export enum ShakeSpeed {
    Low = 15,
    High = 25
}

const getShakeValue = (shakeSpeed: number) => {
    if (shakeSpeed > ShakeSpeed.High) {
        return 20;
    } else if (shakeSpeed > ShakeSpeed.Low) {
        return 10;
    } else {
        return 0;
    }
}

const styles = StyleSheet.create({
    foam: {
        width: 200,
        height: 200,
        zIndex: 2,
        position: "absolute",
        top: -50
    },
    can: {
        width: 200,
        height: 360,
        zIndex: 1
    }
  });

const ShakeAnimation = (shakeValue: number, anim: React.MutableRefObject<Animated.Value>) => Animated.loop(
    // runs the animation array in sequence
    Animated.sequence([
      // shift element to the left by 2 units
      Animated.timing(anim.current, {
          toValue: -shakeValue,
          duration: 50,
          easing: Easing.ease,
          useNativeDriver: true
      }),
      // shift element to the right by 2 units
      Animated.timing(anim.current, {
        toValue: shakeValue,
        duration: 50,
        easing: Easing.ease,
        useNativeDriver: true
      }),
      // bring the element back to its original position
      Animated.timing(anim.current, {
        toValue: 0,
        duration: 50,
        easing: Easing.ease,
        useNativeDriver: true
      }),
    ]),
    { iterations: 4 }
  ).start(); 