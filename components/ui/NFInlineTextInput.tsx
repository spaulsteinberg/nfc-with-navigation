import React from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import { Text } from '../Themed'

type NFInlineTextInputProps = {
    label?:string;
    vStyle?:object;
    iStyle?:object;
    [x:string]:any
}

const NFInlineTextInput:React.FC<NFInlineTextInputProps> = ({ label, vStyle, iStyle, ...rest }) => {
  return (
    <View style={[styles.container, vStyle]}>
        { label && <Text style={styles.label}>{label}</Text> }
        <TextInput style={[styles.input, iStyle]} {...rest} />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    label: {
      fontSize: 20,
      flex: 1 / 4
    },
    input: {
      flex: 3/4
    }
})

export default NFInlineTextInput