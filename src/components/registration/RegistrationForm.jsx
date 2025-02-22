import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import PersonalInfo from './PersonalInfo'
import PetInfo from './PetInfo'
import { useState, useEffect } from 'react'
import SubscriptionPlan from './SubscriptionPlan'
import ReactConfetti from 'react-confetti'
import { SUBSCRIPTION_PLANS } from '@/constants/formData'
import emailjs from '@emailjs/browser'

const personalInfoValidation = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string()
    .required('Phone number is required')
    .matches(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit mobile number starting with 6-9'),
  address: Yup.object({
    street: Yup.string().required('Street address is required'),
    apartment: Yup.string(),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    pincode: Yup.string()
      .required('PIN code is required')
      .matches(/^[1-9][0-9]{5}$/, 'Invalid PIN code'),
    landmark: Yup.string()
  })
})

const petInfoValidation = Yup.object({
  petName: Yup.string().required('Pet name is required'),
  petType: Yup.string().required('Pet type is required'),
  breed: Yup.string().required('Breed is required'),
  petPhoto: Yup.mixed().required('Pet photo is required')
})

const subscriptionValidation = Yup.object({
  subscriptionPlan: Yup.string().required('Please select a subscription plan')
})

function RegistrationForm() {
  const [step, setStep] = useState(1)
  const [showErrors, setShowErrors] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [submittedData, setSubmittedData] = useState(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const [emailStatus, setEmailStatus] = useState('')

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [showConfetti])

  const initialValues = {
    name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      apartment: '',
      city: '',
      state: '',
      pincode: '',
      landmark: ''
    },
    petName: '',
    petType: '',
    breed: '',
    petPhoto: null,
    subscriptionPlan: ''
  }

  const sendEmail = async (data) => {
    setEmailStatus('sending')
    const selectedPlan = SUBSCRIPTION_PLANS.find(plan => plan.id === data.subscriptionPlan)
    
    const emailContent = `
      New Registration:

      Personal Details:
      Name: ${data.name}
      Email: ${data.email}
      Phone: ${data.phone}

      Pet Details:
      Name: ${data.petName}
      Type: ${data.petType}
      Breed: ${data.breed}

      Subscription Plan:
      Plan: ${selectedPlan?.name}
      Price: ₹${selectedPlan?.price}/month

      Delivery Address:
      ${data.address.street}
      ${data.address.apartment ? data.address.apartment + '\n' : ''}
      ${data.address.city}, ${data.address.state}
      PIN: ${data.address.pincode}
      ${data.address.landmark ? 'Landmark: ' + data.address.landmark : ''}
    `

    try {
      const result = await emailjs.send(
        'service_81bbn4q',
        'template_046ln7g',
        {
          to_email: 'petragroupofficial@gmail.com',
          message: emailContent,
          from_name: data.name,
          reply_to: data.email
        },
        'FGoHW08MtDrWbFWC4'
      )
      console.log('Email sent successfully!', result)
      setEmailStatus('success')
    } catch (error) {
      console.error('Email sending failed:', error)
      setEmailStatus('error')
    }
  }

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    setShowErrors(true)
    try {
      const schema = getValidationSchema(step)
      await schema.validate(values, { abortEarly: false })
      if (step < 3) {
        setStep(prev => prev + 1)
        setShowErrors(false)
      } else {
        setSubmittedData(values)
        setIsSuccess(true)
        setShowConfetti(true)
        await sendEmail(values)
      }
    } catch (err) {
      console.log('Validation errors:', err.inner)
      const errors = {}
      err.inner.forEach((e) => {
        errors[e.path] = e.message
      })
      setErrors(errors)
    }
    setSubmitting(false)
  }

  const getValidationSchema = (currentStep) => {
    switch (currentStep) {
      case 1:
        return personalInfoValidation
      case 2:
        return petInfoValidation
      case 3:
        return subscriptionValidation
      default:
        return Yup.object({})
    }
  }

  if (isSuccess) {
    const selectedPlan = SUBSCRIPTION_PLANS.find(plan => plan.id === submittedData.subscriptionPlan)
    
    return (
      <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg">
        {showConfetti && <ReactConfetti />}
        
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-purple-600 mb-2">
            Registration Successful!
          </h2>
          <p className="text-gray-600">
            Thank you for choosing our pet care service!
          </p>
          
          {emailStatus === 'sending' && (
            <p className="text-blue-600 mt-2">Sending confirmation email...</p>
          )}
          {emailStatus === 'success' && (
            <p className="text-green-600 mt-2">✓ Confirmation email sent!</p>
          )}
          {emailStatus === 'error' && (
            <p className="text-red-600 mt-2">
              ⚠️ Couldn't send confirmation email. We'll contact you shortly.
            </p>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">👤</span>
              <h3 className="text-lg font-semibold text-purple-600">Personal Details</h3>
            </div>
            <div className="ml-7 text-gray-700">
              <p>{submittedData.name}</p>
              <p>{submittedData.email}</p>
              <p>{submittedData.phone}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🐾</span>
              <h3 className="text-lg font-semibold text-purple-600">Pet Details</h3>
            </div>
            <div className="ml-7 text-gray-700">
              <p>{submittedData.petName}</p>
              <p className="capitalize">{submittedData.petType}</p>
              <p>{submittedData.breed}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">📦</span>
              <h3 className="text-lg font-semibold text-purple-600">Subscription Plan</h3>
            </div>
            <div className="ml-7">
              <p className="font-medium">{selectedPlan?.name}</p>
              <p className="text-gray-600 text-sm">{selectedPlan?.description}</p>
              <p className="text-purple-600 font-medium mt-1">₹{selectedPlan?.price}/month</p>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">📍</span>
              <h3 className="text-lg font-semibold text-purple-600">Delivery Address</h3>
            </div>
            <div className="ml-7 text-gray-700">
              <p>{submittedData.address.street}</p>
              {submittedData.address.apartment && (
                <p>{submittedData.address.apartment}</p>
              )}
              <p>{submittedData.address.city}, {submittedData.address.state}</p>
              <p>PIN: {submittedData.address.pincode}</p>
              {submittedData.address.landmark && (
                <p className="text-gray-500">Landmark: {submittedData.address.landmark}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ isSubmitting }) => (
        <Form className="w-full max-w-md mx-auto">
          {step === 1 && <PersonalInfo showErrors={showErrors} />}
          {step === 2 && <PetInfo showErrors={showErrors} />}
          {step === 3 && <SubscriptionPlan showErrors={showErrors} />}
          
          <div className="flex justify-between gap-4 mt-8 px-4">
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
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary ml-auto"
            >
              {step < 3 ? 'Next' : 'Submit'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default RegistrationForm