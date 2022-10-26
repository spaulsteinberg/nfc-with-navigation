import React, { useState } from 'react'
import { ScrollView } from 'react-native'
import { RootStackScreenProps } from '../types'
import TableForm from '../components/send/TableForm'

const SendDataScreen = ({ route, navigation }: RootStackScreenProps<'SendData'>) => {

  if (!route.params || !route.params.data) {
    navigation.navigate("Landing")
  }

  const [requestLoading, setRequestLoading] = useState(false)

  const [form, setForm] = useState({
    values: {
      buser: '',
      status: ''
    },
    errors: {
      buser: '',
      status: ''
    },
    touched: {
      buser: false,
      status: false
    }
  })

  const handleChangeText = (key:string, newValue:string) => {
    let error = ''
    if (!newValue) {
      error = `${key} is a required field.`
    }
    else if (key === 'buser' && newValue.length > 30) {
      error = `${key} cannot be more than 30 characters long.`
    }
    setForm({
      ...form,
      values: {
        ...form.values,
        [key]: newValue.trim()
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

  const validateForm = ():boolean => {
    const nonBlankErrors = Object.keys(form.errors).filter((e:string) => form.errors[e as keyof typeof form.errors] !== '')
    if (nonBlankErrors.length > 0) {
      console.log("errors exist", nonBlankErrors)
      return false
    }

    const unTouchedFields = Object.keys(form.touched).filter((t:string) => !form.touched[t as keyof typeof form.touched])
    if (unTouchedFields.length > 0) {
      setForm({
        ...form,
        errors: {
          buser: form.values.buser === "" ? `buser is a required field.` : "",
          status: form.values.status === "" ? `status is a required field.` : ""
        },
        touched: {
          buser: true,
          status: true
        }
      })
      return false
    }

    return true
  }

  const handleSubmitPress = () => {
    console.log(form)
    if (!validateForm()) return
    setRequestLoading(true)
    setTimeout(() => setRequestLoading(false), 2000)
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ backgroundColor: "#fff" }}>
      <TableForm form={form} loading={requestLoading} number={route.params.data} handleChangeText={handleChangeText} handleSubmitPress={handleSubmitPress} />
    </ScrollView>
  )
}

export default SendDataScreen