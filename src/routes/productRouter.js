const express = require('express')
const router = express.Router()
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  countProducts,
  productFeatured } = require('../controllers/productController')

router.get(`/`, getAllProducts)
router.get(`/get/count`, countProducts)
router.get(`/get/featured/:count`, productFeatured)
router.get(`/:id`, getProductById)
router.post(`/`, createProduct)
router.put(`/:id`, updateProduct)
router.delete(`/:id`, deleteProduct)


module.exports = router