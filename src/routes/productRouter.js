const express = require('express')
const multer = require('multer')
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
const validateAdmin = require('../middleware/validateAdmin')

const FILE_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg',
  'application/pdf': 'pdf'
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype]
    let uploadError = new Error('Archivo invalido')
    if (isValid) {
      uploadError = null
    }
    cb(uploadError, 'src/public/files')
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(' ').join('-')
    const extension = FILE_TYPE_MAP[file.mimetype]
    cb(null, `${fileName}-${Date.now()}.${extension}`)
  }
})

const uploadOptions = multer({ storage: storage })

router.get(`/`, getAllProducts)
router.get(`/:id`, getProductById)
router.get(`/get/count`, countProducts)
router.get(`/get/featured/:count`, productFeatured)

// valida que token sea valido
router.use(authValidate)

// valida que sea Administrador
router.use(validateAdmin)
router.post(`/`, uploadOptions.single('image'), createProduct)
router.put(`/:id`, updateProduct)
router.delete(`/:id`, deleteProduct)


module.exports = router