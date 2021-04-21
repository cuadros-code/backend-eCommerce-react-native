const express = require('express')
const router = express.Router()
const authValidate = require('../middleware/authValidate')

router.use(authValidate)
router.get(`/`,)
router.post(`/`,)


module.exports = router