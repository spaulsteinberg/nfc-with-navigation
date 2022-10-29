import { Timestamp } from 'firebase/firestore'
import React, { useLayoutEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import LogTimelineItem from '../components/log-detail/LogTimelineItem'
import { Text } from '../components/Themed'
import { TableStatus } from '../constants/TableStatus'
import TableLog from '../models/TableLog'
import { RootStackScreenProps } from '../types'

const LogDetailScreen = ({ route, navigation }: RootStackScreenProps<'LogDetail'>) => {
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

    let now = Timestamp.now().toDate()
    let MS_PER_MINUTE = 60000;
    let d1 = new Date(now.getTime() - 10 * MS_PER_MINUTE), d2 = new Date(now.getTime() - 7 * MS_PER_MINUTE), d3 = new Date(now.getTime() - 5 * MS_PER_MINUTE)

    const items: TableLog[] = [
        {
            id: '1234',
            tableNumber: '23',
            buser: 'Sam S.',
            date: d1.toISOString(),
            status: TableStatus.Ready
        },
        {
            id: '12345',
            tableNumber: '23',
            buser: 'jarvis W.',
            date: d2.toISOString(),
            status: TableStatus.Dirty
        },
        {
            id: '12346',
            tableNumber: '23',
            buser: 'jarvis W.',
            date: d3.toISOString(),
            status: TableStatus.Cleaning
        },
        {
            id: '12347',
            tableNumber: '23',
            buser: 'Giles C.',
            date: Timestamp.now().toDate().toISOString(),
            status: TableStatus.Ready
        }
    ]

    return (
        <View style={styles.container}>
            {
                items.map((item, i) => <LogTimelineItem key={item.id} item={item} isLastItem={i === items.length - 1} />)
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 36
    },
})

export default LogDetailScreen