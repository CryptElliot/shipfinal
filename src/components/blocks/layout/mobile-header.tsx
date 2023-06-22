import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/dist/client/router'
import { Session } from '@supabase/supabase-js'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useTranslation } from 'next-i18next'

type MobileNavbarProps = {
  session: Session | null
}

export default function MobileNav({ session }: MobileNavbarProps) {
  const supabase = useSupabaseClient()
  const router = useRouter()
  const [navShow, setNavShow] = useState(false)
  const { t } = useTranslation('common')

  const onToggleNav = () => {
    setNavShow((status) => {
      if (status) {
        document.body.style.overflow = 'auto'
      } else {
        // Prevent scrolling
        document.body.style.overflow = 'hidden'
      }
      return !status
    })
  }

  return (
    <div className="lg:hidden flex justify-center items-center">
      <button
        type="button"
        className="w-8 h-8 ml-1 mr-1 rounded"
        onClick={onToggleNav}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor">
          {
            navShow ?
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd" />
              :
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd" />
          }
        </svg>
      </button>
      <div className={`fixed w-full h-full top-16 right-0 bg-gray-100 dark:bg-gray-900 z-10 ease-in-out duration-300 ${navShow ? 'translate-x-0' : 'translate-x-full'}`}>
        <nav className="fixed flex flex-col h-full w-full mt-6 px-2 divide-y divide-gray-500">
          <Link
            href='/'
            className="mobile-nav-link"
            onClick={onToggleNav}
          >
            {t('navbar.homeLink')}
          </Link>
          <Link
            href='/pricing'
            className="mobile-nav-link"
            onClick={onToggleNav}
          >
            {t('navbar.pricingLink')}
          </Link>
          {
            session &&
            <>
              <Link
                href='/account'
                className="mobile-nav-link"
                onClick={onToggleNav}
              >
                {t('navbar.accountLink')}
              </Link>
              <Link
                href='/account/profile'
                className="mobile-nav-link"
                onClick={onToggleNav}
              >
                {t('navbar.profileLink')}
              </Link>
            </>
          }
          <Link
            href='/blog'
            className="mobile-nav-link"
            onClick={onToggleNav}
          >
            {t('navbar.blogLink')}
          </Link>
          {
            session ?
              <>
                <button
                  className="mobile-nav-link"
                  onClick={() => {
                    supabase.auth.signOut()
                    onToggleNav()
                    router.replace('/')
                  }}
                >
                  {t('navbar.signOutLink')}
                </button>
              </>
              :
              <Link
                href="/signin"
                className="mobile-nav-link"
                onClick={onToggleNav}
              >
                {t('navbar.signInLink')}
              </Link>
          }
        </nav>
      </div>
    </div>
  )
}
