const { request, response } = require('express')
const Category = require('../models/Category')

const getAllCategories = async (req = request, res = response) => {
  try {
    const categories = await Category.find()
    if (!categories) {
      return res.status(404).json({
        ok: false,
        msg: 'No hay disponible categorias'
      })
    }
    res.status(200).json({
      ok: true,
      categories
    })
  } catch (error) {
    res.status(404).json({
      ok: false,
      msg: 'Error al obtener categorias'
    })
  }
}

const getCategoryById = async (req = request, res = response) => {
  try {
    const id = req?.params?.id
    const category = await Category.findById(id)
    if (!category) {
      return res.status(404).json({
        ok: false,
        msg: 'Categoria no disponible'
      })
    }

    res.status(200).json({
      ok: true,
      category
    })

  } catch (error) {
    res.status(404).json({
      ok: false,
      msg: 'Error al obtener categoria'
    })
  }
}

const createCategory = async (req = request, res = response) => {
  try {
    const newCategory = new Category(req.body)
    const category = await newCategory.save()
    if (!category) {
      return res.status(404).json({
        ok: false,
        msg: 'La categoria no pudo ser creada'
      })
    }
    res.status(201).json({
      ok: true,
      category
    })
  } catch (error) {
    res.status(404).json({
      ok: false,
      msg: 'Error al crear categoria'
    })
  }
}

const deleteCategory = async (req = request, res = response) => {
  try {
    const id = req?.params?.id
    if (!id) {
      return res.status(404).json({
        ok: false,
        msg: 'La categoria no fue encontrada'
      })
    }
    const deleteCategory = await Category.findByIdAndRemove(id)
    if (!deleteCategory) {
      return res.status(404).json({
        ok: false,
        msg: 'La categoria no pudo ser eliminada'
      })
    }

    res.status(200).json({
      ok: true,
      category: deleteCategory
    })

  } catch (error) {
    res.status(404).json({
      ok: false,
      msg: 'Error al eliminar la categoria'
    })
  }
}

module.exports = {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById
}