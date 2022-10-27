import React from 'react'
import { View, Text } from 'react-native'
import { RootTabScreenProps } from '../types'

const LogScreen = ({ navigation }:RootTabScreenProps<'Logging'>) => {
  return (
    <View>
        <Text>Hello tab 2</Text>
    </View>
  )
}

export default LogScreen