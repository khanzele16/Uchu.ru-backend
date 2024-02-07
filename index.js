import express from 'express'
import mongoose from 'mongoose'
import {
	createOne,
	deleteOne,
	getAll,
	getOne,
	deleteAll,
} from './Controllers/postController.js'
import {
	getUsers,
	deleteUsers,
	register,
	login,
	authMe,
	update,
	setExercise,
	getResults,
	getResult,
} from './Controllers/authController.js'
import cors from 'cors'
import checkAuth from './checkAuth.js'

mongoose
	.connect(
		'mongodb+srv://test:Edeal323123@datacluster.nwr2jho.mongodb.net/?retryWrites=true&w=majority'
	)
	.then(() => console.log('Mongo is OK'))
	.catch(err => console.log('Mongo is BAD', err))

const app = express()
// Configurations
app.use(express.json())
app.use(cors())
//ResultController
app.get('/result', checkAuth, getResults)
app.get('/result/:id', checkAuth, getResult)
app.post('/result', checkAuth, setExercise)
// PostController
app.get('/posts', getAll)
app.get('/posts/:id', getOne)
app.post('/posts', createOne)
app.delete('/posts/:id', deleteOne)
// AuthController
app.post('/auth/login', login)
app.post('/auth/update', update)
app.post('/auth/register', register)
app.get('/auth/me', checkAuth, authMe)
//Admin Panel (auth)
app.get('/admin/users', getUsers)
app.get('/admin/users/delete', deleteUsers)
//Admin Panel (post)
app.get('/admin/posts/delete', deleteAll)

app.listen(process.env.port || 4444, err => {
	if (err) {
		return console.log(err)
	}
	return console.log('Server is OK')
})
