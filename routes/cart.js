const express = require('express')
const Router = express.Router()
const cart = require('../controllers/cart')

Router.get('/clear', cart.clear)

module.exports = Router 