const { request, response } = require('express')
const Product = require('../models/Product')
const Category = require('../models/Category')

const getAllProducts = async (req = request, res = response) => {
  try {

    let filter

    if (req?.query?.categories) {
      filter = { category: req?.query?.categories.split(',') }
    }

    const products = await Product
      .find(filter)
      .select('name description image category _id')
      .populate('category')

    if (!products) {
      return res.status(404).json({
        ok: false,
        msg: 'No hay productos disponibles'
      })
    }

    res.status(200).json({
      ok: true,
      products
    })

  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: 'Error al crear el producto'
    })
  }
}

const countProducts = async (req, res = response) => {
  try {
    const productCount = await Product.countDocuments()
    res.status(200).json({
      ok: true,
      numberProducts: productCount
    })
  } catch (error) {
    res.status(404).json({
      ok: false,
      msg: 'Error al contar los productos'
    })
  }
}

const productFeatured = async (req, res = response) => {
  try {
    const count = req?.params?.count || 0

    const product = await Product
      .find({ isFeatured: true })
      .limit(Number(count))

    res.status(200).json({
      ok: true,
      product
    })
  } catch (error) {
    res.status(404).json({
      ok: false,
      msg: 'Error al obtener los productos'
    })
  }
}

const getProductById = async (req = request, res = response) => {
  try {
    const id = req?.params?.id
    // 'filter data od populate'
    // const product = await Product.findById(id).populate({ path: 'category', select: 'name' })
    const product = await Product.findById(id).populate('category')
    if (!product) {
      return res.status(404).json({
        ok: false,
        msg: 'El producto no esta registrado'
      })
    }

    res.status(200).json({
      ok: true,
      product
    })

  } catch (error) {
    res.status(404).json({
      ok: false,
      msg: 'Error al obtener producto'
    })
  }
}

const createProduct = async (req = request, res = response) => {
  try {
    const data = req?.body

    const file = req.file
    if (!file) {
      return res.status(400).json({
        ok: false,
        msg: 'La Imagen es requerida'
      })
    }

    const fileName = req.file.filename
    const basePath = `${req.protocol}://${req.get('host')}/src/public/files`

    const category = await Category.findById(req.body.category)
    if (!category) {
      return res.status(400).json({
        ok: false,
        msg: 'Categoria invalida'
      })
    }

    const product = new Product(data)
    product.image = `${basePath}${fileName}`
    const newProduct = await product.save()
    if (!newProduct) {
      return res.status(404).json({
        ok: false,
        msg: 'El producto no puede ser creado'
      })
    }

    res.status(201).json({
      ok: true,
      product: newProduct
    })

  } catch (error) {
    res.status(404).json({
      ok: false,
      msg: 'Error la crear producto'
    })
  }
}

const updateProduct = async (req = request, res = response) => {
  try {
    const id = req.params.id
    const category = await Category.findById(req.body.category)
    if (!category) {
      return res.status(400).json({
        ok: false,
        msg: 'Categoria invalida'
      })
    }

    const productUpdated = await Product.findByIdAndUpdate(id, req?.body, { new: true })
    if (!productUpdated) {
      return res.status(404).json({
        ok: false,
        msg: 'El producto no pudo ser actualizado'
      })
    }

    res.status(200).json({
      ok: true,
      product: productUpdated
    })

  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: 'Error al actualizar el producto'
    })
  }
}

const deleteProduct = async (req = request, res = response) => {
  try {
    const id = req?.params?.id
    if (!id) {
      return res.status(404).json({
        ok: false,
        msg: 'El producto no fue encontrado'
      })
    }
    const deleteProduct = await Product.findByIdAndRemove(id).select('_id')
    if (!deleteProduct) {
      return res.status(404).json({
        ok: false,
        msg: 'El producto no pudo ser eliminado'
      })
    }

    res.status(200).json({
      ok: true,
      product: deleteProduct
    })

  } catch (error) {
    res.status(404).json({
      ok: false,
      msg: 'Error al eliminar el producto'
    })
  }
}


module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  countProducts,
  productFeatured
}