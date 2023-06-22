import { NextApiRequest, NextApiResponse } from 'next'
import { stripe } from '@/utils/stripe'
import { getOrCreateCustomer } from '@/utils/data/customer'
import { HttpError } from '@/types/http-error'
import { getUserByToken } from '@/utils/auth'

type Data = {
  url?: string
  error?: HttpError
}

export default async function createPortalLink(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    try {
      const token = req.headers.token as string
      const { user } = await getUserByToken(token)
      const customerId = await getOrCreateCustomer(user.id, user.email)
      const { url } = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: process.env.STRIPE_SESSION_REDIRECT_URL,
      })

      return res
        .status(200)
        .json({ url })

    } catch (err) {
      console.error(err)
      return res
        .status(500)
        .json({
          error: {
            statusCode: 500,
            type: 'internal_server_error',
            message: err.message,
          }
        })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
