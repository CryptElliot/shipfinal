import { getUserByToken } from '@/utils/auth'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  const token = req.headers.get('token')
  const { user, error } = await getUserByToken(token)
  if (error || !user) {
    const signinUrl = new URL('/signin', req.url)
    return NextResponse.redirect(signinUrl)
  }

  return NextResponse.next()
}

// Supports both a single string value or an array of matchers
export const config = {
  matcher: ['/api/auth/:path*'],
}
