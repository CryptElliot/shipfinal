import { NextApiRequest, NextApiResponse } from 'next'
import { getSubscriptionForUser } from '@/utils/data/user'
import { Subscription } from '@/types/subscription'
import { HttpError } from '@/types/http-error'
import { getUserByToken } from '@/utils/auth'

type Data = {
  subscription?: Subscription
  error?: HttpError
}

export default async function getSubscription(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'GET') {
    try {
      const token = req.headers.token as string
      const { user } = await getUserByToken(token)
      const subscription = await getSubscriptionForUser(user.id)
      if (!subscription) {
        return res
          .status(404)
          .json({
            error: {
              statusCode: 404,
              type: 'not_found',
              message: 'Subscription not found.',
            }
          })
      }

      return res
        .status(200)
        .json({ subscription })

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
    res.setHeader('Allow', 'GET')
    res.status(405).end('Method Not Allowed')
  }
}
