import { useTranslation } from 'next-i18next'
import Link from 'next/link'

type PaginationProps = {
  totalPages: number
  currentPage: number
}

export default function Pagination({ totalPages, currentPage }: PaginationProps) {
  const { t } = useTranslation('blog')
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="pt-6 pb-8 space-y-2 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
            {t('blogHome.paginationPreviousButton')}
          </button>
        )}
        {prevPage && (
          <Link href={currentPage - 1 === 1 ? `/blog/` : `/blog/page/${currentPage - 1}`}>
            {t('blogHome.paginationPreviousButton')}
          </Link>
        )}
        <span>
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!nextPage}>
            {t('blogHome.paginationNextButton')}
          </button>
        )}
        {nextPage && (
          <Link href={`/blog/page/${currentPage + 1}`}>
            {t('blogHome.paginationNextButton')}
          </Link>
        )}
      </nav>
    </div>
  )
}
