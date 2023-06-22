import { useTranslation } from 'next-i18next'
import React from 'react'

type Faq = {
  question: string
  answer: string
}

const Faq: React.FC = () => {
  const { t } = useTranslation('landingPage')
  const faqs = t('faq.items', { returnObjects: true }) as Faq[]
  return (
    <section>
      <div className="max-w-7xl mx-auto px-6 py-20 space-y-6">
        <h2 className="section-heading">
          {t('faq.heading')}
        </h2>
        <p className="section-subheading">
          {t('faq.subHeading')}
        </p>

        {
          faqs.map((faq, i) => (
            <details key={i} className="font-medium rounded-lg text-lg px-2 py-3 flex flex-row-reverse cursor-pointer bg-white dark:bg-gray-600 shadow-sm">
              <summary className="flex-auto px-4">{faq.question}</summary>
              <div className="px-6 mt-4">
                <p className="pt-4 pb-2 border-t border-solid border-gray-300">
                  {faq.answer}
                </p>
              </div>
            </details>
          ))
        }
      </div>
    </section>
  )
}

export default Faq
