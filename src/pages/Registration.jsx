import RegistrationForm from '../components/registration/RegistrationForm'

function Registration() {
  return (
    <div className="max-w-2xl mx-auto bg-gray-900 p-8 rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-100">Pet Subscription Registration</h2>
      <RegistrationForm />
    </div>
  )
}

export default Registration 