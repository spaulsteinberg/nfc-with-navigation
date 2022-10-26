import React, { useState } from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import Colors from '../../constants/Colors'
import { NFButton, NFDropdown } from '../ui'
import { TextInput, HelperText, Menu } from 'react-native-paper';
import { Text } from '../Themed'
import { MaterialCommunityIcons } from '@expo/vector-icons';

type TableFormProps = {
    form: any;
    number: string;
    loading: boolean;
    handleChangeText: (k: string, v:string) => void;
    handleSubmitPress: () => void
}

const TableForm: React.FC<TableFormProps> = ({ form, number, loading, handleChangeText, handleSubmitPress }) => {
    const [menuOpen, setMenuOpen] = useState(false)
    const handleMenuSelect = (i:string) => {
        handleChangeText("status", i)
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
                    value={form.values.buser}
                    onChangeText={v => handleChangeText("buser", v)}
                    error={form.errors.buser && form.touched.buser}
                    mode='outlined'
                    editable={!loading}
                    right={<TextInput.Icon color={(focused:boolean) => !form.touched.buser ? "gray" : form.errors.buser && form.touched.buser ? "#d32f2f" : "green"} forceTextInputFocus={false} icon={ form.errors.buser && form.touched.buser ? "close-circle" : "check-circle"} />}
                />
                <HelperText type="error" visible={form.errors.buser && form.touched.buser}>{form.errors.buser}</HelperText>
            </View>
            <View style={styles.secondaryTextView}>
                <Menu
                    style={{ paddingTop: 40 }}
                    visible={menuOpen}
                    onDismiss={() => setMenuOpen(false)}
                    anchor={<NFDropdown error={form.errors.status && form.touched.status} mode="outlined" style={{ maxWidth: 200 }} onPress={() => setMenuOpen(true)} label="Status" value={form.values.status} icon={menuOpen ? "chevron-up" : "chevron-down"} />}
                >
                    <Menu.Item 
                        title="Ready" 
                        onPress={() => handleMenuSelect("Ready")} 
                        trailingIcon={() => <MaterialCommunityIcons name='check-circle' size={24} color="green" />}
                    />
                    <Menu.Item title="Cleaning" onPress={() => handleMenuSelect("Cleaning")} trailingIcon={() => <MaterialCommunityIcons name='check-circle' size={24} color="green" />} />
                    <Menu.Item title="Dirty" onPress={() => handleMenuSelect("Dirty")} trailingIcon={() => <MaterialCommunityIcons name='check-circle' size={24} color="green" />} />
                </Menu>
                <HelperText type="error" visible={form.errors.status && form.touched.status}>{form.errors.status}</HelperText>
            </View>
            <View>
                <NFButton outerStyle={styles.buttonOuterView} title="Confirm" onPress={handleSubmitPress}>
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