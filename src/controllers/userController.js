const { request, response } = require('express')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const createUser = async (req = request, res = response) => {
  try {

    const { email, password } = req.body

    const validateEmail = await User.findOne({ email })
    if (validateEmail) {
      return res.status(400).json({
        ok: false,
        msg: 'El correo ya pertenece a una cuenta existente'
      })
    }

    const user = new User(req?.body)

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt)
    await user.save()

    res.status(201).json({
      ok: true,
      user
    })

  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: 'Error en registro'
    })
  }
}

const countUsers = async (req, res = response) => {
  try {

    const userCount = await User.countDocuments()

    res.json({
      ok: true,
      numberUsers: userCount
    })

  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: 'Error al obtener usuarios'
    })
  }
}

const getUsers = async (req, res = response) => {
  try {

    const users = await User
      .find()
      .select('id name email phone')

    const numberOfUsers = await User.countDocuments()
    if (!users) {
      return res.status(404).json({
        ok: false,
        msg: 'No hay usuarios registrados'
      })
    }

    res.status(200).json({
      ok: true,
      totalUsers: numberOfUsers,
      users,
    })

  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: 'Error al obtener usuarios'
    })
  }
}

const getUserById = async (req, res = response) => {
  try {

    const users = await User
      .findById(req.params.id)
      .select('id name email phone')

    const numberOfUsers = await User.countDocuments()
    if (!users) {
      return res.status(404).json({
        ok: false,
        msg: 'No hay usuarios registrados'
      })
    }

    res.status(200).json({
      ok: true,
      totalUsers: numberOfUsers,
      users,
    })

  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: 'Error al obtener usuarios'
    })
  }
}

const loginUser = async (req = request, res = response) => {
  try {
    const { email, password } = req?.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: 'El usuario no se encuentra registrado'
      })
    }

    const validatePassword = await bcrypt.compare(password, user.password)
    if (!validatePassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Contraseña incorrecta'
      })
    }

    const payload = {
      user_id: user.id,
      user_name: user.name,
      isAdmin: user.isAdmin
    }

    const token = jwt.sign(
      { payload },
      process.env.SECRET_KEY,
      { expiresIn: '2d' }
    )

    res.status(200).json({
      ok: true,
      token
    })

  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: 'Error al iniciar sesión'
    })
  }
}

const deleteUser = async (req = request, res = response) => {
  try {

    const idUser = req?.params?.id

    const user = await User.findByIdAndDelete(idUser)

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: 'El usuario no existe'
      })
    }

    res.json({
      ok: true,
      user: user.id
    })
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: 'Error al eliminar usuario'
    })
  }
}





module.exports = {
  createUser,
  getUsers,
  getUserById,
  loginUser,
  countUsers,
  deleteUser,
}
