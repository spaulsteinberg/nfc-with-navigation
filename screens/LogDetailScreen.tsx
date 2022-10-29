import { Timestamp } from 'firebase/firestore'
import React, { useLayoutEffect } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
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

    let now = Timestamp.now().toDate()
    let MS_PER_MINUTE = 60000;
    let d1 = new Date(now.getTime() - 30 * MS_PER_MINUTE), d2 = new Date(now.getTime() - 25 * MS_PER_MINUTE), d3 = new Date(now.getTime() - 22 * MS_PER_MINUTE)
    let d4 = new Date(now.getTime() - 3 * MS_PER_MINUTE)
    const items: TableLog[] = [
        {
            id: '1234',
            tableNumber: '23',
            buser: 'Sam S.',
            date: d1,
            status: TableStatus.Ready
        },
        {
            id: '12345',
            tableNumber: '23',
            buser: 'jarvis W.',
            date: d2,
            status: TableStatus.Dirty
        },
        {
            id: '12346',
            tableNumber: '23',
            buser: 'jarvis W.',
            date: d3,
            status: TableStatus.Cleaning
        },
        {
            id: '123478',
            tableNumber: '23',
            buser: 'Giles C.',
            date: d4,
            status: TableStatus.Ready
        },
        
        {
            id: '12347',
            tableNumber: '23',
            buser: 'Giles C.',
            date: Timestamp.now().toDate(),
            status: TableStatus.Dirty
        }
    ]

    let timeDifferences:any = []
    for (let i = 0; i < items.length; i++) {
        if ((i + 1) > items.length - 1) {
            console.log("index", i + 1, "is out of bounds")
            break;
        }
        timeDifferences.push(Number(items[i + 1].date) - Number(items[i].date))
    }
    const totalRatio = Number(items[items.length - 1].date) - Number(items[0].date)

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container}>
                {
                    items.map((item, i) => <LogTimelineItem key={item.id} item={item} isLastItem={i === items.length - 1} heightFactor={timeDifferences[i] / totalRatio} />)
                }
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 36
    },
})

export default LogDetailScreen