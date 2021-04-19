const { request, response } = require('express')
const Product = require('../models/Product')
const Category = require('../models/Category')

const getAllProducts = async (req, res = response) => {
  try {
    const products = await Product.find().select('name description image -_id')
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

const getProductById = async (req = request, res = response) => {
  try {
    const id = req?.params?.id

    const product = await Product.findById(id)
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

    const category = await Category.findById(req.body.category)
    if (!category) {
      return res.status(400).json({
        ok: false,
        msg: 'Categoria invalida'
      })
    }

    const product = new Product(data)
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

module.exports = {
  createProduct,
  getAllProducts,
  getProductById
}