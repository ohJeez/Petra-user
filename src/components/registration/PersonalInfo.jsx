import { Field, ErrorMessage } from 'formik'
import { UserIcon, EnvelopeIcon, PhoneIcon, HomeIcon, MapPinIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline'

function PersonalInfo({ showErrors }) {
  return (
    <div className="space-y-8 w-full max-w-md mx-auto px-4">
      <h3 className="section-title text-center">Personal Information</h3>
      
      <div className="space-y-4">
        <div className="input-group">
          <div className="input-wrapper">
            <UserIcon className="input-icon w-5 h-5" />
            <Field 
              type="text" 
              name="name" 
              placeholder="Full Name"
              className="input-field pl-12 w-full" 
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
              className="input-field pl-12 w-full" 
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
              placeholder="Phone Number (must start with 6-9)"
              className="input-field pl-12 w-full"
              maxLength={10}
              onKeyPress={(e) => {
                // Only allow numbers 0-9
                if (!/[0-9]/.test(e.key)) {
                  e.preventDefault()
                }
                // If it's the first digit, only allow 6-9
                if (e.target.value.length === 0 && !/[6-9]/.test(e.key)) {
                  e.preventDefault()
                }
              }}
            />
          </div>
          {showErrors && <ErrorMessage name="phone">
            {msg => <div className="form-error text-sm">
              {msg === 'Phone number is required' ? msg : 'Please enter a valid 10-digit mobile number starting with 6-9'}
            </div>}
          </ErrorMessage>}
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-lg font-medium text-brand-blue">Delivery Address</h4>
        
        <div className="input-group">
          <div className="input-wrapper">
            <HomeIcon className="input-icon w-5 h-5" />
            <Field 
              type="text"
              name="address.street" 
              placeholder="Street Address"
              className="input-field pl-12 w-full" 
            />
          </div>
          {showErrors && <ErrorMessage name="address.street" component="div" className="form-error" />}
        </div>

        <div className="input-group">
          <div className="input-wrapper">
            <BuildingOfficeIcon className="input-icon w-5 h-5" />
            <Field 
              type="text"
              name="address.apartment" 
              placeholder="Apartment, Suite, etc. (optional)"
              className="input-field pl-12 w-full" 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="input-group">
            <div className="input-wrapper">
              <MapPinIcon className="input-icon w-5 h-5" />
              <Field 
                type="text"
                name="address.city" 
                placeholder="City"
                className="input-field pl-12 w-full" 
              />
            </div>
            {showErrors && <ErrorMessage name="address.city" component="div" className="form-error" />}
          </div>

          <div className="input-group">
            <div className="input-wrapper">
              <MapPinIcon className="input-icon w-5 h-5" />
              <Field 
                type="text"
                name="address.state" 
                placeholder="State"
                className="input-field pl-12 w-full" 
              />
            </div>
            {showErrors && <ErrorMessage name="address.state" component="div" className="form-error" />}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="input-group">
            <div className="input-wrapper">
              <MapPinIcon className="input-icon w-5 h-5" />
              <Field 
                type="text"
                name="address.pincode" 
                placeholder="PIN Code"
                className="input-field pl-12 w-full"
                maxLength={6}
                onKeyPress={(e) => {
                  if (!/[0-9]/.test(e.key)) {
                    e.preventDefault()
                  }
                }}
              />
            </div>
            {showErrors && <ErrorMessage name="address.pincode" component="div" className="form-error" />}
          </div>

          <div className="input-group">
            <div className="input-wrapper">
              <MapPinIcon className="input-icon w-5 h-5" />
              <Field 
                type="text"
                name="address.landmark" 
                placeholder="Landmark (optional)"
                className="input-field pl-12 w-full" 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PersonalInfo 