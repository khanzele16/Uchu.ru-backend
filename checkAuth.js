import jwt from 'jsonwebtoken'

export default (req, res, next) => {
	const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')
	if (token) {
		try {
			const decoded = jwt.verify(token, 'secret160307')
			req.userId = decoded._id
			next()
		} catch (err) {
			console.log(err)
			return res.status(400).json({
				message: 'Нет доступа',
			})
		}
	}
}
