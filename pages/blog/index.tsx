import { getAllFilesFrontMatter } from '@/utils/blog/mdx'
import { blogMetadata } from '@/blog-data/metadata'
import ListLayout from '@/layouts/list-layout'
import { PageSEO } from '@/components/blocks/seo'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { PostFrontMatter } from '@/types/post-front-matter'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

export default function Blog({
  posts,
  initialDisplayPosts,
  pagination,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation('blog')
  return (
    <>
      <PageSEO
        title={blogMetadata.title}
        description={blogMetadata.description} />

      <ListLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title={t('blogHome.title')}
      />
    </>
  )
}

export const POSTS_PER_PAGE = 5
export const getStaticProps: GetStaticProps<{
  posts: PostFrontMatter[]
  initialDisplayPosts: PostFrontMatter[],
  pagination: { currentPage: number, totalPages: number }
}> = async ({ locale }) => {
  const posts = await getAllFilesFrontMatter('posts')
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE)
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return {
    props: {
      initialDisplayPosts,
      posts,
      pagination,
      ...(await serverSideTranslations(locale, ['common', 'blog'])),
    }
  }
}
