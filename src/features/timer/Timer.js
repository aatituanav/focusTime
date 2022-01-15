import React, { useState } from 'react'
import { View, StyleSheet, Text, Vibration, Platform } from 'react-native'
import { Countdown } from '../../components/Countdown'
import { RoundedButton } from '../../components/RoundedButton'
import { colors } from '../../utils/colors'
import { spacing } from '../../utils/sizes'
import { ProgressBar } from 'react-native-paper';
import { Timing } from './Timing'
import { useKeepAwake } from 'expo-keep-awake';


export const Timer = ({ focusSubject, onTimerEnd, clearSubject}) => {
    useKeepAwake()

    const DEFAULT_TIME = 0.1
    const [isStarted, setIsStarted] = useState(false)
    const [progress, setProgress] = useState(1)
    const [minutes, setMinutes] = useState(DEFAULT_TIME)

    const onProgress = (progress) => {
        setProgress(progress)

    }

    const vibrate = () => {
        console.log(Platform.OS)
        if (Platform.OS == 'ios') {
            const interval = setInterval(() => Vibration.vibrate, 1000)
            setTimeout(() => clearInterval(interval), 10000)
        } else {
            Vibration.vibrate(Array(10).fill(1000))
        }
    }

    const onEnd = () => {
        setMinutes(DEFAULT_TIME)
        setProgress(1)
        setIsStarted(false)
        vibrate()
        onTimerEnd()
    }

    const changeTime = (min) => {
        setMinutes(min)
        setProgress(1)
        setIsStarted(false)
    }

    return (
        <View style={styles.container}>
            <View style={styles.countdown}>
                <Countdown
                    minutes={minutes}
                    isPaused={!isStarted}
                    onProgress={onProgress}
                    onEnd={onEnd}
                />
            </View>
            <View style={{ paddingTop: spacing.xxl }}>
                <Text style={styles.title}>Focusing on:</Text>
                <Text style={styles.task}>{focusSubject}</Text>
            </View>
            <View style={{ height: 10, paddingTop: spacing.sm }}>
                <ProgressBar
                    color='#5E84E2'
                    style={{ height: 10 }}
                    progress={progress} />
            </View>
            <View style={styles.buttonWrapper}>
                <Timing onChangeTime={changeTime} />
            </View>
            <View style={styles.buttonWrapper}>
                {isStarted ?
                    <RoundedButton title="Pause" onPress={() => { setIsStarted(false) }} />
                    :
                    <RoundedButton title="Start" onPress={() => { setIsStarted(true) }} />}
            </View>
            <View style={styles.clearSubject}>
                <RoundedButton title="Clear" size={50} onPress={() => { clearSubject() }} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        color: colors.white,
        textAlign: 'center'
    },
    task: {
        color: colors.white,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    countdown: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: 'red'
    },
    buttonWrapper: {
        flex: 0.3,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
        //backgroundColor: 'green'
    },
    clearSubject:{
        paddingBottom:25,
        paddingLeft:25,

    }
})