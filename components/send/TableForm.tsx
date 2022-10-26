import React from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import Colors from '../../constants/Colors'
import { NFInlineTextInput } from '../ui'
import NFButton from '../ui/NFButton'

type TableFormProps = {
    formik:any;
    loading:boolean;
}

const TableForm:React.FC<TableFormProps> = ({ formik, loading }) => {
    console.log(formik.errors)
  return (
    <View style={styles.container}>
        <NFInlineTextInput 
            label='Table' 
            value={formik.values.number}
            onChangeText={formik.handleChange('number')}
            onBlur={formik.handleBlur('number')}
            vStyle={styles.secondaryTextView} 
            iStyle={styles.input}
            editable={false}
            error={formik.errors.number} 
        />
        <NFInlineTextInput 
            label='Buser' 
            value={formik.values.buser} 
            onChangeText={formik.handleChange('buser')}
            onBlur={formik.handleBlur('buser')} 
            vStyle={styles.secondaryTextView} 
            iStyle={styles.input}
            error={formik.errors.buser}
        />
        <NFInlineTextInput 
            label='Status' 
            value={formik.values.status} 
            onChangeText={formik.handleChange('status')}
            onBlur={formik.handleBlur('status')} 
            vStyle={styles.secondaryTextView} 
            iStyle={styles.input}
            error={formik.errors.status}
        />
        <View>
          <NFButton outerStyle={styles.buttonOuterView} title="Confirm" onPress={formik.handleSubmit}>
            {loading ? <ActivityIndicator size="small" color={Colors.main.text} /> : null}
          </NFButton>
        </View>
      </View>
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

export default TableForm