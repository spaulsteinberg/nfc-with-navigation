import React, { useLayoutEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from '../components/Themed'
import { RootStackScreenProps } from '../types'

const LogDetailScreen = ({ route, navigation }:RootStackScreenProps<'LogDetail'>) => {
    const { log } = route.params

    useLayoutEffect(() => {
        if (!log.tableNumber) navigation.navigate("Root")
        navigation.setOptions({
            title: `Table ${log.tableNumber} Log`
        })
    }, [navigation])
    /*
        TODO - 
            *Timeline
            *If log does not exist, route back to logs
    */

  return (
    <View style={styles.container}>
        <Text>Hello world: { log.tableNumber } { log.status } </Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default LogDetailScreen