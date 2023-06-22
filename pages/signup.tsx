import Button from '@/components/atoms/button'
import Logo from '@/components/atoms/logo'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import Link from 'next/link'
import React, { useState } from 'react'

const SignUp: React.FC = () => {
  const supabase = useSupabaseClient()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', content: '' })
  const { t } = useTranslation('account')

  const handleSignup = async (evt) => {
    evt.preventDefault()
    setLoading(true)
    setMessage({ type: '', content: '' })

    if (password !== passwordConfirmation) {
      setMessage({ type: 'error', content: t('shared.passwordConfirmationErrorMessage') })
      setLoading(false)
      return
    }

    const { error, data: { user } } = await supabase
      .auth
      .signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin,
        },
      })

    if (error) {
      setMessage({ type: 'error', content: error.message })
      setLoading(false)
      return
    }

    setMessage({
      type: 'note',
      content: t('signup.signupConfirmationMessage')
    })

    setLoading(false)
    setPassword('')
    setPasswordConfirmation('')
    setEmail('')
  }

  return (
    <>
      <Head>
        <title>{t('signup.title')}</title>
      </Head>
      <div className="min-h-full flex flex-col justify-center pt-6 pb-16 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center mx-auto sm:w-full sm:max-w-md">
          <div className="text-center hidden lg:block">
            <Logo />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold">
            {t('signup.heading')}
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={handleSignup} className="space-y-6">
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
                  disabled={loading || !email.length || !password.length || !passwordConfirmation.length}
                >
                  {t('signup.signUpButton')}
                </Button>
              </div>
            </form>

            {
              message.content &&
              <div className={`${message.type === 'error' ? 'text-red-400' : 'text-gray-400'} text-center pt-6`}>
                {message.content}
              </div>
            }

            <div className="mt-6">
              <div className="pt-1 text-center text-sm">
                <Link
                  href="/signin"
                  className="font-bold hover:underline text-indigo-600 hover:text-indigo-500"
                >
                  {t('signup.signInLink')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const supabase = createServerSupabaseClient(ctx)
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      ...(await serverSideTranslations(ctx.locale, ['common', 'account'])),
    },
  }
}

export default SignUp
