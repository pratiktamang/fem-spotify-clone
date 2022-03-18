import jwt from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse} from 'next'
import prisma from './prisma'

export const validateRoute = (handler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
		const { TRAX_ACCESS_TOKEN: token } = req.cookies
			
		if (token) {
			let user
				
			try {
				const { id } = jwt.verify(token, 'hello') // TODO : add token as env variable
				user = await prisma.user.findUnique({
					where: { id },
				})

				if (!user) {
					throw new Error('User not found')
				}
			} catch (e) {
				res.status(401)
				res.json({ error: 'Not Authorized' })
				return
			}

			return handler (req, res, user)
		}
			
		res.status(401).send('Unauthorized')
		return
	}
}