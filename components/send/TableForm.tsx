import React, { useState } from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import Colors from '../../constants/Colors'
import { NFButton, NFDropdown } from '../ui'
import { TextInput, HelperText, Menu } from 'react-native-paper';
import { Text } from '../Themed'
import { MaterialCommunityIcons } from '@expo/vector-icons';

type TableFormProps = {
    formik: any;
    number: string;
    loading: boolean;
    onDropSelect: (i: string) => void
}

const TableForm: React.FC<TableFormProps> = ({ formik, number, loading, onDropSelect }) => {
    const [menuOpen, setMenuOpen] = useState(false)
    const handleMenuSelect = (i:string) => {
        onDropSelect(i)
        setMenuOpen(false)
    }
    
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
                    error={formik.errors.buser && formik.touched.buser}
                    mode='outlined'
                    right={<TextInput.Icon color={(focused:boolean) => !formik.touched.buser ? "gray" : formik.errors.buser && formik.touched.buser ? "#d32f2f" : "green"} forceTextInputFocus={false} icon={ formik.errors.buser && formik.touched.buser ? "close-circle" : "check-circle"} />}
                />
                <HelperText type="error" visible={formik.errors.buser && formik.touched.buser}>{formik.errors.buser}</HelperText>
            </View>
            <View style={styles.secondaryTextView}>
                <Menu
                    style={{ paddingTop: 40 }}
                    visible={menuOpen}
                    onDismiss={() => setMenuOpen(false)}
                    anchor={<NFDropdown error={formik.errors.status && formik.touched.status} mode="outlined" style={{ maxWidth: 200 }} onPress={() => setMenuOpen(true)} label="Status" value={formik.values.status} icon={menuOpen ? "chevron-up" : "chevron-down"} />}
                >
                    <Menu.Item 
                        title="Ready" 
                        onPress={() => handleMenuSelect("Ready")} 
                        trailingIcon={() => <MaterialCommunityIcons name='check-circle' size={24} color="green" />}
                    />
                    <Menu.Item title="Cleaning" onPress={() => handleMenuSelect("Cleaning")} trailingIcon={() => <MaterialCommunityIcons name='check-circle' size={24} color="green" />} />
                    <Menu.Item title="Dirty" onPress={() => handleMenuSelect("Dirty")} trailingIcon={() => <MaterialCommunityIcons name='check-circle' size={24} color="green" />} />
                </Menu>
                <HelperText type="error" visible={formik.errors.status && formik.touched.status}>{formik.errors.status}</HelperText>
            </View>
            <View>
                <NFButton outerStyle={styles.buttonOuterView} title="Confirm" onPress={() => { console.log("p"); formik.handleSubmit()}}>
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
    matInput: {
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