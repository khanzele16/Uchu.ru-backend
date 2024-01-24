import Post from '../Models/Post.js'

export async function getAll(req, res) {
	try {
		const posts = await Post.find().sort({ createdAt: -1 })
		if (posts.length == 0) {
			return res.status(500).json({
				message: 'Постов не было найдено',
			})
		}
		return res.json(posts)
	} catch (err) {
		console.log(err)
		return res.status(500).json({
			message: 'Не удалось получить посты',
		})
	}
}

export async function getOne(req, res) {
	try {
		const { id } = req.params
		const post = await Post.findById(id)
		if (!post) {
			return res.status(400).json({
				message: 'Пост не был найден',
			})
		}
		return res.json(post)
	} catch (err) {
		console.log(err)
		return res.status(500).json({
			message: 'Не удалось получить пост',
		})
	}
}

export async function createOne(req, res) {
	try {
		const { title, imageUrl, text } = req.body
		const post = new Post({
			title,
			imageUrl,
			text,
		})
		await post.save()
		return res.json({
			message: 'Пост успешно создан',
		})
	} catch (err) {
		console.log(err)
		return res.status(500).json({
			message: 'Не удалось создать посты',
		})
	}
}

export async function deleteOne(req, res) {
	try {
		const { id } = req.params
		await Post.deleteOne({ _id: id })
		return res.json({
			message: 'Пост успешно удален',
		})
	} catch (err) {
		console.log(err)
		return res.status(500).json({
			message: 'Не удалось удалить пост',
		})
	}
}

export async function deleteAll(req, res) {
	try {
		await Post.deleteMany()
		return res.json({
			message: 'Посты успешно удалены',
		})
	} catch (err) {
		console.log(err)
		return res.status(500).json({
			message: 'Не удалось удалить посты',
		})
	}
}
