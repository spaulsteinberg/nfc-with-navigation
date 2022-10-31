import React from 'react'
import { View, StyleSheet, Dimensions, ScrollView, Button, ImageBackground } from 'react-native'
import { Card, TextInput, Title } from 'react-native-paper'
import { NFButton } from '../components/ui'
import Colors from '../constants/Colors'

const WIDTH = Dimensions.get('window').width

const LoginScreen = () => {
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: "#fff" }}>
            <ImageBackground source={require('../assets/images/stacked-waves-haikei.png')} resizeMode="cover" style={{flex: 1, justifyContent: 'center', zIndex: 400}}>
            <View style={styles.container}>
                <Card style={styles.card}>
                    <Card.Title title="Sign in" titleVariant='headlineSmall' titleStyle={{ textAlign: 'center' }} />
                    <Card.Content style={{ flex: 3 }}>
                        <View style={{flex: 1, marginTop: 8}}>
                            <TextInput value='' mode='outlined' label="Email" />
                        </View>
                        <View style={{flex: 1}}>
                            <TextInput value='' mode="outlined" label="Password" secureTextEntry autoCapitalize='none' autoCorrect={false} />
                        </View>
                    </Card.Content>
                    <Card.Actions style={styles.loginButton}>
                        <NFButton 
                            title="Login" 
                            onPress={() => console.log("press")} 
                            pressableStyle={{backgroundColor: Colors.main.text}}
                            textStyle={{color: Colors.main.background}}
                            outerStyle={{borderWidth: 1, borderColor: Colors.main.background}} />
                    </Card.Actions>
                </Card>
            </View>
            </ImageBackground>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 12,
        marginVertical: 36,
        alignItems: 'center',
    },
    card: {
        minWidth: WIDTH - 48,
        maxHeight: 275,
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

export default LoginScreen