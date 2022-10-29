import React from 'react'
import { View, StyleSheet } from 'react-native'
import { TextInput } from 'react-native-paper'
import { Text } from '../Themed';

type SearchLogDataProps = {
    value:string;
    setFilterValue: React.Dispatch<React.SetStateAction<string>>
    isEmpty?:boolean
}

const SearchLogData:React.FC<SearchLogDataProps> = ({ value, setFilterValue, isEmpty }) => {
  return (
    <View style={styles.container}>
        <TextInput 
            value={value}
            onChangeText={setFilterValue}
            mode='outlined' 
            label="Search By Table" 
            outlineColor='black' 
            activeOutlineColor='#007bff'
            keyboardType='number-pad'
            left={<TextInput.Icon icon="magnify" color={(focused:boolean) => focused ? "#007bff" : "black"} />}
        />
        {
            isEmpty && <Text style={styles.noLogText}>No logs to display!</Text>
        }
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 8,
        marginVertical: 12
    },
    noLogText: {
        textAlign: 'center',
        marginVertical: 24
    }
})

export default SearchLogData