const { request, response } = require('express');
const jwt = require('jsonwebtoken')

const authValidate = (req = request, res = response, next) => {
  try {

    const token = req.headers.authorization.split(' ')[1]
    const verify = jwt.verify(token, process.env.SECRET_KEY)
    if (!verify) {
      return res.status(401).json({
        ok: false,
        msg: 'No posee permisos para realizar la acción'
      })
    }

    req.user = verify.payload

    next()

  } catch (error) {
    res.status(401).json({
      ok: false,
      msg: 'No posee permisos para realizar la acción'
    })
  }

}

module.exports = authValidate
