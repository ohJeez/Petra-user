import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import PersonalInfo from './PersonalInfo'
import PetInfo from './PetInfo'
import { useState } from 'react'

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().required('Phone number is required'),
  address: Yup.string().required('Address is required'),
  petType: Yup.string().required('Pet type is required'),
  breed: Yup.string().required('Breed is required'),
  petPhoto: Yup.mixed().required('Pet photo is required')
})

function RegistrationForm() {
  const [step, setStep] = useState(1)

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
      // Add API call here when ready
      setSubmitting(false)
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitting(false)
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-6">
          {step === 1 && <PersonalInfo />}
          {step === 2 && <PetInfo />}
          
          <div className="flex justify-between">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="bg-gray-200 px-4 py-2 rounded-md"
              >
                Previous
              </button>
            )}
            
            {step < 2 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Submit
              </button>
            )}
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default RegistrationForm 