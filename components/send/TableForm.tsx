import React, { useState } from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import Colors from '../../constants/Colors'
import { NFButton, NFDropdown } from '../ui'
import { TextInput, HelperText, Menu } from 'react-native-paper';
import { Text } from '../Themed'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TableStatus } from '../../constants/TableStatus';
import InteractiveForm from '../../models/InteractiveForm';

type TableFormProps = {
    form: InteractiveForm;
    number: string;
    loading: boolean;
    error:boolean;
    handleChangeText: (k: string, v:string) => void;
    handleSubmitPress: () => void
}

const MENU_ITEMS = [ TableStatus.Ready, TableStatus.Seated, TableStatus.Dirty, TableStatus.Cleaning ]

const TableForm: React.FC<TableFormProps> = ({ form, number, loading, error, handleChangeText, handleSubmitPress }) => {
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
                    error={form.errors.buser !== "" && form.touched.buser}
                    mode='outlined'
                    editable={!loading}
                    onSubmitEditing={(e) => !form.values.status && setMenuOpen(true)}
                    right={<TextInput.Icon color={(focused:boolean) => !form.touched.buser ? "gray" : form.errors.buser && form.touched.buser ? "#d32f2f" : "green"} forceTextInputFocus={false} icon={ form.errors.buser && form.touched.buser ? "close-circle" : "check-circle"} />}
                />
                <HelperText type="error" visible={form.errors.buser !== "" && form.touched.buser}>{form.errors.buser}</HelperText>
            </View>
            <View style={styles.secondaryTextView}>
                <Menu
                    style={{ paddingTop: 40 }}
                    visible={menuOpen && !loading}
                    onDismiss={() => setMenuOpen(false)}
                    anchor={<NFDropdown editable={!loading} error={form.errors.status && form.touched.status} mode="outlined" style={{ maxWidth: 200 }} onPress={() => setMenuOpen(true)} label="Status" value={form.values.status} icon={menuOpen ? "chevron-up" : "chevron-down"} />}
                >
                    {
                        MENU_ITEMS.map(stat => <Menu.Item key={stat} title={stat} onPress={() => handleMenuSelect(stat)} trailingIcon={() => <MaterialCommunityIcons name='check-circle' size={24} color="green" />} />)
                    }
                </Menu>
                <HelperText type="error" visible={form.errors.status !== "" && form.touched.status}>{form.errors.status}</HelperText>
            </View>
            <View>
                <NFButton outerStyle={styles.buttonOuterView} title="Confirm" onPress={handleSubmitPress}>
                    {loading ? <ActivityIndicator size="small" color={Colors.main.text} /> : null}
                </NFButton>
            </View>
            {
                error && <Text style={styles.errorText}>An error occurred sending to management.</Text>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 12,
        marginVertical: 36
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
    },
    errorText: {
        textAlign: 'center',
        color: Colors.main.background
    }
})

export default TableForm