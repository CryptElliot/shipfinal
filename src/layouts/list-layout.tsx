import Link from 'next/link'
import Tag from '@/components/blog/tag'
import { ComponentProps, useState } from 'react'
import Pagination from '@/components/blog/pagination'
import formatDate from '@/utils/blog/format-date'
import { PostFrontMatter } from '@/types/post-front-matter'
import { useTranslation } from 'next-i18next'

type ListLayoutProps = {
  posts: PostFrontMatter[]
  title: string
  initialDisplayPosts?: PostFrontMatter[]
  pagination?: ComponentProps<typeof Pagination>
}

export default function ListLayout({ posts, title, initialDisplayPosts = [], pagination }: ListLayoutProps) {
  const { t } = useTranslation('blog')
  const [searchValue, setSearchValue] = useState('')
  const filteredBlogPosts = posts.filter((frontMatter) => {
    const searchContent = frontMatter.title + frontMatter.summary + frontMatter.tags.join(' ')
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts

  return (
    <div className='fill-screen'>
      <div className='container mx-auto px-4 lg:px-16'>
        <div className="divide-y">
          <div className="pt-6 pb-8 space-y-2 md:space-y-5">
            <h1 className="section-heading">
              {title}
            </h1>
            <div className="relative max-w-lg mx-auto">
              <input
                aria-label="Search articles"
                type="text"
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder={t('blogHome.searchArticlesPlaceholder')}
                className="default-input"
              />
              <svg
                className="absolute w-5 h-5 text-gray-500 right-3 top-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
          <ul>
            {
              !filteredBlogPosts.length &&
              <h5 className="section-subheading">
                {t('blogHome.noPostFoundLabel')}
              </h5>
            }
            {displayPosts.map((frontMatter) => {
              const { slug, date, title, summary, tags } = frontMatter
              return (
                <li key={slug} className="py-12">
                  <article className="space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0 xl:items-baseline">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>{formatDate(date)}</time>
                      </dd>
                    </dl>
                    <div className="space-y-3 xl:col-span-3">
                      <div>
                        <h3 className="text-2xl font-bold leading-8 tracking-tight">
                          <Link
                            href={`/blog/${slug}`}
                            className="text-gray-900 dark:text-gray-100"
                          >
                            {title}
                          </Link>
                        </h3>
                        <div className="flex flex-wrap">
                          {tags.map((tag) => (
                            <Tag key={tag} text={tag} />
                          ))}
                        </div>
                      </div>
                      <div className="prose text-gray-500 max-w-none dark:text-gray-400">
                        {summary}
                      </div>
                    </div>
                  </article>
                </li>
              )
            })}
          </ul>
        </div>
        {pagination && pagination.totalPages > 1 && !searchValue && (
          <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
        )}
      </div>
    </div>
  )
}
