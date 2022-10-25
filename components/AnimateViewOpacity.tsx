import React, { useEffect, useRef } from 'react'
import { Animated } from 'react-native';

type AnimatedViewOpacityProps = {
    children: any
}

const AnimateViewOpacity:React.FC<AnimatedViewOpacityProps> = ({ children }) => {
    const opacity:Animated.Value = useRef(new Animated.Value(0)).current
    useEffect(() => {
        Animated.timing(opacity, { toValue: 1, useNativeDriver: true, duration: 2000 }).start()
    }, [])
    return (
        <Animated.View style={{opacity: opacity}}>
            { children }
        </Animated.View>
    )
}

export default AnimateViewOpacity