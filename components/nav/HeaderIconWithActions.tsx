import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { getAuth } from 'firebase/auth'
import { useAuthContext } from '../../state/context/AuthContext'
import { Menu } from 'react-native-paper'
import { ActivityIndicator, Alert } from 'react-native'

const HeaderIconWithActions = () => {
  const auth = getAuth()
  const userAuth = useAuthContext()

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSignOutPress = async () => {
    console.log("press")
    setLoading(true)
    try {
      await userAuth.signOut(auth)
    } catch (err) {
      console.log(err)
      Alert.alert("Sign out failed.", "Unable to sign you out at this time. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Menu
                    style={{ paddingTop: 35 }}
                    visible={open}
                    onDismiss={() => setOpen(false)}
                    anchor={<Ionicons name="person-circle-outline" size={30} color="white" onPress={() => setOpen(o => !o)}/>}
                >
                    <Menu.Item disabled={loading} title={loading ? <ActivityIndicator size="small" color="red" /> : "Sign Out"} onPress={handleSignOutPress} dense/>
                </Menu>
  )
}

export default HeaderIconWithActions