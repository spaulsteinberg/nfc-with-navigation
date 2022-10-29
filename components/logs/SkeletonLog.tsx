import React, { useEffect, useRef } from 'react'
import { View, StyleSheet, Animated } from 'react-native'

const SkeletonLog = () => {
    const opacity: Animated.Value = useRef(new Animated.Value(0.3)).current
    useEffect(() => {
        Animated.loop(
            Animated.timing(opacity, { toValue: 1, useNativeDriver: true, duration: 2000 })
        ).start()
    }, [])
    return (
        <Animated.View style={[styles.container, { opacity: opacity }]}></Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 75,
        backgroundColor: 'lightgray',
        marginVertical: 4,
        marginHorizontal: 8,
        borderRadius: 5,
        overflow: 'hidden',
        padding: 12,
        flexDirection: 'row',
        elevation: 2
    }
})

export default SkeletonLog