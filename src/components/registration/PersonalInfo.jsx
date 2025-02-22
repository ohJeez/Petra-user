import { Field, ErrorMessage } from 'formik'
import { UserIcon, EnvelopeIcon, PhoneIcon, HomeIcon } from '@heroicons/react/24/outline'

function PersonalInfo({ showErrors }) {
  return (
    <div className="space-y-6">
      <h3 className="section-title">Personal Information</h3>
      
      <div className="input-group">
        <div className="input-wrapper">
          <UserIcon className="input-icon w-5 h-5" />
          <Field 
            type="text" 
            name="name" 
            placeholder="Full Name"
            className="input-field pl-12" 
          />
        </div>
        {showErrors && <ErrorMessage name="name" component="div" className="form-error" />}
      </div>

      <div className="input-group">
        <div className="input-wrapper">
          <EnvelopeIcon className="input-icon w-5 h-5" />
          <Field 
            type="email" 
            name="email" 
            placeholder="Email"
            className="input-field pl-12" 
          />
        </div>
        {showErrors && <ErrorMessage name="email" component="div" className="form-error" />}
      </div>

      <div className="input-group">
        <div className="input-wrapper">
          <PhoneIcon className="input-icon w-5 h-5" />
          <Field 
            type="tel" 
            name="phone" 
            placeholder="Phone Number"
            className="input-field pl-12" 
          />
        </div>
        {showErrors && <ErrorMessage name="phone" component="div" className="form-error" />}
      </div>

      <div className="input-group">
        <div className="input-wrapper">
          <HomeIcon className="textarea-icon w-5 h-5" />
          <Field 
            as="textarea" 
            name="address" 
            placeholder="Address"
            className="input-field pl-12 !rounded-3xl" 
            rows={3}
          />
        </div>
        {showErrors && <ErrorMessage name="address" component="div" className="form-error" />}
      </div>
    </div>
  )
}

export default PersonalInfo 