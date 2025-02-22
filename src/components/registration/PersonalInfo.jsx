import { Field, ErrorMessage } from 'formik'

function PersonalInfo() {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-medium text-gray-100">Personal Information</h3>
      
      <div>
        <label htmlFor="name" className="input-label">Full Name</label>
        <Field type="text" name="name" id="name" className="input-field" />
        <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
      </div>

      <div>
        <label htmlFor="email" className="input-label">Email</label>
        <Field type="email" name="email" id="email" className="input-field" />
        <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
      </div>

      <div>
        <label htmlFor="phone" className="input-label">Phone Number</label>
        <Field type="tel" name="phone" id="phone" className="input-field" />
        <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
      </div>

      <div>
        <label htmlFor="address" className="input-label">Address</label>
        <Field as="textarea" name="address" id="address" rows={3} className="input-field" />
        <ErrorMessage name="address" component="div" className="text-red-500 text-sm mt-1" />
      </div>
    </div>
  )
}

export default PersonalInfo 