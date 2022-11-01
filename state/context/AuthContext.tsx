import React, { useState, createContext, useContext, useEffect } from 'react'
import { auth } from '../../firebase/config'
import { Auth, signInWithEmailAndPassword, User, UserCredential } from 'firebase/auth'
import { ActivityIndicator } from 'react-native'

export interface IAuthContext {
    user: User | null;
    signIn: (a:Auth, e:string, p:string) => Promise<UserCredential>
}

type AuthProps = { children?: React.ReactNode}

export const AuthContext = createContext<any>(null)

export const useAuthContext = () => useContext(AuthContext)

const AuthContextProvider = ({ children }:AuthProps) => {
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setUser(user)
            console.log(user)
            setLoading(false)
        })
        return unsubscribe;
    }, [])

    const signInUserWithEmailAndPassword = (auth:Auth, email:string, password:string) => signInWithEmailAndPassword(auth, email, password)

    const value = {
        user,
        signIn: signInUserWithEmailAndPassword
    }

    return (
        <AuthContext.Provider value={value}>
            { loading ? <ActivityIndicator style={{ marginTop: 100 }} /> : children }
        </AuthContext.Provider>
    )
}

export default AuthContextProvider