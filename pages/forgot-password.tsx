import Button from '@/components/atoms/button'
import Logo from '@/components/atoms/logo'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import React, { useState } from 'react'

const ForgotPassword: React.FC = () => {
  const supabase = useSupabaseClient()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', content: '' })
  const { t } = useTranslation('account')

  const handleForgotPassword = async (evt) => {
    evt.preventDefault()
    setLoading(true)
    setMessage({ type: '', content: '' })
    const { error } = await supabase
      .auth
      .resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })

    if (error) {
      setMessage({ type: 'error', content: error.message })
      setLoading(false)
      return
    }

    setMessage({
      type: 'note',
      content: t('forgotPassword.emailConfirmationMessage')
    })
    setLoading(false)
    return
  }

  return (
    <>
      <Head>
        <title>{t('forgotPassword.title')}</title>
      </Head>
      <div className="min-h-full flex flex-col justify-center pt-6 pb-16 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center mx-auto sm:w-full sm:max-w-md">
          <div className="text-center hidden lg:block">
            <Logo />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold">{t('forgotPassword.heading')}</h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={handleForgotPassword} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  {t('shared.emailLabel')}
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    className="default-input"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    onChange={(evt) => setEmail(evt.target.value)}
                    value={email}
                  />
                </div>
              </div>

              <div>
                <Button
                  type="submit"
                  loading={loading}
                  className="default-button"
                  disabled={loading || !email.length}
                >
                  {t('forgotPassword.sendResetLinkButton')}
                </Button>
              </div>
            </form>

            {
              message.content &&
              <div className={`${message.type === 'error' ? 'text-red-400' : 'text-gray-400'} text-center pt-6`}>
                {message.content}
              </div>
            }

          </div>
        </div>
      </div>
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

export default ForgotPassword
