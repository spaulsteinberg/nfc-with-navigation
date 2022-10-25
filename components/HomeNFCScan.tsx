import React from 'react'
import { ActivityIndicator, Pressable, StyleSheet, Text, useWindowDimensions, Vibration, View, Alert, Keyboard } from 'react-native';
import NfcManager, { NfcTech } from 'react-native-nfc-manager';

type HomeNFCScanProps = {
  scanning: boolean;
  handleScanningPress: (d: boolean) => void;
  handleNavigateScreenOnSuccess: (d:any) => void
}
const HEIGHT_WIDTH_FACTOR = 1.78

const NFCErrorAlert = (title: string, message:string):void => Alert.alert(title, message, [{ text: 'OK', onPress: () => Keyboard.dismiss() }])

const HomeNFCScan: React.FC<HomeNFCScanProps> = ({ scanning, handleScanningPress, handleNavigateScreenOnSuccess }) => {

  const handleNfcReadPress = async () => {
    let success:boolean = false;
    let data:any = null
    try {
      handleScanningPress(true)
      await NfcManager.requestTechnology(NfcTech.Ndef)
      const tag = await NfcManager.getTag()
      console.log("TAG FOUND!", tag)
      if (!tag) return NFCErrorAlert("Could not read NFC Tag", "Please make sure the tag is within 4-10 cm of your phone.")
      console.log(String.fromCharCode(...tag.ndefMessage[0].payload))
      data = String.fromCharCode(...tag.ndefMessage[0].payload)
      Vibration.vibrate()
      success = true
    } catch (err) {
      console.error(err)
      return NFCErrorAlert("Could not read NFC Tag", "Please make the NFC tag has not been corrupted.")
    } finally {
      console.log("finally!")
      handleScanningPress(false)
      NfcManager.cancelTechnologyRequest()
    }

    if (success) {
      handleNavigateScreenOnSuccess(data)
    }
  }

  const { width } = useWindowDimensions()

  const outerView: any = {
    flex: 1,
    justifyContent: 'center',
    maxHeight: width > 320 ? 320 : 256,
    width: width > 320 ? 320 / HEIGHT_WIDTH_FACTOR : 256 / HEIGHT_WIDTH_FACTOR
  }
  return (
    <View style={styles.container}>
      <View style={outerView}>
        <Pressable style={styles.pressable} android_ripple={{ color: "#fff" }} onPress={handleNfcReadPress}>
          <View style={styles.vContainer}>
            {
              scanning ? <ActivityIndicator size="large" /> : <Text style={styles.text}>Scan a tag to get started!</Text>
            }
          </View>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressable: {
    backgroundColor: 'lightblue',
    padding: 8,
    borderRadius: 5,
    flex: 1,
  },
  text: {
    color: 'white'
  },
  vContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default HomeNFCScan