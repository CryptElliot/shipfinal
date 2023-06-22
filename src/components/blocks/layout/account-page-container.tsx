import React from 'react'
import {
  CogIcon,
  ExclamationTriangleIcon,
  KeyIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'

type AccountPageContainerProps = {
  children: React.ReactNode
}

const AccountPageContainer: React.FC<AccountPageContainerProps> = ({ children }) => {
  const { t } = useTranslation('account')
  const router = useRouter()
  const navigation = [
    {
      title: t('accountHome.accountLink'),
      href: '/account',
      icon: CogIcon
    },
    {
      title: t('accountHome.profileLink'),
      href: '/account/profile',
      icon: UserCircleIcon
    },
    {
      title: t('accountHome.changePasswordLink'),
      href: '/account/change-password',
      icon: KeyIcon
    },
    {
      title: t('accountHome.closeAccountLink'),
      href: '/account/close-account',
      icon: ExclamationTriangleIcon
    },
  ]

  return (
    <div className="container mx-auto p-2 lg:pt-8 lg:pb-16 lg:px-8">
      <div className="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
        <div className="py-6 lg:col-span-3">
          {navigation.map((item) => (
            <Link key={item.title} href={item.href}>
              <span
                className={`${item.href === router.asPath ? 'font-bold' : 'account-page-nav-link'}
                    border-l-4 px-3 py-2 flex items-center font-medium my-2`}
              >
                <item.icon
                  className="mr-3 h-6 w-6"
                  aria-hidden="true"
                />
                <span>{item.title}</span>
              </span>
            </Link>
          ))}
        </div>

        <div className="p-2 lg:p-6 lg:col-span-9">{children}</div>
      </div>
    </div>
  )
}

export default AccountPageContainer
