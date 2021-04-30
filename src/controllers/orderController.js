const { request, response } = require('express')
const Order = require('../models/Order')
const OrderItem = require('../models/OrderItem')
const User = require('../models/User')

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

    const totalPrice = await Promise.all(
      ordersItemsResolved.map(async (orderId) => {
        const orderItem = await OrderItem.findById(orderId).populate('product', 'price')
        const totalPrice = orderItem.product.price * orderItem.quantity
        return totalPrice
      })
    )

    const sumTotalPrice = totalPrice.reduce((acc, el) => acc + el, 0)

    const order = new Order(req.body)
    order.orderItems = ordersItemsResolved
    order.totalPrice = sumTotalPrice
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

const getOrders = async (req, res = response) => {
  try {
    const orderList = await Order.find()
      .populate('user', 'name email phone, _id, isAdmin')
      .populate('orderItems')
      .sort({ 'dateOrdered': -1 })

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

const getOrderById = async (req = request, res = response) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email phone _id isAdmin')
      .populate({
        path: 'orderItems',
        populate: {
          path: 'product',
          populate: 'category'
        }
      })

    if (!order) {
      return res.status(404).json({
        ok: false,
        msg: 'No orden no esta registrada'
      })
    }

    res.json({
      ok: true,
      order
    })

  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: 'Error al consultar ordenes',
      error
    })
  }
}

const updateStatusOrder = async (req = request, res = response) => {
  try {

    const newOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true })

    if (!newOrder) {
      return res.status(404).json({
        ok: false,
        msg: 'El producto no existe'
      })
    }

    res.json({
      ok: true,
      newOrder
    })

  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: 'Error actualizar estado del pedido',
      error
    })
  }
}

const deleteOrder = async (req = request, res = response) => {
  try {


    const newOrder = await Order.findByIdAndDelete(req.params.id)

    if (!newOrder) {
      return res.status(404).json({
        ok: false,
        msg: 'El producto ya fue eliminado'
      })
    }

    const { orderItems } = newOrder

    await Promise.all(orderItems.map(async (item) => {
      await OrderItem.findByIdAndRemove(item)
    }))

    res.json({
      ok: true,
      newOrder
    })

  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: 'Error actualizar estado del pedido',
      error
    })
  }
}

const getTotalSales = async (req, res = response) => {
  try {
    const totalSales = await Order.aggregate([
      { $group: { _id: null, totalsales: { $sum: '$totalPrice' } } }
    ])


    if (!totalSales) {
      return res.status(404).json({
        ok: false,
        msg: 'Noy hay ventas registradas'
      })
    }

    res.json({
      ok: true,
      totalSales: totalSales.pop().totalsales
    })

  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: 'Error al consultar ordenes',
      error
    })
  }
}

module.exports = {
  getOrders,
  createOrder,
  deleteOrder,
  getOrderById,
  updateStatusOrder,
  getTotalSales,
}