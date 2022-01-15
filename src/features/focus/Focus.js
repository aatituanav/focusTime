
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RoundedButton } from '../../components/RoundedButton';
import { fontSizes, spacing } from "../../utils/sizes";
import { colors } from '../../utils/colors'

export const Focus = ({ addSubject }) => {
    const [subject, setSubject] = useState("")
    return (
        <View style={styles.container}>
            <View style={styles.tittleContainer}>
                <Text style={styles.tittle}>En qué te gustaria enfocarte?</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={{ flex: 1, marginRight: spacing.md }}
                        onChangeText={setSubject}
                        value={subject}
                    />
                    <RoundedButton size={50} title="+" onPress={() => {
                        addSubject(subject)
                    }} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 50,
    },
    tittleContainer: {
        flex: 0.5,
        padding: spacing.md,
        justifyContent: "center"
    },
    tittle: {
        color: colors.white,
        fontWeight: "bold",
        fontSize: fontSizes.lg,
    },
    inputContainer: {
        paddingTop: spacing.md,
        flexDirection: "row",
        alignItems: 'center',
    }
});
