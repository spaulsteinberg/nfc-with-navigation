import React, { useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { NFInlineTextInput } from '../components/ui'
import NFButton from '../components/ui/NFButton'
import { RootStackScreenProps } from '../types'

const SendDataScreen = ({ route, navigation }: RootStackScreenProps<'SendData'>) => {
  
  if (!route.params || !route.params.data) {
    navigation.navigate("Landing")
  }

  const [tableNumber, setTableNumber] = useState(route.params.data)
  const [tableBuserName, setTableBuserName] = useState('')
  const [tableStatus, setTableStatus] = useState('')

  const handleConfirmPress = () => {
    console.log("press")
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <NFInlineTextInput label='Table' vStyle={styles.secondaryTextView} iStyle={styles.input}value={tableNumber} onChangeText={setTableNumber} editable={false} />
        <NFInlineTextInput label='Buser' vStyle={styles.secondaryTextView} iStyle={styles.input} value={tableBuserName} onChangeText={setTableBuserName} />
        <NFInlineTextInput label='Status' vStyle={styles.secondaryTextView} iStyle={styles.input} value={tableStatus} onChangeText={setTableStatus} />
        <View>
          <NFButton outerStyle={styles.buttonOuterView} title="Confirm" onPress={handleConfirmPress} />
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 12,
    marginVertical: 48
  },
  input: {
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "gray"
  },
  secondaryTextView: {
    marginVertical: 12
  },
  buttonOuterView: {
    marginVertical: 24
  }
})

export default SendDataScreen