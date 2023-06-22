import { HttpError } from '@/types/http-error'
import { User } from '@/types/user'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'

export const getUserByToken = async (token: string): Promise<{
  user?: User,
  error?: HttpError,
}> => {
  const supabase = createBrowserSupabaseClient()
  const { data: { user }, error } = await supabase
    .auth
    .getUser(token)

  if (error || !user) {
    return {
      error: {
        statusCode: 401,
        type: 'not_authorized',
        message: error.message,
      }
    }
  }

  return {
    user: {
      id: user.id,
      email: user.email,
    },
  }
}
