import { Field, ErrorMessage } from 'formik'
import { SUBSCRIPTION_PLANS } from '@/constants/formData'
import { CheckIcon } from '@heroicons/react/24/outline'

function SubscriptionPlan({ showErrors }) {
  const getPlanEmoji = (planId) => {
    switch (planId) {
      case 'essential':
        return '⭐️'
      case 'comfort':
        return '⭐️⭐️'
      case 'luxury':
        return '⭐️⭐️⭐️'
      default:
        return '🎁'
    }
  }

  const formatFeature = (feature) => {
    // Bold the number and key terms
    return feature.replace(
      /(\d+\s*(?:Premium\s*)?(?:Food|Grooming|Toy|Accessory)\s*(?:Items?|Products?))/g,
      '<strong>$1</strong>'
    )
  }

  return (
    <div className="space-y-6">
      <h3 className="section-title">Choose Your Plan ✨</h3>

      <Field name="subscriptionPlan">
        {({ field, form }) => (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {SUBSCRIPTION_PLANS.map((plan) => (
              <button
                key={plan.id}
                type="button"
                onClick={() => form.setFieldValue('subscriptionPlan', plan.id)}
                className={`plan-card ${field.value === plan.id ? 'active' : ''}`}
              >
                <div className="plan-header">
                  <span className="text-4xl mb-3 block">{getPlanEmoji(plan.id)}</span>
                  <h4 className="plan-name">{plan.name}</h4>
                  <div className="plan-price-container">
                    <span className="text-sm text-brand-blue/70">Starting at</span>
                    <p className="plan-price">₹{plan.price}<span className="text-sm font-normal">/month</span></p>
                  </div>
                  <p className="plan-description">{plan.description}</p>
                </div>
                
                <div className="plan-features">
                  <p className="text-sm font-medium text-brand-blue/70 mb-2">What's included:</p>
                  {plan.features.map((feature, index) => (
                    <div key={index} className="feature-item">
                      <span className="text-brand-blue">✓</span>
                      <span dangerouslySetInnerHTML={{ 
                        __html: formatFeature(feature) 
                      }} />
                    </div>
                  ))}
                </div>

                {field.value === plan.id && (
                  <div className="absolute -top-2 -right-2 bg-white border-2 border-brand-blue text-brand-blue p-2 rounded-full">
                    <CheckIcon className="w-5 h-5" />
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </Field>
      {showErrors && (
        <ErrorMessage 
          name="subscriptionPlan" 
          component="div" 
          className="form-error" 
        />
      )}
    </div>
  )
}

export default SubscriptionPlan 