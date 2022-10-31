import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import TableLog from '../../models/TableLog'
import { TableStatus } from '../../constants/TableStatus'
import Time, { convertTimestampDateToReadable } from '../../constants/Time'

const FALLBACK_COLOR = "orange"
const CIRCLE_DIAMETER = 15
const BASE_HEIGHT = 75

type LogTimelineItemProps = {
    item: TableLog,
    isLastItem: boolean;
    heightFactor: any;
    timeDiffInSeconds:number
}

const LogTimelineItem: React.FC<LogTimelineItemProps> = ({ item, isLastItem, heightFactor, timeDiffInSeconds }) => {
    const minutes = timeDiffInSeconds / Time.ONE_MINUTE_IN_SECONDS
    let timeDifferenceDisplay =  isNaN(minutes) ? "" : `${minutes < 1 ? (minutes * 60) : minutes.toFixed(2)} ${minutes < 1 ? "seconds" : "minutes"}`
    let color = item.status === TableStatus.Ready ? "green" : item.status === TableStatus.Cleaning ? "blue" : item.status === TableStatus.Dirty ? "red" : "orange"
    /* @ts-ignore -- this will always be a number that can be converted to a date */
    const date = convertTimestampDateToReadable(new Date(item.date)).split(" ")
    return (
        <View style={[
            styles.row,
            {
                borderLeftColor: color
            },
            isLastItem && {
                borderBottomColor: 'transparent',
                borderLeftColor: 'transparent',
                height: BASE_HEIGHT
            },
            !isLastItem && {
                height: BASE_HEIGHT + (BASE_HEIGHT * heightFactor * 3)
            }
        ]}>
            <Text style={[styles.date, { color }]}>{date[0]}</Text>
            <Text style={[styles.time, { color }]}>{date[1] + " " + date[2] + " - " + item.status}</Text>
            <View style={{flex: 1, justifyContent: 'center'}}>
                <Text style={[{ color }]}>{!isLastItem && timeDifferenceDisplay}</Text>
            </View>
            <View style={[styles.circle, { backgroundColor: color }]}></View>
            {isLastItem && <View style={styles.currentCircle}></View>}
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        borderWidth: 1,
        borderLeftColor: FALLBACK_COLOR,
        borderRightColor: 'transparent',
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
        height: BASE_HEIGHT,
        justifyContent: 'flex-start',
        paddingLeft: 15,
        paddingRight: 12
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
    },
    date: {
        fontSize: 12, 
        position: 'absolute',
        left: -70,
        top: -3
    },
    time: {
        fontSize: 12, 
        position: 'absolute',
        left: 15,
        top: -3
    },
    statusContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default LogTimelineItem