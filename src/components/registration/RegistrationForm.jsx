import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import PersonalInfo from './PersonalInfo'
import PetInfo from './PetInfo'
import { useState } from 'react'

const personalInfoValidation = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().required('Phone number is required'),
  address: Yup.string().required('Address is required'),
})

const petInfoValidation = Yup.object({
  petType: Yup.string().required('Pet type is required'),
  breed: Yup.string().required('Breed is required'),
  petPhoto: Yup.mixed().required('Pet photo is required')
})

function RegistrationForm() {
  const [step, setStep] = useState(1)
  const [showErrors, setShowErrors] = useState(false)

  const initialValues = {
    name: '',
    email: '',
    phone: '',
    address: '',
    petType: '',
    breed: '',
    petPhoto: null
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      console.log('Form values:', values)
      setSubmitting(false)
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitting(false)
    }
  }

  const handleNextStep = async (values, actions) => {
    setShowErrors(true)
    try {
      await personalInfoValidation.validate(values, { abortEarly: false })
      setStep(2)
      setShowErrors(false)
    } catch (err) {
      const errors = {}
      err.inner.forEach((e) => {
        errors[e.path] = e.message
      })
      actions.setErrors(errors)
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={step === 1 ? personalInfoValidation : petInfoValidation}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, values, setErrors }) => (
        <Form className="space-y-6">
          {step === 1 && <PersonalInfo showErrors={showErrors} />}
          {step === 2 && <PetInfo />}
          
          <div className="flex justify-between gap-4 mt-8">
            {step > 1 && (
              <button
                type="button"
                onClick={() => {
                  setStep(step - 1)
                  setShowErrors(false)
                }}
                className="btn-secondary"
              >
                Previous
              </button>
            )}
            
            {step < 2 ? (
              <button
                type="button"
                onClick={() => handleNextStep(values, { setErrors })}
                className="btn-primary ml-auto"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary ml-auto"
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            )}
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default RegistrationForm 