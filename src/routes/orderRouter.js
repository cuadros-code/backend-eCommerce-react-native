const express = require('express')
const router = express.Router()
const authValidate = require('../middleware/authValidate')
const {
  getOrders,
  createOrder,
  getOrderById,
  updateStatusOrder,
  deleteOrder,
  getTotalSales,
  getOrdersByUser } = require('../controllers/orderController')

router.use(authValidate)

router.get(`/`, getOrders)
router.post(`/`, createOrder)
router.get(`/:id`, getOrderById)
router.delete(`/:id`, deleteOrder)
router.put(`/:id`, updateStatusOrder)
router.get(`/totalsales`, getTotalSales)
router.get(`/userorders/:userid`, getOrdersByUser)


module.exports = router