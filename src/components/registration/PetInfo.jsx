import { Field, ErrorMessage } from 'formik'
import { TagIcon, PhotoIcon } from '@heroicons/react/24/outline'
import { DOG_BREEDS, CAT_BREEDS } from '@/constants/formData'
import { useState } from 'react'

function PetInfo({ showErrors }) {
  const [breeds, setBreeds] = useState([])
  const [preview, setPreview] = useState(null)

  const handlePetTypeChange = (type, form) => {
    form.setFieldValue('petType', type)
    form.setFieldValue('breed', '')
    setBreeds(type === 'dog' ? DOG_BREEDS : CAT_BREEDS)
  }

  const handleFileChange = (event, form) => {
    const file = event.currentTarget.files[0]
    if (file) {
      form.setFieldValue('petPhoto', file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-6">
      <h3 className="section-title">Pet Information</h3>

      <div className="input-group">
        <Field name="petType">
          {({ form }) => (
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => handlePetTypeChange('dog', form)}
                className={`pet-type-btn ${form.values.petType === 'dog' ? 'active' : ''}`}
              >
                <span className="text-2xl">🐕</span>
                <span>Dog</span>
              </button>
              <button
                type="button"
                onClick={() => handlePetTypeChange('cat', form)}
                className={`pet-type-btn ${form.values.petType === 'cat' ? 'active' : ''}`}
              >
                <span className="text-2xl">🐱</span>
                <span>Cat</span>
              </button>
            </div>
          )}
        </Field>
        {showErrors && <ErrorMessage name="petType" component="div" className="form-error" />}
      </div>

      <div className="input-group">
        <div className="input-wrapper">
          <TagIcon className="input-icon w-5 h-5" />
          <Field 
            as="select" 
            name="breed" 
            id="breed" 
            className="input-field pl-12 select-field" 
          >
            <option value="">Select Breed</option>
            {breeds.map((breed) => (
              <option key={breed} value={breed}>{breed}</option>
            ))}
          </Field>
        </div>
        {showErrors && <ErrorMessage name="breed" component="div" className="form-error" />}
      </div>

      <div className="input-group">
        <div className="input-wrapper">
          <PhotoIcon className="input-icon w-5 h-5" />
          <Field name="petPhoto">
            {({ form }) => (
              <>
                <input
                  type="file"
                  onChange={(event) => handleFileChange(event, form)}
                  className="input-field pl-12 file-input"
                  accept="image/*"
                />
                {preview && (
                  <div className="mt-4 relative rounded-2xl overflow-hidden aspect-square w-32 mx-auto">
                    <img 
                      src={preview} 
                      alt="Pet preview" 
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
              </>
            )}
          </Field>
        </div>
        {showErrors && <ErrorMessage name="petPhoto" component="div" className="form-error" />}
      </div>
    </div>
  )
}

export default PetInfo 