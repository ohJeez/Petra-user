import { Field, ErrorMessage } from 'formik'
import { useState } from 'react'

const DOG_BREEDS = ['Labrador', 'German Shepherd', 'Golden Retriever', 'Bulldog', 'Poodle']
const CAT_BREEDS = ['Persian', 'Siamese', 'Maine Coon', 'British Shorthair', 'Bengal']

function PetInfo() {
  const [breeds, setBreeds] = useState([])

  const handlePetTypeChange = (e) => {
    const petType = e.target.value
    setBreeds(petType === 'dog' ? DOG_BREEDS : CAT_BREEDS)
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-medium text-gray-100">Pet Information</h3>

      <div>
        <label htmlFor="petType" className="input-label">Pet Type</label>
        <Field
          as="select"
          name="petType"
          id="petType"
          onChange={handlePetTypeChange}
          className="input-field"
        >
          <option value="">Select Pet Type</option>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
        </Field>
        <ErrorMessage name="petType" component="div" className="text-red-500 text-sm mt-1" />
      </div>

      <div>
        <label htmlFor="breed" className="input-label">Breed</label>
        <Field as="select" name="breed" id="breed" className="input-field">
          <option value="">Select Breed</option>
          {breeds.map((breed) => (
            <option key={breed} value={breed}>{breed}</option>
          ))}
        </Field>
        <ErrorMessage name="breed" component="div" className="text-red-500 text-sm mt-1" />
      </div>

      <div>
        <label htmlFor="petPhoto" className="input-label">Pet Photo</label>
        <Field name="petPhoto">
          {({ form }) => (
            <input
              type="file"
              onChange={(event) => {
                form.setFieldValue('petPhoto', event.currentTarget.files[0])
              }}
              className="mt-1 block w-full text-gray-100"
              accept="image/*"
            />
          )}
        </Field>
        <ErrorMessage name="petPhoto" component="div" className="text-red-500 text-sm mt-1" />
      </div>
    </div>
  )
}

export default PetInfo 