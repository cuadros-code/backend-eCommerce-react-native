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
const authValidate = require('../middleware/authValidate')

router.use(authValidate)
router.get(`/`, getAllProducts)
router.get(`/:id`, getProductById)
router.get(`/get/count`, countProducts)
router.get(`/get/featured/:count`, productFeatured)

router.post(`/`, createProduct)
router.put(`/:id`, updateProduct)
router.delete(`/:id`, deleteProduct)


module.exports = router