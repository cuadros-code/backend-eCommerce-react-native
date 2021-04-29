const { request, response } = require('express')
const Order = require('../models/Order')
const OrderItem = require('../models/OrderItem')
const User = require('../models/User')

const getOrders = async (req, res = response) => {
  try {

    const orderList = await Order.find()
      .populate('user', 'name email phone, _id, isAdmin')
      .populate('orderItems')

    if (!orderList) {
      return res.status(404).json({
        ok: false,
        msg: 'No ordenes registradas'
      })
    }

    res.json({
      ok: true,
      orderList
    })

  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: 'Error al consultar ordenes',
      error
    })
  }
}

const createOrder = async (req = request, res = response) => {
  try {
    const { user, orderItems } = req.body

    const validateUser = await User.findById(user)
    if (!validateUser) {
      return res.status(404).json({
        ok: false,
        msg: 'El usuario no existe'
      })
    }

    const orders = Promise.all(
      orderItems.map(async (order) => {
        let newsOrders = await new OrderItem(order).save()
        return newsOrders._id
      })
    )

    const ordersItemsResolved = await orders

    const order = new Order(req.body)
    order.orderItems = ordersItemsResolved
    await order.save()

    res.json({
      ok: true,
      order
    })

  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: 'Error al crear orden',
      error
    })
  }
}

module.exports = {
  getOrders,
  createOrder
}