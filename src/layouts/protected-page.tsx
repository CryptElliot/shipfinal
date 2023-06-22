import { useSession } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

type ProtectedPageProps = {
  children: React.ReactNode
}

const isSsr = typeof window === 'undefined'

const ProtectedPage: React.FC<ProtectedPageProps> = ({ children }) => {
  const session = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  // this is a workaround because the Supabase session
  // is only set after the page mounts
  useEffect(() => {
    setLoading(false)
  }, [session])

  if (isSsr) {
    return <></>
  }

  if (session && !loading) {
    return (
      <>
        {children}
      </>
    )
  }

  if (!session && !loading) {
    router.replace('/signin')
    return <></>
  }

  return <></>
}

export default ProtectedPage
