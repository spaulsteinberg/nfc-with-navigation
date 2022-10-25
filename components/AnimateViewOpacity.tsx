import React, { useEffect, useRef } from 'react'
import { Animated } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const AnimateViewOpacity = () => {
    const opacity:Animated.Value = useRef(new Animated.Value(0)).current
    useEffect(() => {
        Animated.timing(opacity, { toValue: 1, useNativeDriver: true, duration: 2000 }).start()
    }, [])
    return (
        <Animated.View style={{opacity: opacity}}>
            <AntDesign name="checkcircle" size={96} color="green" />
        </Animated.View>
    )
}

export default AnimateViewOpacity