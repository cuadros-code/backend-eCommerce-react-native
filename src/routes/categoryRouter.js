const express = require('express')
const router = express.Router()
const {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory } = require('../controllers/categoryController')
const authValidate = require('../middleware/authValidate')

//http://localhost:4000/api/v1/categories
router.get(`/`, getAllCategories)
router.get(`/:id`, getCategoryById)

router.use(authValidate)
router.post(`/`, createCategory)
router.put(`/:id`, updateCategory)
router.delete(`/:id`, deleteCategory)


module.exports = router