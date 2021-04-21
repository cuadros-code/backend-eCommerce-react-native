const express = require('express')
const router = express.Router()
const {
  createUser,
  getUsers,
  getUserById,
  loginUser } = require('../controllers/userController')
const authValidate = require('../middleware/authValidate')

router.post(`/`, createUser)
router.post(`/login`, loginUser)

router.use(authValidate)
router.get(`/`, getUsers)
router.get(`/:id`, getUserById)


module.exports = router