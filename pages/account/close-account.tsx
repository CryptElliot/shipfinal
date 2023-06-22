import Button from '@/components/atoms/button'
import AccountPageContainer from '@/components/blocks/layout/account-page-container'
import ProtectedPage from '@/layouts/protected-page'
import { deleteData } from '@/utils/http-helpers'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { Dialog } from '@headlessui/react'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

const CloseAccount: React.FC = () => {
  const supabase = useSupabaseClient()
  const [loading, setLoading] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()
  const session = useSession()
  const { t } = useTranslation('account')

  const closeAccount = async () => {
    setLoading(true)
    const { error } = await deleteData('/api/auth/close-account', session.access_token)
    setLoading(false)
    if (error) {
      setErrorMessage(t('closeAccount.closeAccountErrorMessage'))
    } else {
      await supabase.auth.signOut()
      router.replace('/')
    }
  }

  return (
    <>
      <Head>
        <title>{t('closeAccount.title')}</title>
      </Head>
      <AccountPageContainer>
        <ProtectedPage>
          <div className="min-h-full flex flex-col justify-center pt-6 pb-16 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-center mx-auto sm:w-full sm:max-w-md">
              <h2 className="mt-6 text-center text-3xl font-extrabold">{t('closeAccount.heading')}</h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
              <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <div className="space-y-6 text-gray-700">
                  <h3 className="text-2xl font-medium text-center">
                    {t('closeAccount.subHeading')}
                  </h3>
                  <div className="text-xl font-bold text-center">
                    <Button
                      type='button'
                      className='w-full flex justify-center py-2 px-4 rounded-md text-sm font-bold text-white bg-red-600 hover:bg-red-700 focus:outline-none uppercase'
                      onClick={() => setShowConfirmation(true)}
                    >
                      {t('closeAccount.closeAccountButton')}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ProtectedPage>
      </AccountPageContainer>

      {/* Confirmation dialog */}
      <Dialog
        open={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        className='relative z-50'
      >
        <div className='fixed inset-0 bg-black/80' aria-hidden='true' />
        <div className='fixed inset-0 flex items-center justify-center p-4'>
          <Dialog.Panel className='py-6 px-4 shadow sm:rounded-lg sm:px-10 space-y-4 bg-white dark:bg-gray-900 dark:border dark:border-white max-w-xl'>
            <Dialog.Title className='mt-6 text-center text-3xl font-extrabold'>
              {t('closeAccount.confirmationModalTitle')}
            </Dialog.Title>
            <Dialog.Description className='text-2xl font-medium text-center'>
              {t('closeAccount.confirmationModalDescription')}
            </Dialog.Description>

            <p className='text-center'>
              {t('closeAccount.closeAccountConfirmationMessage')}
            </p>

            <div className='flex justify-center space-x-4'>
              <Button
                type='button'
                loading={loading}
                className='flex-1 flex justify-center py-2 px-4 rounded-md text-sm font-bold text-white bg-red-600 hover:bg-red-700 focus:outline-none uppercase max-w-xs'
                onClick={closeAccount}
              >
                {t('closeAccount.yesButton')}
              </Button>
              <Button
                type='button'
                className='flex-1 flex justify-center py-2 px-4 rounded-md text-sm font-bold text-red-600 bg-white hover:bg-gray-100 border border-red-600 focus:outline-none uppercase max-w-xs'
                onClick={() => setShowConfirmation(false)}
              >
                {t('closeAccount.noButton')}
              </Button>
            </div>

            {
              errorMessage &&
              <p className='text-center text-red-600'>
                {errorMessage}
              </p>
            }
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'account'])),
    },
  }
}

export default CloseAccount
