import React from 'react'
import { View } from 'react-native'
import { Text } from '../components/Themed'
import { RootStackScreenProps } from '../types'

const SendDataScreen = ({ route, navigation }:RootStackScreenProps<'SendData'>) => {
    console.log(route.params)
  return (
    <View>
        <Text>Success!</Text>
    </View>
  )
}

export default SendDataScreen