import React from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { Text } from '../Themed';
import AnimateViewOpacity from '../AnimateViewOpacity';
import Time from '../../constants/Time';

type FormSuccessProps = {
    number: string;
}

const FormSuccess: React.FC<FormSuccessProps> = ({ number }) => {
    const w = Dimensions.get('window').width / 1.5
    return (
        <View style={styles.container}>
            <AnimateViewOpacity duration={Time.ONE_SECOND_IN_MS * 3}>
                <AntDesign name="checkcircle" size={w} color="green" style={styles.icon} />
                <Text style={styles.text}>Table {number} Status Updated!</Text>
            </AnimateViewOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 12
    },
    icon: {
        textAlign: 'center'
    },
    text: {
        fontSize: 24,
        textAlign: 'center',
        marginTop: 18
    }
})

export default FormSuccess