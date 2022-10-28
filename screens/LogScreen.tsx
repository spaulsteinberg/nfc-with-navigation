import React, { useEffect } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import LogNoDataFallback from '../components/logs/LogNoDataFallback'
import { Text } from '../components/Themed'
import getAllLogs from '../state/redux/effects/logEffects'
import { useAppDispatch, useAppSelector } from '../state/redux/hooks'
import { RootTabScreenProps } from '../types'

const LogScreen = ({ navigation }:RootTabScreenProps<'Logging'>) => {
  //{"buser": "Jarvis", "date": [Object], "status": "Dirty", "tableNumber": "2"}
  const logs = useAppSelector(state => state.logs.data)
  const logsLoading = useAppSelector(state => state.logs.loading)
  const logsError = useAppSelector(state => state.logs.error)
  const dispatch = useAppDispatch()
  const t = []
  console.log("LOGS", logs)
  useEffect(() => {
    dispatch(getAllLogs())
  }, [])
  
  return (
    <View style={styles.container}>
      {
        logsLoading ? <ActivityIndicator size="large" color="green" />
        : logsError ? <LogNoDataFallback message='Could not retrieve logs at this time.' isError />
        : logs.length === 0 ? <LogNoDataFallback message='There are no logs to display!'/> : (
          <FlatList
            numColumns={1}
            data={logs}
            renderItem={({ item }) => <Text>{item.id} {item.status}</Text>}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
          />
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default LogScreen