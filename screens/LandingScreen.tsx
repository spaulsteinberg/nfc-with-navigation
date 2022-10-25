import React, { useState } from 'react'
import { RootStackScreenProps } from '../types'
import HomeNFCScan from '../components/HomeNFCScan'

const LandingScreen = ({ navigation }: RootStackScreenProps<'Landing'>) => {

    const [scanning, setScanning] = useState<boolean>(false)

    const handleScanningPress = (s:boolean):void => setScanning(s)

    const handleNavigateScreenOnSuccess = (d:any) => navigation.navigate('SendData', { data: d })

  return (
    <HomeNFCScan scanning={scanning} handleScanningPress={handleScanningPress} handleNavigateScreenOnSuccess={handleNavigateScreenOnSuccess} />
  )
}

export default LandingScreen