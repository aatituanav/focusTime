
import React, { useEffect, useState } from 'react'
import { StyleSheet, View, AsyncStorageStatic } from 'react-native';
import { Focus } from './src/features/focus/Focus'
import { Timer } from './src/features/timer/Timer'
import { colors } from './src/utils/colors';
import Constants from 'expo-constants';
import { FocusHistory } from './src/features/focus/FocusHistory';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STATUSES = {
  COMPLETE: 1,
  CANCELLED: 2
}

export default function App() {
  const [focusSubject, setFocusSubject] = useState(null)
  const [focusHistory, setFocusHistory] = useState([])

  const addFocusHistorySubjectWithState = (subject, status, key) => {
    setFocusHistory([...focusHistory, { subject, status, key }])
  }
  const onClear = () => {
    setFocusHistory([])
  }
  const saveFocusHistory = async () => {
    try {
      const jsonValue = JSON.stringify(focusHistory)
      await AsyncStorage.setItem('@storage_Key', jsonValue)
    } catch (error) {

    }
  }

  const loadFocusHistory = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key')
      setFocusHistory(jsonValue != null ? JSON.parse(jsonValue) : [])
    } catch (error) {

    }
  }

  useEffect(() => { loadFocusHistory() }, [])
  useEffect(() => { saveFocusHistory() }, [focusHistory])

  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onTimerEnd={() => {
            addFocusHistorySubjectWithState(focusSubject, STATUSES.COMPLETE, focusHistory.length)
            setFocusSubject(null)
          }}
          clearSubject={() => {
            addFocusHistorySubjectWithState(focusSubject, STATUSES.CANCELLED, focusHistory.length)
            setFocusSubject(null)
          }}
        />
      ) : (
        <>
          <Focus addSubject={setFocusSubject} />
          <FocusHistory focusHistory={focusHistory} onClear={onClear} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: colors.darkBlue
  },
});
