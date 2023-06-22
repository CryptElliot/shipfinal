import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import Logo from '@/components/atoms/logo'

export default function Footer() {
  const { t } = useTranslation('common')
  return (
    <footer className="w-full border-t border-solid">
      <div className="mx-auto max-w-6xl px-6 grid grid-cols-1 lg:grid-cols-12 py-12">
        <div className="col-span-1 lg:col-span-3">
          <Link
            href="/"
            className="flex h-12 w-12 my-2 ml-0 lg:ml-4"
          >
            <Logo />
          </Link>
        </div>
        <div className="col-span-1 lg:col-span-3 pt-4 lg:pt-0">
          <ul className="flex flex-col">
            <li className="pb-4">
              <Link
                href="/"
                className="footer-link"
              >
                {t('footer.homeLink')}
              </Link>
            </li>
            <li className="pb-4">
              <Link
                href="/"
                className="footer-link"
              >
                {t('footer.aboutLink')}
              </Link>
            </li>
            <li className="pb-4">
              <Link
                href="/blog"
                className="footer-link"
              >
                {t('footer.blogLink')}
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-span-1 lg:col-span-3 pb-4 lg:pb-0">
          <ul className="flex flex-col">
            <li className="pb-4">
              <Link
                href="/"
                className="footer-link"
              >
                {t('footer.privacyPolicyLink')}
              </Link>
            </li>
            <li className="pb-4">
              <Link
                href="/"
                className="footer-link"
              >
                {t('footer.termsOfUseLink')}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="py-6 flex flex-col justify-center items-center border-t border-solid">
        <span>Built with{' '}
          <a
            href='https://shipsaas.com'
            rel='noopener noreferrer'
            className='underline font-extrabold'
            target='_blank'
          >
            Ship SaaS
          </a>
        </span>
      </div>
    </footer>
  )
}
