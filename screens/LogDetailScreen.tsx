import React, { useLayoutEffect } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import LogTimelineItem from '../components/log-detail/LogTimelineItem'
import { useAppSelector } from '../state/redux/hooks'
import { logsByTableNumberSelector } from '../state/redux/selectors/logSelectors'
import { RootStackScreenProps } from '../types'

const LogDetailScreen = ({ route, navigation }: RootStackScreenProps<'LogDetail'>) => {
    const { log } = route.params
    const logs = useAppSelector(logsByTableNumberSelector(log.tableNumber))
    useLayoutEffect(() => {
        if (!log.tableNumber) navigation.navigate("Root")
        navigation.setOptions({
            title: `Table ${log.tableNumber} Log`
        })
    }, [navigation])

    let timeDifferences:any = []
    for (let i = 0; i < logs.length; i++) {
        if ((i + 1) > logs.length - 1) {
            console.log("index", i + 1, "is out of bounds")
            break;
        }
        timeDifferences.push(Number(logs[i + 1].date) - Number(logs[i].date))
    }
    const totalRatio = Number(logs[logs.length - 1].date) - Number(logs[0].date)

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container}>
                {
                    logs.map((log, i) => <LogTimelineItem key={log.id} item={log} isLastItem={i === logs.length - 1} heightFactor={timeDifferences[i] / totalRatio} />)
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