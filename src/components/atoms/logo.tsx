import Image from 'next/image'

export default function Logo() {
  return (
    <Image
      src='/images/logo.png'
      alt='company logo'
      className='rounded-full'
      height={50}
      width={50}
    />
  )
}
