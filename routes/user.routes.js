const express = require('express')
const userRoutes = express.Router();
const { AddUser, ViewUser, ViewSingleUser, UpdateUser, DeleteUser } = require('../controller/user.controller')
const { Register, Login } = require('../controller/admin.controller')
const { jwtToken } = require('../middleware/jwt')

userRoutes.post('/user', jwtToken, AddUser)
userRoutes.get('/user', jwtToken, ViewUser)
userRoutes.get('/user/:id', jwtToken, ViewSingleUser)
userRoutes.patch('/user/:id', jwtToken, UpdateUser)
userRoutes.delete('/user/:id', jwtToken, DeleteUser)


userRoutes.post('/admin', Register)
userRoutes.post('/admin-login', Login)


module.exports = userRoutes;