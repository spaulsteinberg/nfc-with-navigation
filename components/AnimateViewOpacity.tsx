import React, { useEffect, useRef } from 'react'
import { Animated } from 'react-native';

type AnimatedViewOpacityProps = {
    children: any,
    duration?:number
    
}

const AnimateViewOpacity:React.FC<AnimatedViewOpacityProps> = ({ children, duration = 2000 }) => {
    const opacity:Animated.Value = useRef(new Animated.Value(0)).current
    useEffect(() => {
        Animated.timing(opacity, { toValue: 1, useNativeDriver: true, duration }).start()
    }, [])
    return (
        <Animated.View style={{opacity: opacity}}>
            { children }
        </Animated.View>
    )
}

export default AnimateViewOpacity