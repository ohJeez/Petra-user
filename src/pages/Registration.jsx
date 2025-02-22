import RegistrationForm from '../components/registration/RegistrationForm'
import logo from '@/assets/petralogo.png'

function Registration() {
  return (
    <div className="form-container">
      <img 
        src={logo} 
        alt="Pet.Ra Logo" 
        className="w-40 object-contain mx-auto mb-8" 
      />
      <RegistrationForm />
    </div>
  )
}

export default Registration 