import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../Models/User.js'

export async function getUsers(req, res) {
	try {
		const users = await User.find()
		if (users.length == 0) {
			return res.status(400).json({
				message: 'Пользователей нет',
			})
		}
		return res.json(users)
	} catch (err) {
		console.log(err)
		return res.status(500).json({
			message: 'Не удалось получить пользователей',
		})
	}
}

export async function login(req, res) {
	try {
		const { email, password } = req.body
		const user = await User.findOne({ email })
		if (!user) {
			return res.status(400).json({
				message: 'Неверный пароль или почта',
			})
		}
		const isValidPass = await bcrypt.compare(password, user.passwordHash)
		if (!isValidPass) {
			return res.status(400).json({
				message: 'Неверный пароль или почта',
			})
		}
		const token = jwt.sign(
			{
				_id: user._id,
			},
			'secret160307',
			{
				expiresIn: '30d',
			}
		)
		const { passwordHash, ...userData } = user
		return res.json({ ...userData, token })
	} catch (err) {
		console.log(err)
		return res.status(500).json({
			message: 'Не удалось авторизоваться',
		})
	}
}

export async function update(req, res) {
	try {
		const { email, about } = req.body
		const user = await User.findOne({ email })
		if (!user) {
			return res.status(400).json({
				message: 'Не удалось найти пользователя',
			})
		}
		if (!req.body.password) {
			await user.updateOne({
				about,
			})
		} else {
			const salt = await bcrypt.genSalt(10)
			const hash = await bcrypt.hash(req.body.password, salt)
			await user.updateOne({
				passwordHash: hash,
				about,
			})
		}
		return res.json({
			message: 'Пользователь обновлён',
		})
	} catch (err) {
		console.log(err)
		return res.status(500).json({
			message: 'Не удалось обновить пользователя',
		})
	}
}

export async function register(req, res) {
	try {
		const email = req.body.email
		const condidate = await User.findOne({ email })
		if (condidate) {
			return res.status(400).json({
				message: 'Пользователь с данной почтой уже существует',
			})
		}
		const salt = await bcrypt.genSalt(10)
		const hash = await bcrypt.hash(req.body.password, salt)
		const user = new User({
			fio: req.body.fio,
			email: req.body.email,
			passwordHash: hash,
			status: req.body.status,
			about: req.body.about,
			gender: req.body.gender,
		})
		await user.save()
		const token = jwt.sign(
			{
				_id: user._id,
			},
			'secret160307',
			{
				expiresIn: '30d',
			}
		)
		const { passwordHash, ...userData } = user
		return res.json({
			...userData,
			token,
		})
	} catch (err) {
		console.log(err)
		return res.status(500).json({
			message: 'Не удалось зарегистрироваться',
		})
	}
}

export async function deleteUsers(req, res) {
	try {
		await User.deleteMany()
		return res.json({
			message: 'Пользователи успешно удалены',
		})
	} catch (err) {
		return res.status.json({
			message: 'Не удалось удалить пользователей',
		})
	}
}

export async function authMe(req, res) {
	try {
		const user = await User.findById(req.userId)
		if (!user) {
			return res.status(404).json({
				message: 'Пользователь не найден',
			})
		}
		const { passwordHash, ...userData } = user
		return res.json(userData)
	} catch (err) {
		return res.status(500).json({
			message: 'Нет доступа',
		})
	}
}
