import React from 'react'
import { GetStaticProps } from 'next'
import Pricing from '@/components/blocks/pricing'
import { PageSEO } from '@/components/blocks/seo'
import Hero from '@/components/blocks/landing-page/hero'
import Features from '@/components/blocks/landing-page/features'
import SocialProof from '@/components/blocks/landing-page/social-proof'
import Faq from '@/components/blocks/landing-page/faq'
import FinalCta from '@/components/blocks/landing-page/final-cta'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

const Home: React.FC = () => {
  const { t } = useTranslation('landingPage')
  return (
    <>
      <PageSEO
        title={t('title')}
        description={t('description')}
      />

      <div className="space-y-10">
        <Hero />
        <Features />
        <SocialProof />
        <Pricing />
        <Faq />
        <FinalCta />
      </div>
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

export default Home
