import React, { useEffect, useState, useMemo } from 'react'
import { View, StyleSheet, FlatList, Alert, RefreshControl } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import LogDataTile from '../components/logs/LogDataTile'
import LogNoDataFallback from '../components/logs/LogNoDataFallback'
import SearchLogData from '../components/logs/SearchLogData'
import TableLog from '../models/TableLog'
import getAllLogs from '../state/redux/effects/logEffects'
import { useAppDispatch, useAppSelector } from '../state/redux/hooks'
import { RootTabScreenProps } from '../types'
import { getLogs } from '../firebase/api'
import { setLogs } from '../state/redux/slices/logSlice'

const LogScreen = ({ navigation }:RootTabScreenProps<'Logging'>) => {
  //{"buser": "Jarvis", "date": [Object], "status": "Dirty", "tableNumber": "2"}
  const logs = useAppSelector(state => state.logs.data)
  const logsLoading = useAppSelector(state => state.logs.loading)
  const logsError = useAppSelector(state => state.logs.error)
  const [filterValue, setFilterValue] = useState('')
  const [refreshing, setRefreshing] = useState(false)
  const dispatch = useAppDispatch()

  useEffect(() => {
    logs.length <= 0 && dispatch(getAllLogs())
  }, [])

  const filteredLogs:TableLog[] = useMemo(() => {
    if (!filterValue) return logs
    return logs.filter((log:TableLog) => log.tableNumber.includes(filterValue))
  }, [filterValue, logs])

  const handleRefresh = async () => {
    try {
      setRefreshing(true)
      const _logs = await getLogs()
      dispatch(setLogs(_logs))
      setRefreshing(false)
    } catch (err) {
      setRefreshing(false)
      return Alert.alert("Could not refresh feed.", "Please try again later.")
    }
  }
  
  return (
    <View style={styles.container}>
      {
        logsLoading ? <ActivityIndicator size="large" color="green" />
        : logsError ? <LogNoDataFallback message='Could not retrieve logs at this time.' isError />
        : logs.length === 0 ? <LogNoDataFallback message='There are no logs to display!'/> : (
          <FlatList
            ListHeaderComponent={<SearchLogData value={filterValue} setFilterValue={setFilterValue} isEmpty={filteredLogs.length === 0} />}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
            numColumns={1}
            data={filteredLogs}
            renderItem={({ item }) => <LogDataTile log={item} />}
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
    flex: 1,
    backgroundColor: 'white'
  },
})

export default LogScreen