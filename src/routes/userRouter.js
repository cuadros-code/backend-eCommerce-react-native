const express = require('express')
const router = express.Router()
const {
  createUser,
  getUsers,
  getUserById,
  loginUser } = require('../controllers/userController')

router.get(`/`, getUsers)
router.get(`/:id`, getUserById)

router.post(`/`, createUser)
router.post(`/login`, loginUser)


module.exports = router