import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native"
import { colors } from "../utils/colors";
import { fontSizes, spacing } from "../utils/sizes";

const minutesToMillis = (min) => min * 1000 * 60
const formatTime = (time) => time < 10 ? `0${time}` : time

export const Countdown = ({
    minutes = 1,
    isPaused,
    onProgress,
    onEnd
}) => {

    const [millis, setMillis] = useState(null)

    const minute = Math.floor(millis / 1000 / 60) % 60
    const seconds = Math.floor(millis / 1000) % 60

    const interval = React.useRef(null)

    const countdown = () => {
        setMillis((time) => {
            if (time === 0) {
                return time
            }
            const timeLeft = time - 1000
            return timeLeft
        })
    }

    useEffect(() => {
        if (millis === 0) {
            clearInterval(interval.current)
            onEnd()
        }
        onProgress(millis / minutesToMillis(minutes))
    }, [millis])

    useEffect(() => {
        setMillis(minutesToMillis(minutes))
    }, [minutes])

    useEffect(() => {
        if (isPaused) {
            if (interval.current) clearInterval(interval.current)
            return;
        }
        interval.current = setInterval(countdown, 1000)

        return () => clearInterval(interval.current)
    }, [isPaused])

    return (
        <Text style={styles.text}>{formatTime(minute)}:{formatTime(seconds)}</Text>
    )
}


const styles = StyleSheet.create({
    text: {
        fontWeight: 'bold',
        color: colors.white,
        padding: spacing.lg,
        backgroundColor: 'rgba(94, 132, 226, 0.3)',
        fontSize: fontSizes.xxxl,
        borderRadius: 50
    }
}) 