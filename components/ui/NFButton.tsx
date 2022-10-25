import React from 'react'
import { Text } from '../Themed'
import { View, Pressable, StyleSheet } from 'react-native'
import Colors from '../../constants/Colors';

type NFButtonProps = {
    title:string;
    onPress: () => any;
    rippleColor?:string;
    disabled?:boolean;
    outerStyle?:object;
    pressableStyle?:object;
    textStyle?:object;
}

const NFButton:React.FC<NFButtonProps> = ({ title, onPress, rippleColor = "#fff", disabled, outerStyle, pressableStyle, textStyle}) => {
  return (
    <View style={[styles.container, outerStyle]}>
        <Pressable
            onPress={onPress}
            style={({pressed}) => [styles.pressable, pressableStyle, pressed && styles.pressed, disabled && styles.disabled]}
            disabled={disabled}
            android_ripple={{color: rippleColor}}
        >
            <Text style={[styles.text, textStyle]}>{title}</Text>
        </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 5,
        overflow: 'hidden',
    },
    pressable: {
        paddingVertical: 12,
        paddingHorizontal: 8,
        elevation: 2,
        backgroundColor: Colors.main.background
    },
    pressed: {
        opacity: .7
    },
    text: {
        color: Colors.main.text,
        textAlign: 'center'
    },
    disabled: {
        opacity: .5
    }
})
export default NFButton