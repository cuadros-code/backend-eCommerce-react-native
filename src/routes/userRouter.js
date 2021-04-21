const express = require('express')
const router = express.Router()
const {
  createUser,
  getUsers,
  getUserById,
  loginUser,
  countUsers,
  deleteUser } = require('../controllers/userController')
const authValidate = require('../middleware/authValidate')
const validateAdmin = require('../middleware/validateAdmin')

router.post(`/`, createUser)
router.post(`/login`, loginUser)
router.get(`/get/count`, countUsers)

router.use(authValidate)
router.use(validateAdmin)

router.get(`/`, getUsers)
router.get(`/:id`, getUserById)
router.delete(`/:id`, deleteUser)



module.exports = router