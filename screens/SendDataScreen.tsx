import { useFormik } from 'formik'
import React, { useState } from 'react'
import { ScrollView } from 'react-native'
import { RootStackScreenProps } from '../types'
import * as Yup from 'yup'
import TableForm from '../components/send/TableForm'

const SendDataScreen = ({ route, navigation }: RootStackScreenProps<'SendData'>) => {

  if (!route.params || !route.params.data) {
    navigation.navigate("Landing")
  }

  const [requestLoading, setRequestLoading] = useState(false)

  const formik = useFormik({
    initialValues: {
      buser: '',
      status: ''
    },
    validationSchema: Yup.object().shape({
      buser: Yup.string().trim().required("Buser name is required.").max(50, "This field cannot be more than 50 characters."),
      status: Yup.string().trim().required("Status is a required field.")
    }),
    onSubmit: values => {
      console.log(values)
      setRequestLoading(true)
      setTimeout(() => setRequestLoading(false), 4000)
    }
  })

  const setStatusDropdown = (i:string):void => {
    formik.setFieldValue("status", i)
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ backgroundColor: "#fff" }}>
      <TableForm formik={formik} loading={requestLoading} number={route.params.data} onDropSelect={setStatusDropdown} />
    </ScrollView>
  )
}

export default SendDataScreen