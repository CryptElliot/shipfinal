import Button from '@/components/atoms/button'
import AccountPageContainer from '@/components/blocks/layout/account-page-container'
import ProtectedPage from '@/layouts/protected-page'
import { postData } from '@/utils/http-helpers'
import { useSubscription } from '@/utils/user-context'
import { useSession } from '@supabase/auth-helpers-react'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

const AccountHome: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()
  const session = useSession()
  const subscription = useSubscription()
  const { t } = useTranslation('account')

  const redirectToCustomerPortal = async () => {
    setLoading(true)
    const { data, error } = await postData<{ url: string }>('/api/auth/create-stripe-portal-link',
      {},
      session.access_token
    )

    if (error) {
      setErrorMessage(t('accountHome.redirectToStripeErrorMessage'))
      setLoading(false)
      return
    }

    router.push(data.url)
    setLoading(false)
  }

  const subscriptionName = subscription && subscription.prices.products.name
  const subscriptionPrice =
    subscription &&
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: subscription.prices.currency,
      minimumFractionDigits: 0
    }).format(subscription.prices.unit_amount / 100)

  return (
    <>
      <Head>
        <title>{t('accountHome.title')}</title>
      </Head>
      <AccountPageContainer>
        <ProtectedPage>
          <div className="min-h-full flex flex-col justify-center pt-6 pb-16 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-center mx-auto sm:w-full sm:max-w-md">
              <h2 className="mt-6 text-center text-3xl font-extrabold">
                {t('accountHome.heading')}
              </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
              <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <div className="space-y-6 text-gray-700">
                  <h3 className="text-2xl font-medium text-center">
                    {
                      subscriptionName &&
                      t('accountHome.activeSubscriptionLabel', { subscriptionName })
                    }
                    {
                      !subscriptionName &&
                      t('accountHome.noSubscriptionLabel')
                    }
                  </h3>
                  <div className="text-xl font-bold text-center">
                    {
                      subscriptionPrice ?
                        `${subscriptionPrice}/${subscription.prices.interval}`
                        :
                        <Link
                          href="/pricing"
                          className='default-button'
                        >
                          {t('accountHome.choosePlanLink')}
                        </Link>
                    }
                  </div>
                  {
                    subscription && subscription.cancel_at_period_end && subscription.cancel_at &&
                    <div className="text-center">
                      <span className='text-sm'>{t('accountHome.subscriptionEndsLabel')} {new Date(subscription.cancel_at).toLocaleDateString()}</span>
                    </div>
                  }
                  {
                    subscription &&
                    <div>
                      <Button
                        loading={loading}
                        type='button'
                        disabled={loading || !subscription}
                        className='default-button'
                        onClick={redirectToCustomerPortal}
                      >
                        {t('accountHome.manageSubscriptionButton')}
                      </Button>
                    </div>
                  }
                  {
                    errorMessage &&
                    <div className="text-red-400 text-center">
                      {errorMessage}
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </ProtectedPage>
      </AccountPageContainer>
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

export default AccountHome
