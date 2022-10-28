import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { getLogs } from '../firebase/api'
import { RootTabScreenProps } from '../types'

const LogScreen = ({ navigation }:RootTabScreenProps<'Logging'>) => {
  useEffect(() => {
    const fetchData = async () => {
      const logs = await getLogs()
      console.log(logs)
    }

    fetchData()
  }, [])
  
  return (
    <View>
        <Text>Hello tab 2</Text>
    </View>
  )
}

export default LogScreen