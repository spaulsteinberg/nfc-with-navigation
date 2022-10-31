
interface FormValues {
    [x:string]: any
}

interface FormTouched {
    [x:string]: boolean
}

interface FormErrors {
    [x:string]: string
}

export default interface InteractiveForm {
    values:FormValues
    touched:FormTouched
    errors:FormErrors
}