import '@/styles/main.css'
import '@/styles/prism.css'
import { useState } from 'react'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import BaseLayout from '@/layouts/base-layout'
import { UserContextProvider } from '@/utils/user-context'
import { appWithTranslation } from 'next-i18next'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'

const App = ({ Component, pageProps }: AppProps) => {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient())
  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={(pageProps as any).initialSession}
    >
      <UserContextProvider>
        <ThemeProvider attribute="class">
          <BaseLayout>
            <Component {...pageProps} />
          </BaseLayout>
        </ThemeProvider>
      </UserContextProvider>
    </SessionContextProvider>
  )
}

export default appWithTranslation(App)
