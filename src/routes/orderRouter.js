const express = require('express')
const router = express.Router()
const authValidate = require('../middleware/authValidate')
const {
  getOrders,
  createOrder,
  getOrderById,
  updateStatusOrder,
  deleteOrder,
  getTotalSales } = require('../controllers/orderController')

router.use(authValidate)

router.get(`/`, getOrders)
router.get(`/totalsales`, getTotalSales)
router.post(`/`, createOrder)
router.get(`/:id`, getOrderById)
router.delete(`/:id`, deleteOrder)
router.put(`/:id`, updateStatusOrder)


module.exports = router