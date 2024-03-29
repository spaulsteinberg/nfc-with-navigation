import React, { useState, useEffect, useRef } from 'react'
import { Pressable, StyleSheet, Text, useWindowDimensions, Vibration, View, Alert, Keyboard } from 'react-native';
import NfcManager, { NfcTech } from 'react-native-nfc-manager';
import AnimatedViewOpacity from './AnimateViewOpacity'
import { AntDesign } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import LottieView from 'lottie-react-native';
import { Button } from 'react-native-paper';

type HomeNFCScanProps = {
  scanning: boolean;
  handleScanningPress: (d: boolean) => void;
  handleNavigateScreenOnSuccess: (d: any) => void
}

const NFCErrorAlert = (title: string, message: string): void => Alert.alert(title, message, [{ text: 'OK', onPress: () => Keyboard.dismiss() }])

const HomeNFCScan: React.FC<HomeNFCScanProps> = ({ scanning, handleScanningPress, handleNavigateScreenOnSuccess }) => {

  const [showAnimate, setShowAnimate] = useState<boolean>(false)
  const animationRef = useRef<LottieView>(null)

  useEffect(() => {
    if (scanning) {
      animationRef.current?.play()
      animationRef.current?.play(30, 115);
    }
  }, [scanning])

  const handleNfcReadPress = async () => {
    let success: boolean = false;
    let data: any = null
    handleScanningPress(true)

    try {
      await NfcManager.requestTechnology(NfcTech.Ndef)
    } catch (err) {
      handleScanningPress(false)
      return await NfcManager.cancelTechnologyRequest()
    }

    try {
      const tag = await NfcManager.getTag()
      if (!tag) return NFCErrorAlert("Could not read NFC Tag", "Please make sure the tag is within 4-10 cm of your phone.")
      console.log(String.fromCharCode(...tag.ndefMessage[0].payload))
      data = String.fromCharCode(...tag.ndefMessage[0].payload)
      Vibration.vibrate()
      success = true
    } catch (err) {
      console.error(err)
      return NFCErrorAlert("Could not read NFC Tag", "Please make the NFC tag has not been corrupted.")
    } finally {
      await NfcManager.cancelTechnologyRequest()
      handleScanningPress(false)
    }

    if (success) {
      setShowAnimate(true)
      setTimeout(() => {
        handleNavigateScreenOnSuccess(data)
        setShowAnimate(false)
      }, 2000)
    }
  }

  const handleCancelPress = async () => {
    await NfcManager.cancelTechnologyRequest()
  }

  const { width } = useWindowDimensions()

  const outerView: any = {
    flex: 1,
    justifyContent: 'center',
    maxHeight: width > 320 ? 320 : 256,
    minHeight: 256,
    width: width > 320 ? 300 : 256,
    marginVertical: width > 300 ? 24 : 0,
  }

  return (
    <View style={styles.container}>
      <View style={outerView}>
        <Pressable style={styles.pressable} android_ripple={{ color: "#fff" }} onPress={handleNfcReadPress} disabled={scanning || showAnimate}>
          {scanning && <Text style={{ color: "black", fontSize: 20, textAlign: 'center', paddingTop: 8 }}>Ready to Scan</Text>}
          <View style={styles.vContainer}>
            {
              scanning ?
                <LottieView
                  source={require('../assets/json/phone.json')}
                  ref={animationRef}
                />
                : showAnimate ? (
                  <AnimatedViewOpacity>
                    <AntDesign name="checkcircleo" size={96} color="#0197f6" style={{textAlign: 'center'}} />
                    <Text style={[styles.text, styles.scanned]}>Scan Complete</Text>
                  </AnimatedViewOpacity>
                ) : <Text style={styles.text}>Tap to Begin</Text>
            }
          </View>
          { scanning && <Button textColor='black' style={styles.cancelButton} onPress={handleCancelPress}>Cancel</Button> }
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
    justifyContent: 'center'
  },
  pressable: {
    padding: 8,
    borderRadius: 10,
    flex: 1,
    borderColor: Colors.main.nfc,
    borderWidth: 1,
  },
  text: {
    color: Colors.main.nfc,
    textAlign: 'center'
  },
  vContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  scanned: {
    paddingTop: 12,
    fontSize: 18
  },
  scanningText: {
    color: "black",
    fontSize: 20,
    textAlign: 'center',
    paddingTop: 8
  },
  cancelButton: {
    borderWidth: .5,
    color: 'black',
    backgroundColor: 'lightgray',
    marginBottom: 8
  }
})

export default HomeNFCScan