import React, { useState } from 'react'
import { ScrollView, StyleSheet, Button, View } from 'react-native'
import { Text } from '../components/Themed'
import { NFInlineTextInput } from '../components/ui'
import NFButton from '../components/ui/NFButton'
import { RootStackScreenProps } from '../types'

const SendDataScreen = ({ route, navigation }: RootStackScreenProps<'SendData'>) => {

  const [tableStatus, setTableStatus] = useState('')
  const [tableNumber, setTableNumber] = useState('')
  const [tableBuserName, setTableBuserName] = useState('')

  /* if (!route.params || !route.params.data) {
    navigation.navigate("Landing")
  } */

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <NFInlineTextInput label='Table' vStyle={styles.secondaryTextView} iStyle={styles.input} value={tableStatus} onChangeText={setTableStatus} />
        <NFInlineTextInput label='Buser' vStyle={styles.secondaryTextView} iStyle={styles.input} value={tableBuserName} onChangeText={setTableBuserName} />
        <NFInlineTextInput label='Status' vStyle={styles.secondaryTextView} iStyle={styles.input} value={tableNumber} onChangeText={setTableNumber} />
        <View>
          <Text>time here</Text>
        </View>
        <View>
          <NFButton />
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
})

export default SendDataScreen