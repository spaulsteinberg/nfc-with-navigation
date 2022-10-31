import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { Card, HelperText, TextInput } from 'react-native-paper'
import Colors from '../../constants/Colors'
import InteractiveForm from '../../models/InteractiveForm'
import { NFButton } from '../ui'

const WIDTH = Dimensions.get('window').width

type SignInCardProps = {
    form:InteractiveForm;
    handleChangeText: (e:string, n:string) => void
}

const SignInCard:React.FC<SignInCardProps> = ({ form, handleChangeText }) => {
    return (
        <Card style={styles.card}>
            <Card.Title title="Sign in" titleVariant='headlineSmall' titleStyle={{ textAlign: 'center' }} />
            <Card.Content style={{ flex: 3 }}>
                <View style={{ flex: 1, marginTop: 8 }}>
                    <TextInput 
                        value={form.values.email} 
                        onChangeText={v => handleChangeText('email', v)} 
                        mode='outlined' 
                        label="Email" 
                        keyboardType='email-address' 
                        autoCapitalize='none' 
                        error={form.errors.email !== "" && form.touched.email}
                    />
                    <HelperText type="error" visible={form.errors.email !== "" && form.touched.email}>{form.errors.email}</HelperText>
                </View>
                <View style={{ flex: 1, marginTop: 4 }}>
                    <TextInput 
                        value={form.values.password} 
                        onChangeText={v => handleChangeText('password', v)} 
                        mode="outlined" 
                        label="Password" 
                        secureTextEntry 
                        autoCapitalize='none' 
                        autoCorrect={false} 
                        error={form.errors.password !== "" && form.touched.password}
                    />
                    <HelperText type="error" visible={form.errors.password !== "" && form.touched.password}>{form.errors.password}</HelperText>
                </View>
            </Card.Content>
            <Card.Actions style={styles.loginButton}>
                <NFButton
                    title="Login"
                    onPress={() => console.log("press")}
                    rippleColor="#ff0000"
                    pressableStyle={{ backgroundColor: Colors.main.text }}
                    textStyle={{ color: Colors.main.background }}
                    outerStyle={{ borderWidth: 1, borderColor: Colors.main.background }} />
            </Card.Actions>
        </Card>
    )
}

const styles = StyleSheet.create({
    card: {
        minWidth: WIDTH - 48,
        maxHeight: 290,
        maxWidth: 400,
    },
    title: {
        fontSize: 24
    },
    loginButton: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default SignInCard