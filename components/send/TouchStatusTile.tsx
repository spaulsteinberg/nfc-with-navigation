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
    backgroundColor: color,
    marginHorizontal: 6
  }

  const pressable:any = {
    width: (width / 2) - 24,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  }
  
  return (
    <View style={[styles.container, containerStyle]}>
        <Pressable style={({ pressed }) => [ pressable, pressed && styles.pressed ]} android_ripple={{color: "#fff"}}>
            <Text style={styles.text}>{status}</Text>
        </Pressable>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      marginBottom: 12,
      borderRadius: 5,
      overflow: 'hidden',
      elevation: 2
    },
    text: {
      color: "#fff",
      fontSize: 30
    },
    pressed: {
      opacity: 0.7
    }
})

export default TouchStatusTile