import React from 'react'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'

const SocialProof: React.FC = () => {
  const { t } = useTranslation('landingPage')
  return (
    <section className='bg-gray-100'>
      <div className='container mx-auto px-6 py-20 space-y-6'>
        <h2 className="section-heading text-gray-900">
          {t('socialProof.heading')}
        </h2>
        <p className="section-subheading text-gray-700 dark:text-gray-700">
          {t('socialProof.subHeading')}
        </p>

        <div className="flex flex-wrap">
          <div className="w-full md:w-1/3 px-2 mb-4">
            <div className="bg-white rounded shadow py-2">
              <div className='flex justify-center items-center mb-4'>
                <Image
                  alt='reviewer 1'
                  src='/images/face-1.jpg'
                  className='rounded-full'
                  height='64'
                  width='64'
                />
              </div>
              <div>
                <p className="text-gray-800 text-base px-6 mb-5">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                  doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
                  veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                </p>
                <p className="text-gray-500 text-xs md:text-sm px-6">
                  Hannah Fleming, CEO of Big Corp.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 px-2 mb-4">
            <div className="bg-white rounded shadow py-2">
              <div className='flex justify-center items-center mb-4'>
                <Image
                  alt='reviewer 2'
                  src='/images/face-2.jpg'
                  className='rounded-full'
                  height='64'
                  width='64'
                />
              </div>
              <div>
                <p className="text-gray-800 text-base px-6 mb-5">
                  Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit,
                  sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                  Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur,
                  adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore
                  magnam aliquam quaerat voluptatem.
                </p>
                <p className="text-gray-500 text-xs md:text-sm px-6">
                  Jane Doe from the Startup Ventures
                </p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 px-2 mb-4">
            <div className="bg-white rounded shadow py-2">
              <div className='flex justify-center items-center mb-4'>
                <Image
                  alt='reviewer 3'
                  src='/images/face-3.jpg'
                  className='rounded-full'
                  height='64'
                  width='64'
                />
              </div>
              <div>
                <p className="text-gray-800 text-base px-6 mb-5">
                  Ut enim ad minima veniam, quis nostrum exercitationem ullam
                  corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.
                </p>
                <p className="text-gray-500 text-xs md:text-sm px-6">
                  Dean Dunning, founder of Tech industries
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SocialProof
