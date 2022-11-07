import React from 'react'
import { StyleSheet, useWindowDimensions, View } from 'react-native'
import { statusColors } from '../../constants/Colors'
import { TableStatus } from '../../constants/TableStatus'
import TouchStatusTile from './TouchStatusTile'

type TouchStatusesProps = {
    handleSubmit: (a?: boolean, n?: string) => Promise<void>;
    loading: boolean;
}

const STATUSES: TableStatus[] = [TableStatus.Ready, TableStatus.Seated, TableStatus.Dirty, TableStatus.Cleaning]
const STATUS_COLOR: string[] = [statusColors.ready, statusColors.seated, statusColors.dirty, statusColors.cleaning]

const TouchStatuses = ({ handleSubmit, loading }: TouchStatusesProps) => {

    const { width } = useWindowDimensions()
    return (
        <View style={styles.container}>
            {STATUSES.map((status, i) => <TouchStatusTile key={status} status={status} color={STATUS_COLOR[i]} width={width} handleSubmit={handleSubmit} loading={loading} />)}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        flexWrap: 'wrap',
        marginHorizontal: 12,
        marginVertical: 42,
        alignContent: 'center'
    }
})

export default TouchStatuses