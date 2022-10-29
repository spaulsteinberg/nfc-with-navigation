import React from 'react'
import { View, StyleSheet, FlatList, Alert, RefreshControl, ActivityIndicator } from 'react-native'
import SkeletonLog from './SkeletonLog'

const LogLoadingSkeleton:React.FC = () => {
  return (
    <View style={styles.container}>
        <ActivityIndicator size="large" color="gray" />
        {
            [0,1,2,3,4,5].map((n:number) => <SkeletonLog key={n} />)
        }
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 8,
        marginVertical: 12
    },
})

export default LogLoadingSkeleton