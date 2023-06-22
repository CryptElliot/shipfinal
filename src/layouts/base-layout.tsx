import Header from '@/components/blocks/layout/header'
import Footer from '@/components/blocks/layout/footer'

type BaseLayoutProps = {
  children: JSX.Element[] | JSX.Element
}

export default function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <>
      <Header />
      <main className='fill-screen'>{children}</main>
      <Footer />
    </>
  )
}
