import { PageSEO } from '@/components/blocks/seo'
import { blogMetadata } from '@/blog-data/metadata'
import { getAllFilesFrontMatter } from '@/utils/blog/mdx'
import ListLayout from '@/layouts/list-layout'
import { POSTS_PER_PAGE } from '../../blog'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { PostFrontMatter } from '@/types/post-front-matter'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

export default function PostPage({
  posts,
  initialDisplayPosts,
  pagination,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation('blog')
  return (
    <>
      <PageSEO
        title={blogMetadata.title}
        description={blogMetadata.description}
      />

      <ListLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title={t('blogHome.title')}
      />
    </>
  )
}

export const getStaticPaths: GetStaticPaths<{ page: string }> = async () => {
  const totalPosts = await getAllFilesFrontMatter('posts')
  const totalPages = Math.ceil(totalPosts.length / POSTS_PER_PAGE)
  const paths = Array.from({ length: totalPages }, (_, i) => ({
    params: { page: (i + 1).toString() },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<{
  posts: PostFrontMatter[]
  initialDisplayPosts: PostFrontMatter[]
  pagination: { currentPage: number, totalPages: number }
}> = async (context) => {
  const {
    params: { page },
    locale,
  } = context
  const posts = await getAllFilesFrontMatter('posts')
  const pageNumber = parseInt(page as string)
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return {
    props: {
      posts,
      initialDisplayPosts,
      pagination,
      ...(await serverSideTranslations(locale, ['common', 'blog'])),
    },
  }
}
