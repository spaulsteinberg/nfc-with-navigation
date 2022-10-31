import React, { useLayoutEffect, useState, useMemo } from 'react'
import { ScrollView, StyleSheet, View, Alert, RefreshControl } from 'react-native'
import LogTimelineItem from '../components/log-detail/LogTimelineItem'
import { getLogs } from '../firebase/api'
import { useAppDispatch, useAppSelector } from '../state/redux/hooks'
import { logsByTableNumberSelector } from '../state/redux/selectors/logSelectors'
import { mergeLogs } from '../state/redux/slices/logSlice'
import { RootStackScreenProps } from '../types'

const LogDetailScreen = ({ route, navigation }: RootStackScreenProps<'LogDetail'>) => {
    const { log } = route.params
    const logs = useAppSelector(logsByTableNumberSelector(log.tableNumber))
    const dispatch = useAppDispatch()
    const [refreshing, setRefreshing] = useState(false)
    useLayoutEffect(() => {
        if (!log.tableNumber) navigation.navigate("Root")
        navigation.setOptions({
            title: `Table ${log.tableNumber} Log`
        })
    }, [navigation])

    const handleRefresh = async () => {
        try {
            setRefreshing(true)
            const logs = await getLogs(log.tableNumber)
            dispatch(mergeLogs(logs))
        } catch (err) {
            console.log(err)
            Alert.alert("Could not refresh logs", `We could not refresh the logs for table ${log.tableNumber} at this time.`)
        } finally {
            setRefreshing(false)
        }
    }

    const timeDifferences:number[] = useMemo(() => {
        let timeDifferences:number[] = []
        for (let i = 0; i < logs.length; i++) {
            if ((i + 1) > logs.length - 1) {
                console.log("index", i + 1, "is out of bounds")
                break;
            }
            timeDifferences.push(Number(logs[i + 1].date) - Number(logs[i].date))
        }
        return timeDifferences
    }, [logs])

    const totalRatio:number = useMemo(() => Number(logs[logs.length - 1].date) - Number(logs[0].date), [])

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}>
            <View style={styles.container}>
                {
                    logs.map((log, i) => <LogTimelineItem key={log.id} item={log} isLastItem={i === logs.length - 1} timeDiffInSeconds={timeDifferences[i]} heightFactor={timeDifferences[i] / totalRatio} />)
                }
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 36,
        marginLeft: 96
    },
})

export default LogDetailScreen