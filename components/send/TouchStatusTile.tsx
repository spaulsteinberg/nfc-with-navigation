import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native'
import { TableStatus } from '../../constants/TableStatus'

type TouchStatusTileProps = {
  status:TableStatus;
  color:string;
  width:number;
  handleSubmit: (a?: boolean, n?: string) => Promise<void>;
  loading: boolean;
}

const TouchStatusTile = ({ status, color, width, handleSubmit, loading }: TouchStatusTileProps) => {

  const [isTilePressed, setIsTilePressed] = useState(false)

  useEffect(() => {
    if (!loading) setIsTilePressed(false)
  }, [loading])

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

  const handlePress = async () => {
    setIsTilePressed(true)
    await handleSubmit(true, status.toString())
  }

  return (
    <View style={[styles.container, containerStyle]}>
        <Pressable disabled={loading} onPress={handlePress} style={({ pressed }) => [ pressable, pressed && styles.pressed ]} android_ripple={{color: "#fff"}}>
            {
              loading && isTilePressed ? <ActivityIndicator size="large" color="#fff" /> : <Text style={styles.text}>{status}</Text>
            }
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