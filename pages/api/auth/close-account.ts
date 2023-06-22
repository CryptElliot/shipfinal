import { NextApiRequest, NextApiResponse } from 'next'
import { HttpError } from '@/types/http-error'
import { getUserByToken } from '@/utils/auth'
import { deleteUser } from '@/utils/data/user'

type Data = {
  error?: HttpError
}

export default async function closeAccount(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'DELETE') {
    try {
      const token = req.headers.token as string
      const { user } = await getUserByToken(token)
      await deleteUser(user.id)
      return res
        .status(200)
        .end()

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
    res.setHeader('Allow', 'DELETE')
    res.status(405).end('Method Not Allowed')
  }
}
