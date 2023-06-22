import Link from 'next/link'
import kebabCase from '@/utils/blog/kebab-case'

type TagProps = {
  text: string
}

export default function Tag({ text }: TagProps) {
  return (
    <Link
      href={`/blog/tags/${kebabCase(text)}`}
      className="mr-2 mt-2 text-xs font-medium uppercase text-white hover:text-gray-100 bg-indigo-500 rounded-full py-1 px-2"
    >
      {text.split(' ').join('-')}
    </Link>
  )
}
