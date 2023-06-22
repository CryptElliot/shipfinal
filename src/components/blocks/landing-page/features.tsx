import React from 'react'
import { useTranslation } from 'next-i18next'
import {
  PresentationChartBarIcon,
  BuildingOffice2Icon,
  ShoppingCartIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline'

type Feature = {
  name: string
  description: string
}

const Features: React.FC = () => {
  const { t } = useTranslation('landingPage')
  const translatedFeatures = t('features.items', { returnObjects: true }) as Feature[]
  const features = [
    {
      name: translatedFeatures[0].name,
      description: translatedFeatures[0].description,
      icon: PresentationChartBarIcon,
    },
    {
      name: translatedFeatures[1].name,
      description: translatedFeatures[1].description,
      icon: BuildingOffice2Icon,
    },
    {
      name: translatedFeatures[2].name,
      description: translatedFeatures[2].description,
      icon: ShoppingCartIcon,
    },
    {
      name: translatedFeatures[3].name,
      description: translatedFeatures[3].description,
      icon: CurrencyDollarIcon,
    },
  ]

  return (
    <section className='max-w-7xl mx-auto px-6 py-12' id="features">
      <h2 className='section-heading'>
        {t('features.heading')}
      </h2>
      <p className="section-subheading">
        {t('features.subHeading')}
      </p>
      <div className="mx-auto px-6 lg:px-8">
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12">
          {
            features.map((feature, i) => (
              <div key={i} className="flex flex-col justify-center items-center space-y-3">
                <div className="p-4 rounded-lg bg-indigo-600 text-white">
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <p className="text-center text-2xl font-medium text-gray-900 dark:text-gray-50">{feature.name}</p>
                <p className="text-center text-base text-gray-700 dark:text-gray-300">{feature.description}</p>
              </div>
            ))
          }
        </div>
      </div>
    </section>
  )
}

export default Features
