import React, { useState } from 'react'
import { View, StyleSheet, Dimensions, ScrollView, Button, ImageBackground } from 'react-native'
import { Card, TextInput, Title } from 'react-native-paper'
import SignInCard from '../components/auth/SignInCard'
import { NFButton } from '../components/ui'
import Colors from '../constants/Colors'
import InteractiveForm from '../models/InteractiveForm'

const WIDTH = Dimensions.get('window').width

const SignInScreen = () => {
    const [form, setForm] = useState<InteractiveForm>({
        values: {
            email: '',
            password: ''
        },
        touched: {
            email: false,
            password: false
        },
        errors: {
            email: '',
            password: ''
        }
    })
    const handleChangeText = (key: string, newValue: string):void => {
        let error = ''
        if (!newValue) {
          error = `${key} is a required field.`
        }
        setForm({
          ...form,
          values: {
            ...form.values,
            [key]: newValue
          },
          touched: {
            ...form.touched,
            [key]: true
          },
          errors: {
            ...form.errors,
            [key]: error
          }
        })
      }
    return (
        <ScrollView contentContainerStyle={styles.scroll}>
            <ImageBackground source={require('../assets/images/stacked-waves-haikei.png')} resizeMode="cover" style={styles.backgroundImage}>
                <View style={styles.container}>
                    <SignInCard form={form} handleChangeText={handleChangeText} />
                </View>
            </ImageBackground>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scroll: {
        flexGrow: 1,
        backgroundColor: "#fff"
    },
    container: {
        flex: 1,
        marginHorizontal: 12,
        marginVertical: 36,
        alignItems: 'center',
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        zIndex: 400
    }
})

export default SignInScreen