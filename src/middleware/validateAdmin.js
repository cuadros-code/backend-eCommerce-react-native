
const { request, response } = require('express');
const jwt = require('jsonwebtoken')

const validateAdmin = (req = request, res = response, next) => {
  try {

    const token = req.headers.authorization.split(' ')[1]
    const verify = jwt.verify(token, process.env.SECRET_KEY)
    const { isAdmin } = verify.payload
    if (!isAdmin) {
      return res.status(401).json({
        ok: false,
        msg: 'Solo el administrador tiene permisos'
      })
    }
    next()

  } catch (error) {
    res.status(401).json({
      ok: false,
      msg: 'No posee permisos para realizar la acción'
    })
  }

}

module.exports = validateAdmin
