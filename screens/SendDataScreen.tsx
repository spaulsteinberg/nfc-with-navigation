import React, { useState } from 'react'
import { ScrollView, Vibration } from 'react-native'
import { RootStackScreenProps } from '../types'
import TableForm from '../components/send/TableForm'
import Time, { convertTimestampDateToReadable } from '../constants/Time';
import FormSuccess from '../components/send/FormSuccess';
import { postLog } from '../firebase/api';
import LogPayload from '../models/LogPayload';
import { TableStatus } from '../constants/TableStatus';
import { useAppDispatch } from '../state/redux/hooks';
import { addLog } from '../state/redux/slices/logSlice';
import { Timestamp } from 'firebase/firestore';
import InteractiveForm, { validateInteractiveForm, ValidationResponse } from '../models/InteractiveForm';

// wait, vibrate, wait, ...
const ERROR_PATTERN = [
  0 * Time.ONE_SECOND_IN_MS,
  .5 * Time.ONE_SECOND_IN_MS,
  2 * Time.ONE_SECOND_IN_MS,
  .5 * Time.ONE_SECOND_IN_MS
];

const SUCCESS_PATTERN = [
  0 * Time.ONE_SECOND_IN_MS,
  1 * Time.ONE_SECOND_IN_MS,
  .5 * Time.ONE_SECOND_IN_MS,
  1 * Time.ONE_SECOND_IN_MS
];

const SendDataScreen = ({ route, navigation }: RootStackScreenProps<'SendData'>) => {

  if (!route.params || !route.params.data) {
    navigation.navigate("Landing")
  }

  const [requestLoading, setRequestLoading] = useState(false)
  const [requestError, setRequestError] = useState(false)
  const [requestSuccess, setRequestSuccess] = useState(false)
  const dispatch = useAppDispatch()

  const [form, setForm] = useState<InteractiveForm>({
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

  const handleChangeText = (key: string, newValue: string) => {
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
        [key]: newValue
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

  const validateForm = (): boolean => {
    const v: ValidationResponse = validateInteractiveForm(form)
    if (v === ValidationResponse.Errors) return false;
    else if (v === ValidationResponse.Touched) {
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

  const handleSubmitPress = async () => {
    try {
      if (!validateForm()) return
      setRequestLoading(true)
      const payload = new LogPayload(route.params.data, form.values.buser.trim(), TableStatus[form.values.status as keyof typeof TableStatus])
      const res = await postLog(payload)
      dispatch(addLog({ ...payload, date: Date.parse(Timestamp.now().toDate().toString()), id: res.id }))
      setRequestError(false)
      setRequestSuccess(true)
      Vibration.vibrate(SUCCESS_PATTERN)
      setTimeout(() => {
        navigation.navigate('Landing')
      }, Time.ONE_SECOND_IN_MS * 3.5)
    } catch (err) {
      console.log(err)
      setRequestError(true)
      Vibration.vibrate(ERROR_PATTERN)
    } finally {
      setRequestLoading(false)
    }
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ backgroundColor: "#fff" }}>
      {
        !requestSuccess ?
          <TableForm form={form} loading={requestLoading} error={requestError} number={route.params.data} handleChangeText={handleChangeText} handleSubmitPress={handleSubmitPress} />
          : <FormSuccess number={route.params.data} />
      }
    </ScrollView>
  )
}

export default SendDataScreen