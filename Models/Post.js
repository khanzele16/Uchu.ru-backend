import { model, Schema } from 'mongoose'

const Post = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		imageUrl: {
			type: String,
			default: 'https://i.ibb.co/tZHxycN/image.jpg',
		},
		text: String,
	},
	{
		timestamps: true,
	}
)

export default model('Post', Post)
