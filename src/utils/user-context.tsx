import {
  useEffect,
  useState,
  createContext,
  useContext,
} from 'react'
import { UserDetails } from '@/types/user-details'
import { Subscription } from '@/types/subscription'
import { User } from '@/types/user'
import { getData } from './http-helpers'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { Session } from '@supabase/supabase-js'

export const UserContext = createContext<{
  session: Session | null,
  user: User | null,
  userDetails: UserDetails | null,
  setUserDetails: (userDetails: UserDetails) => void,
  subscription: Subscription | null,
  setRefreshSession: (refreshSession: boolean) => void,
}>(null)

export function UserContextProvider(props: { children: JSX.Element }) {
  const supabase = createBrowserSupabaseClient()
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null)
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [refreshSession, setRefreshSession] = useState(false)
  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase
        .auth
        .getSession()

      setSession(session)
      setUser(session?.user ? { id: session.user.id, email: session.user.email } : null)
    }
    getSession()

  }, [refreshSession])

  useEffect(() => {
    if (user) {
      supabase.from('user_details')
        .select('*')
        .eq('id', user.id)
        .single()
        .then(res => setUserDetails(res.data))

      // fetch subscription after auth cookie is set
      if (session) {
        getData<{ subscription: Subscription }>('/api/auth/get-subscription', session.access_token)
          .then(res => {
            if (res.error) {
              setSubscription(null)
            } else {
              setSubscription(res.data.subscription)
            }
          })
      }
    }
  }, [user, session])

  const value = {
    session,
    user,
    userDetails,
    setUserDetails,
    subscription,
    setRefreshSession,
  }

  return <UserContext.Provider value={value} {...props} />
}

export function useUserDetails(): [UserDetails, (userDetails: UserDetails) => void] {
  const context = useContext(UserContext)
  return [context.userDetails, context.setUserDetails]
}

export function useSubscription(): Subscription {
  const context = useContext(UserContext)
  return context.subscription
}

export function useSetRefreshSession(): (refreshSession: boolean) => void {
  const context = useContext(UserContext)
  return context.setRefreshSession
}
