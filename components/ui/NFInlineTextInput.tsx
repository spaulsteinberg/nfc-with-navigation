import React from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import { Text } from '../Themed'

type NFInlineTextInputProps = {
    label?:string;
    vStyle?:object;
    iStyle?:object;
    error?:any;
    [x:string]:any
}

const NFInlineTextInput:React.FC<NFInlineTextInputProps> = ({ label, vStyle, iStyle, error, ...rest }) => {
  return (
    <View style={[styles.container, vStyle]}>
        { label && <Text style={styles.label}>{label}</Text> }
        <TextInput style={[styles.input, iStyle, error && styles.error]} {...rest} />
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
      flex: 3 / 4,
      fontSize: 16
    },
    error: {
      borderWidth: 1,
      borderColor: 'red'
    }
})

export default NFInlineTextInput