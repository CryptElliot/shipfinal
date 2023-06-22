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

const MagicLink: React.FC = () => {
  const supabase = useSupabaseClient()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', content: '' })
  const { t } = useTranslation('account')

  const handleSigninWithMagicLink = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    setLoading(true)
    setMessage({ type: '', content: '' })
    const { error } = await supabase
      .auth
      .signInWithOtp({
        email,
        options: {
          emailRedirectTo: window.location.origin,
        },
      })

    setLoading(false)

    if (error) {
      setMessage({ type: 'error', content: error.message })
      return
    }

    setEmail('')
    setMessage({
      type: 'note',
      content: t('magicLink.magicLinkConfirmationMessage')
    })
  }

  return (
    <>
      <Head>
        <title>{t('magicLink.title')}</title>
      </Head>
      <div className="min-h-full flex flex-col justify-center pt-6 pb-16 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center mx-auto sm:w-full sm:max-w-md">
          <div className="text-center hidden lg:block">
            <Logo />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold">
            {t('magicLink.heading')}
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 space-y-6">
            <form onSubmit={handleSigninWithMagicLink} className="space-y-6">
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
                  {t('magicLink.signInWithMagicLinkButton')}
                </Button>
              </div>
            </form>

            {
              message.content &&
              <div className={`${message.type === 'error' ? 'text-red-400' : 'text-gray-400'} text-center`}>
                {message.content}
              </div>
            }

            <div className="text-center text-sm">
              <Link
                href="/signin"
                className="font-bold hover:underline text-indigo-600 hover:text-indigo-500"
              >
                {t('magicLink.signWithPasswordLink')}
              </Link>
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

export default MagicLink
