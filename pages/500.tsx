import React from 'react'
import ErrorPage from 'next/error'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const InternalServerError: React.FC = () => {
  return <ErrorPage statusCode={500} />
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}

export default InternalServerError
