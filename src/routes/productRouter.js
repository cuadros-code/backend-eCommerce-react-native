const express = require('express')
const router = express.Router()
const {
  createProduct,
  getAllProducts,
  getProductById } = require('../controllers/productController')

router.get(`/`, getAllProducts)
router.get(`/:id`, getProductById)
router.post(`/`, createProduct)


module.exports = router