import Button from '@/components/atoms/button'
import Logo from '@/components/atoms/logo'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

const ResetPassword: React.FC = () => {
  const supabase = useSupabaseClient()
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', content: '' })
  const router = useRouter()
  const { t } = useTranslation('account')

  const handleResetPassword = async (evt) => {
    evt.preventDefault()
    setLoading(true)
    setMessage({ type: '', content: '' })

    if (password && passwordConfirmation && password === passwordConfirmation) {
      await supabase.auth.updateUser({
        password: password,
      })

      await supabase.auth.signOut()
      router.replace('/signin')
    } else {
      setLoading(false)
      setMessage({ type: 'error', content: t('shared.passwordConfirmationErrorMessage') })
    }
  }

  return (
    <>
      <Head>
        <title>{t('resetPassword.title')}</title>
      </Head>
      <div className="min-h-full flex flex-col justify-center pt-6 pb-16 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center mx-auto sm:w-full sm:max-w-md">
          <div className="text-center hidden lg:block">
            <Logo />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold">{t('resetPassword.heading')}</h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={handleResetPassword} className="space-y-6">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  {t('shared.passwordLabel')}
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    className="default-input"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    onChange={(evt) => setPassword(evt.target.value)}
                    value={password}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password-confirmation" className="block text-sm font-medium text-gray-700">
                  {t('shared.confirmPasswordLabel')}
                </label>
                <div className="mt-1">
                  <input
                    id="password-confirmation"
                    className="default-input"
                    name="password-confirmation"
                    type="password"
                    autoComplete="new-password"
                    required
                    onChange={(evt) => setPasswordConfirmation(evt.target.value)}
                    value={passwordConfirmation}
                  />
                </div>
              </div>

              <div>
                <Button
                  type="submit"
                  loading={loading}
                  className="default-button"
                  disabled={loading || !password.length || !passwordConfirmation.length}
                >
                  {t('resetPassword.resetPasswordButton')}
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

export default ResetPassword
