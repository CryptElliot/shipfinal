import React from 'react'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'

const Hero: React.FC = () => {
  const { t } = useTranslation('landingPage')
  return (
    <div className="fill-screen px-6 lg:px-8 pt-8 md:pt-16 pb-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-1">
        <div className="w-full pt-8 lg:pt-20">
          <div className="mx-auto max-w-3xl px-2 lg:px-8 sm:text-center lg:text-left space-y-8">
            <h1 className='text-4xl sm:text-5xl font-extrabold tracking-tight text-center lg:text-left'>
              <span className="block">{t('hero.headingPart1')}</span>{' '}
              <span className="block">{t('hero.headingPart2')}</span>
            </h1>
            <p className='text-gray-600 dark:text-gray-200 text-xl text-center lg:text-left'>
              {t('hero.description')}
            </p>
            <div className='inline-flex items-center'>
              <div className="flex -space-x-2 overflow-hidden">
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-800" src="/images/face-1.jpg" alt="" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-800" src="/images/face-2.jpg" alt="" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-800" src="/images/face-3.jpg" alt="" />
              </div>
              <div className="min-w-0 flex-1 pl-5 py-1 text-sm text-gray-500 dark:text-gray-300 sm:py-3">
                <span>{t('hero.socialProofPart1')}</span>{' '}<span className="font-medium text-gray-900 dark:text-white">{t('hero.socialProofPart2')}</span>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row space-x-0 lg:space-x-4 space-y-4 lg:space-y-0">
              <Link
                href='/signin'
                className="whitespace-nowrap w-full md:w-auto text-center px-6 py-4 font-medium text-xl rounded-lg border border-indigo-600 shadow-md text-white bg-indigo-600 dark:text-indigo-600 dark:bg-white hover:shadow-xl"
              >
                {t('hero.primaryCta')}
              </Link>
              <Link
                href='/#features'
                className="whitespace-nowrap w-full md:w-auto text-center px-6 py-4 font-medium text-xl rounded-lg border border-indigo-600 shadow-md text-indigo-600 bg-white dark:text-white dark:bg-indigo-800 hover:shadow-xl"
              >
                {t('hero.secondaryCta')}
              </Link>
            </div>
          </div>
        </div>
        <div className="md:h-4/5 pt-16 lg:pt-0 xl:h-full ">
          <img
            className="w-full lg:h-full"
            src="/images/hero.svg"
            alt="hero image"
          />
        </div>
      </div>
    </div>
  )
}

export default Hero
