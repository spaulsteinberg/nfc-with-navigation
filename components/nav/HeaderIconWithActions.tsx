import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { getAuth } from 'firebase/auth'
import { useAuthContext } from '../../state/context/AuthContext'

const HeaderIconWithActions = () => {
  const auth = getAuth()
  const userAuth = useAuthContext()

  const handleSignOutPress = async () => {
    console.log("press")
    try {
      await userAuth.signOut(auth)
    } catch (err) {
      console.log(err)

    }
  }

  return (
    <Ionicons name="person-circle-outline" size={30} color="white" onPress={handleSignOutPress}/>
  )
}

export default HeaderIconWithActions