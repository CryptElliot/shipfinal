import React from 'react'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'

const FinalCta: React.FC = () => {
  const { t } = useTranslation('landingPage')
  return (
    <div className="bg-gray-50 dark:bg-indigo-500">
      <div className="max-w-7xl mx-auto py-12 lg:py-16 px-6 flex flex-col lg:flex-row items-center justify-center lg:justify-between space-y-8 lg:space-y-0">
        <h2 className="text-3xl font-extrabold sm:text-4xl text-center lg:text-left  text-gray-800 dark:text-white">
          <span className="block">{t('finalCta.headingPart1')}</span>
          <span className="block">{t('finalCta.headingPart2')}</span>
        </h2>
        <div className="flex flex-col md:flex-row w-full md:w-auto space-x-0 md:space-x-4 space-y-4 md:space-y-0">
          <Link
            href='/signin'
            className="whitespace-nowrap text-center px-5 py-4 font-medium rounded-lg border border-indigo-600 shadow-md text-white bg-indigo-600 dark:text-indigo-600 dark:bg-white hover:shadow-xl"
          >
            {t('finalCta.primaryCta')}
          </Link>
          <Link
            href='/#features'
            className="whitespace-nowrap text-center px-5 py-4 font-medium rounded-lg border border-indigo-600 shadow-md text-indigo-600 bg-white dark:text-white dark:bg-indigo-800 hover:shadow-xl"
          >
            {t('finalCta.secondaryCta')}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default FinalCta
