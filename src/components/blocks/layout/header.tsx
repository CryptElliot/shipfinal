import Link from 'next/link'
import { useRouter } from 'next/router'
import { useUserDetails } from '@/utils/user-context'
import Logo from '@/components/atoms/logo'
import MobileHeader from './mobile-header'
import ThemeSwitch from '@/components/blocks/theme-switch'
import LocaleSwitch from '@/components/blocks/locale-switch'
import { useTranslation } from 'next-i18next'
import {
  useSession,
  useSupabaseClient,
} from '@supabase/auth-helpers-react'

export default function Navbar() {
  const supabase = useSupabaseClient()
  const [userDetails] = useUserDetails()
  const session = useSession()
  const router = useRouter()
  const { t } = useTranslation('common')

  return (
    <nav className='bg-gray-50 dark:bg-gray-800 shadow-xl dark:shadow-md dark:shadow-gray-600'>
      <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center">
        <div className="flex w-full justify-between items-center">
          <div className='flex items-center space-x-4'>
            <Link href="/">
              <Logo />
            </Link>
            <div className="hidden lg:block">
              <ul className='inline-flex space-x-4'>
                <li>
                  <Link
                    href="/#features"
                    className='header-link'
                  >
                    {t('navbar.featuresLink')}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className='header-link'
                  >
                    {t('navbar.pricingLink')}
                  </Link>
                </li>
                <li>
                  <Link
                    href='/blog'
                    className='header-link'
                  >
                    {t('navbar.blogLink')}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="hidden lg:flex justify-end items-center space-x-6">
            {
              session ?
                <div className='inline-flex'>
                  <div className='relative group cursor-pointer'>
                    {
                      userDetails?.avatar_url ?
                        <img
                          alt='Avatar'
                          src={`${userDetails.avatar_url}?id=${new Date().getTime() / 1000}`}
                          className='h-10 w-10 rounded-full'
                        />
                        :
                        <svg xmlns="http://www.w3.org/2000/svg"
                          className="h-10 w-10"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor">
                          <path strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                    }
                    {
                      <div className='absolute right-1/2 translate-x-1/2 top-0 mt-10 p-2 rounded-lg shadow-lg bg-gray-200 z-10 hidden group-hover:block'>
                        <ul>
                          <li className='header-dropdown-link-container'>
                            <Link
                              href="/account"
                              className='header-dropdown-link'
                            >
                              {t('navbar.accountLink')}
                            </Link>
                          </li>
                          <li className='header-dropdown-link-container'>
                            <Link
                              href='/account/profile'
                              className='header-dropdown-link'
                            >
                              {t('navbar.profileLink')}
                            </Link>
                          </li>
                          <li className='header-dropdown-link-container'>
                            <a
                              className='header-dropdown-link whitespace-nowrap'
                              href='#'
                              onClick={() => {
                                supabase.auth.signOut()
                                router.replace('/')
                              }}
                            >
                              {t('navbar.signOutLink')}
                            </a>
                          </li>
                        </ul>
                      </div>
                    }
                  </div>
                </div>
                :
                <>
                  <Link
                    href="/signin"
                    className="header-link border border-indigo-600 rounded-md hover:border-indigo-700"
                  >
                    {t('navbar.signInLink')}
                  </Link>
                  <Link
                    href="/signup"
                    className="whitespace-nowrap px-4 py-2 rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    {t('navbar.signUpLink')}
                  </Link>
                </>
            }
            <ThemeSwitch />
            <LocaleSwitch />
          </div>
        </div>
        <div className='flex lg:hidden items-center space-x-4'>
          <ThemeSwitch />
          <LocaleSwitch />
          <MobileHeader session={session} />
        </div>
      </div>
    </nav>
  )
}
