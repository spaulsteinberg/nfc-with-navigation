import React from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import Colors from '../../constants/Colors'
//import { NFInlineTextInput } from '../ui'
import { NFButton } from '../ui'
import { TextInput, HelperText } from 'react-native-paper';
import { Text } from '../Themed'

type TableFormProps = {
    formik: any;
    number: string;
    loading: boolean;
}

const TableForm: React.FC<TableFormProps> = ({ formik, number, loading }) => {
    const buserInputError = formik.errors.buser && formik.touched.buser
    const statusInputError = formik.errors.status && formik.touched.status
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.tableText}>Table</Text>
                <Text style={styles.titleText}>{number}</Text>
            </View>
            <View style={styles.secondaryTextView}>
                <TextInput
                    label='Buser'
                    value={formik.values.buser}
                    onChangeText={formik.handleChange('buser')}
                    onBlur={formik.handleBlur('buser')}
                    error={buserInputError}
                    mode='outlined'

                />
                <HelperText type="error" visible={buserInputError}>{formik.errors.buser}</HelperText>
            </View>
            <View style={styles.secondaryTextView}>
                <TextInput
                    label='Status'
                    value={formik.values.status}
                    onChangeText={formik.handleChange('status')}
                    onBlur={formik.handleBlur('status')}
                    error={statusInputError}
                    mode="outlined"
                    style={styles.secondaryTextView}
                />
                <HelperText type="error" visible={statusInputError}>{formik.errors.status}</HelperText>
            </View>
            <View>
                <NFButton outerStyle={styles.buttonOuterView} title="Confirm" onPress={formik.handleSubmit}>
                    {loading ? <ActivityIndicator size="small" color={Colors.main.text} /> : null}
                </NFButton>
            </View>
        </View>
    )
}

/*
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
            error={formik.errors.status && formik.touched.status}
        />
*/

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 12,
        marginVertical: 36
    },
    input: {
        padding: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "gray"
    },
    secondaryTextView: {
        marginVertical: 3,
        backgroundColor: "#fff"
    },
    buttonOuterView: {
        marginVertical: 24
    },
    titleText: {
        fontSize: 50,
        textAlign: 'center'
    },
    tableText: {
        fontSize: 24,
        textAlign: 'center'
    },
    titleContainer: {
        marginBottom: 12
    }
})

export default TableForm