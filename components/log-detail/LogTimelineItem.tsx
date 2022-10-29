import React from 'react'
import { Timestamp } from 'firebase/firestore'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import TableLog from '../../models/TableLog'
import { TableStatus } from '../../constants/TableStatus'

const FALLBACK_COLOR = "orange"
const CIRCLE_DIAMETER = 15

type LogTimelineItemProps = {
    item: TableLog,
    isLastItem: boolean;
}

const LogTimelineItem: React.FC<LogTimelineItemProps> = ({ item, isLastItem }) => {
    let color = item.status === TableStatus.Ready ? "green" : item.status === TableStatus.Cleaning ? "blue" : item.status === TableStatus.Dirty ? "red" : "orange"
    return (
        <View style={[styles.row, { borderLeftColor: color }, isLastItem && { borderBottomColor: 'transparent', borderLeftColor: 'transparent' }]}>
            <Text>{item.date.toString()}</Text>
            <View style={[styles.circle, { backgroundColor: color }]}></View>
            { isLastItem && <View style={styles.currentCircle}></View>}
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        borderWidth: 1,
        borderLeftColor: FALLBACK_COLOR,
        borderRightColor: 'transparent',
        borderTopColor: 'transparent',
        height: 75,
        justifyContent: 'flex-start',
        paddingHorizontal: 24
    },
    circle: {
        height: CIRCLE_DIAMETER,
        width: CIRCLE_DIAMETER,
        borderRadius: CIRCLE_DIAMETER / 2,
        backgroundColor: FALLBACK_COLOR,
        position: 'absolute',
        left: -1 * (CIRCLE_DIAMETER / 2),
        top: -1 * (CIRCLE_DIAMETER / 2)
    },
    currentCircle: {
        height: CIRCLE_DIAMETER / 2,
        width: CIRCLE_DIAMETER / 2,
        borderRadius: CIRCLE_DIAMETER / 4,
        position: 'absolute',
        backgroundColor: 'white',
        zIndex: 2,
        left: -1 * (CIRCLE_DIAMETER / 4),
        top: -1 * (CIRCLE_DIAMETER / 4)
    }
})

export default LogTimelineItem