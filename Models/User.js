import { model, Schema } from 'mongoose'

const User = new Schema(
	{
		avatarUrl: {
			type: String,
			default: 'https://i.ibb.co/phnsrwX/avatar-Url-default.jpg',
		},
		fio: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		passwordHash: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			required: true,
		},
		gender: {
			type: String,
			required: true,
		},
		about: {
			type: String,
			default: 'Я готовлюсь на Uchu.ru. Присоединяйся!',
		},
	},
	{
		timestamps: true,
	}
)

export default model('User', User)
