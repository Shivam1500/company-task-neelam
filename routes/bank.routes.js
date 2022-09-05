const express = require('express')
const bankRoutes = express.Router();
const { AddBank, viewBank, UpdateBankAccount, DeleteBankAccount } = require('../controller/bank.controller')
const { jwtToken } = require('../middleware/jwt')

/*
User Id requires
*/
bankRoutes.post('/bank/:id', jwtToken, AddBank)
/*
Bank Id requires
*/
bankRoutes.get('/bank/:id', jwtToken, viewBank)
bankRoutes.patch('/bank/:id', jwtToken, UpdateBankAccount)
bankRoutes.delete('/bank/:id', jwtToken, DeleteBankAccount)



module.exports = bankRoutes;