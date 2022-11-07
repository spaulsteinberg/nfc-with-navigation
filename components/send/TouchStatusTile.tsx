import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { TableStatus } from '../../constants/TableStatus'

type TouchStatusTileProps = {
  status:TableStatus;
  color:string;
  width:number;
}

const TouchStatusTile = ({ status, color, width }: TouchStatusTileProps) => {

  const containerStyle = {
    width: (width / 2) - 24,
    height: 200,
    backgroundColor: color,
    marginHorizontal: 6
  }
  return (
    <View style={[styles.container, containerStyle]}>
        <Pressable>
            <Text style={styles.text}>{status}</Text>
        </Pressable>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      width: '50%',
      marginBottom: 12,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center'
    },
    text: {
      color: "#fff",
      fontSize: 30
    }
})

export default TouchStatusTile