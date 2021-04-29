const express = require('express')
const router = express.Router()
const authValidate = require('../middleware/authValidate')
const { getOrders, createOrder } = require('../controllers/orderController')

router.use(authValidate)
router.get(`/`, getOrders)
router.post(`/`, createOrder)


module.exports = router