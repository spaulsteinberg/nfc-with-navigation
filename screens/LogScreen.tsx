import React, { useLayoutEffect } from 'react'
import { View, Text } from 'react-native'
import { RootTabScreenProps } from '../types'

const LogScreen = ({ navigation }:RootTabScreenProps<'Logging'>) => {
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Logs",
          });
    }, [])
  return (
    <View>
        <Text>Hello tab 2</Text>
    </View>
  )
}

export default LogScreen