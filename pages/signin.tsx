import Button from '@/components/atoms/button'
import Logo from '@/components/atoms/logo'
import { useSetRefreshSession } from '@/utils/user-context'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

const SignIn: React.FC = () => {
  const supabase = useSupabaseClient()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', content: '' })
  const router = useRouter()
  const refreshSession = useSetRefreshSession()
  const { t } = useTranslation('account')

  const handleSignin = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    setLoading(true)
    setMessage({ type: '', content: '' })
    const { error } = await supabase
      .auth
      .signInWithPassword({
        email,
        password,
      })

    if (error) {
      setMessage({ type: 'error', content: error.message })
      setLoading(false)
      return
    }

    router.replace('/')
    refreshSession(true)
  }

  return (
    <>
      <Head>
        <title>{t('signin.title')}</title>
      </Head>
      <div className="min-h-full flex flex-col justify-center pt-6 pb-16 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center mx-auto sm:w-full sm:max-w-md">
          <div className="text-center hidden lg:block">
            <Logo />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold">
            {t('signin.heading')}
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 space-y-6">
            <form onSubmit={handleSignin} className="space-y-6">
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
                    autoComplete="current-password"
                    required
                    onChange={(evt) => setPassword(evt.target.value)}
                    value={password}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <Link
                    href="/forgot-password"
                    className="font-medium hover:underline text-indigo-600 hover:text-indigo-500"
                  >
                    {t('signin.forgotPasswordLink')}
                  </Link>
                </div>
              </div>

              <div>
                <Button
                  type="submit"
                  loading={loading}
                  className="default-button"
                  disabled={loading || !password.length || !email.length}
                >
                  {t('signin.signInButton')}
                </Button>
              </div>
            </form>

            {
              message.content &&
              <div className={`${message.type === 'error' ? 'text-red-400' : 'text-gray-400'} text-center`}>
                {message.content}
              </div>
            }

            <div className="space-y-6">
              <div className="flex items-center">
                <div className="border-t border-gray-300 grow mr-3"></div>
                <div className="px-2 bg-white text-gray-500 uppercase">
                  {t('signin.orLabel')}
                </div>
                <div className="border-t border-gray-300 grow ml-3"></div>
              </div>

              <div className="flex flex-col justify-center items-center">
                <Button
                  type="button"
                  loading={false}
                  className='uppercase text-center text-sm mb-2 px-12 py-2 font-bold rounded-md flex justify-center items-center w-full border border-gray-300 shadow-sm bg-white text-gray-700 hover:bg-gray-50'
                  disabled={false}
                  onClick={async () => {
                    await supabase
                      .auth
                      .signInWithOAuth({
                        provider: 'google',
                        options: {
                          redirectTo: window.location.origin,
                        },
                      })
                  }}>
                  <svg xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    className='mr-2'>
                    <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                  </svg>
                  <span>{t('signin.signInWithGoogleButton')}</span>
                </Button>

                <Button
                  type="button"
                  loading={false}
                  className='uppercase text-center text-sm mt-2 px-12 py-2 font-bold rounded-md flex justify-center items-center w-full border border-gray-300 shadow-sm bg-white text-gray-700 hover:bg-gray-50'
                  disabled={false}
                  onClick={async () => {
                    await supabase
                      .auth
                      .signInWithOAuth({
                        provider: 'github',
                        options: {
                          redirectTo: window.location.origin,
                        },
                      })
                  }}>
                  <svg xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    className='mr-2'>
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                  </svg>
                  <span>{t('signin.signInWithGitHubButton')}</span>
                </Button>
              </div>

              <div className="flex items-center">
                <div className="border-t border-gray-300 grow mr-3"></div>
                <div className="px-2 bg-white text-gray-500 uppercase">
                  {t('signin.orLabel')}
                </div>
                <div className="border-t border-gray-300 grow ml-3"></div>
              </div>

              <div className='text-center'>
                <div className="text-center text-sm">
                  <Link href="/magic-link"
                    className="font-bold hover:underline text-indigo-600 hover:text-indigo-500"
                  >
                    {t('signin.signInWithMagicLink')}
                  </Link>
                </div>
              </div>

              <div className="flex items-center">
                <div className="border-t border-gray-300 grow mr-3"></div>
                <div className="px-2 bg-white text-gray-500 uppercase">
                  {t('signin.orLabel')}
                </div>
                <div className="border-t border-gray-300 grow ml-3"></div>
              </div>

              <div className="text-center text-sm">
                <Link
                  href="/signup"
                  className="font-bold hover:underline text-indigo-600 hover:text-indigo-500"
                >
                  {t('signin.signUpWithEmailLink')}
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

export default SignIn
