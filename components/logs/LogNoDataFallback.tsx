import React from 'react'
import { View } from 'react-native'
import Colors from '../../constants/Colors';
import { Text } from '../Themed'

type LogNoDataFallbackProps = {
    message:string;
    isError?:boolean;
}

const LogNoDataFallback:React.FC<LogNoDataFallbackProps> = ({ message, isError = false }) => {
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Text style={{color: isError ? Colors.main.background : Colors.light.text}}>{message}</Text>
        </View>
    )
}

export default LogNoDataFallback