const express = require('express')
const router = express.Router()
const {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById } = require('../controllers/categoryController')

//http://localhost:4000/api/v1/categories
router.get(`/`, getAllCategories)
router.get(`/:id`, getCategoryById)
router.post(`/`, createCategory)
router.delete(`/:id`, deleteCategory)


module.exports = router