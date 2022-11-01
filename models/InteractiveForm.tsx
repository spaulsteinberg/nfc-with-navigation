
interface FormValues {
    [x: string]: any
}

interface FormTouched {
    [x: string]: boolean
}

interface FormErrors {
    [x: string]: string
}

enum ValidationResponse {
    Errors = 'errors',
    Touched = 'touched',
    Passed = 'passed'
}

const validateInteractiveForm = (form: InteractiveForm): ValidationResponse => {
    const nonBlankErrors = Object.keys(form.errors).filter((e: string) => form.errors[e as keyof typeof form.errors] !== '')
    if (nonBlankErrors.length > 0) {
        console.log("errors exist", nonBlankErrors)
        return ValidationResponse.Errors
    }
    const unTouchedFields = Object.keys(form.touched).filter((t: string) => !form.touched[t as keyof typeof form.touched])
    if (unTouchedFields.length > 0) {
        return ValidationResponse.Touched
    }

    return ValidationResponse.Passed
}

export { ValidationResponse, validateInteractiveForm }

export default interface InteractiveForm {
    values: FormValues
    touched: FormTouched
    errors: FormErrors
}