import React from "react";
import { View, Text, SafeAreaView, FlatList, StyleSheet } from 'react-native'
import { fontSizes, spacing } from "../../utils/sizes";
import { RoundedButton } from '../../components/RoundedButton';


const HistoryItem = ({ item, index }) => {
    return (
        <View>
            <Text style={[styles.historyItem, (item.status > 1) ? { color: 'red' } : { color: 'green' }]}>{item.subject}</Text>
        </View >
    )
}
//<Text>{JSON.stringify(item)}</Text>
export const FocusHistory = ({ focusHistory, onClear }) => {
    const clearHistory = () => {
        onClear();
    }



    return (
        <>
            <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
                {!!focusHistory.length && (
                    <>
                        <Text style={styles.title}>Cosas en las que me he enfocado</Text>
                        <FlatList
                            style={{ flex: 1 }}
                            contentContainerStyle={{ flex: 1, alignItems: 'center' }}
                            data={focusHistory}
                            renderItem={HistoryItem}
                        />
                        <View style={styles.clearContainer}>
                            <RoundedButton size={75} title="Clear" onPress={() => onClear()} />
                        </View>
                    </>
                )}
            </SafeAreaView>
        </>
    )
}




const styles = StyleSheet.create({
    historyItem: {
        fontSize: fontSizes.md,
    },
    title: {
        color: 'white',
        fontSize: fontSizes.lg,
    },
    clearContainer: {
        alignItems: 'center',
        padding: spacing.md,
    }
})