import Link from 'next/link'
import { PageSEO } from '@/components/blocks/seo'
import Tag from '@/components/blog/tag'
import { blogMetadata } from '@/blog-data/metadata'
import { getAllTags } from '@/utils/blog/tags'
import kebabCase from '@/utils/blog/kebab-case'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

export default function Tags({ tags }: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation('blog')
  const sortedTags = Object.keys(tags).sort((a, b) => tags[b] - tags[a])
  return (
    <>
      <PageSEO
        title={`Tags - ${blogMetadata.title}`}
        description={blogMetadata.description}
      />

      <div className='fill-screen'>
        <div className='container mx-auto px-4 lg:px-16'>
          <div className="flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:justify-center md:items-center md:divide-y-0 md:flex-row md:space-x-6 md:mt-24">
            <div className="py-6 space-x-2 md:space-y-5 mx-auto lg:mx-0">
              <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 md:border-r-2 md:px-6">
                {t('tags.heading')}
              </h1>
            </div>
            <div className="flex flex-wrap max-w-lg justify-between lg:justify-start">
              {Object.keys(tags).length === 0 && 'No tags found.'}
              {sortedTags.map((t) => {
                return (
                  <div key={t} className="mt-2 mb-2 mr-5">
                    <Tag text={t} />
                    <Link
                      href={`/blog/tags/${kebabCase(t)}`}
                      className="-ml-2 text-sm font-semibold text-gray-600 uppercase dark:text-gray-300"
                    >
                      {` (${tags[t]})`}
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps<{
  tags: Record<string, number>
}> = async ({ locale }) => {
  const tags = await getAllTags('posts')
  return {
    props: {
      tags,
      ...(await serverSideTranslations(locale, ['common', 'blog'])),
    }
  }
}
