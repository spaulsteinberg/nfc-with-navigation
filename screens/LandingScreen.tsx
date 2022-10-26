import React, { useState } from 'react'
import { RootStackScreenProps } from '../types'
import HomeNFCScan from '../components/HomeNFCScan'
import { ScrollView } from 'react-native'

const LandingScreen = ({ navigation }: RootStackScreenProps<'Landing'>) => {

    const [scanning, setScanning] = useState<boolean>(false)

    const handleScanningPress = (s:boolean):void => setScanning(s)

    const handleNavigateScreenOnSuccess = (d:any) => navigation.navigate('SendData', { data: d })

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <HomeNFCScan scanning={scanning} handleScanningPress={handleScanningPress} handleNavigateScreenOnSuccess={handleNavigateScreenOnSuccess} />
    </ScrollView>
  )
}

export default LandingScreen