import React, { useState } from 'react'
import { View, StyleSheet, Dimensions, ScrollView, ImageBackground } from 'react-native'
import SignInCard from '../components/auth/SignInCard'
import InteractiveForm, { validateInteractiveForm, ValidationResponse } from '../models/InteractiveForm'

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

    const handleChangeText = (key: string, newValue: string): void => {
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

    const handleSubmitPress = () => {
        const v: ValidationResponse = validateInteractiveForm(form)
        console.log(form)
        if (v === ValidationResponse.Errors) return;
        else if (v === ValidationResponse.Touched) {
            setForm({
                ...form,
                errors: {
                    email: form.values.email === "" ? "email is a required field." : "",
                    password: form.values.password === "" ? "password is a required field." : ""
                },
                touched: {
                    email: true,
                    password: true
                }
            })
        }

        console.log(v)
    }

    const handleEmailBlur = () => {
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form.values.email) !== true && setForm({
            ...form,
            errors: {
                ...form.errors,
                email: 'invalid email address'
            }
        })
    }

    return (
        <ScrollView contentContainerStyle={styles.scroll}>
            <ImageBackground source={require('../assets/images/stacked-waves-haikei.png')} resizeMode="cover" style={styles.backgroundImage}>
                <View style={styles.container}>
                    <SignInCard form={form} handleChangeText={handleChangeText} handleSubmitPress={handleSubmitPress} handleEmailBlur={handleEmailBlur} />
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