import React from 'react'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import PricingComponent from '@/components/blocks/pricing'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

const Pricing: React.FC = () => {
  const { t } = useTranslation('landingPage')
  return (
    <>
      <Head>
        <title>{t('pricing.title')}</title>
      </Head>
      <PricingComponent />
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'landingPage'])),
    },
  }
}


export default Pricing
