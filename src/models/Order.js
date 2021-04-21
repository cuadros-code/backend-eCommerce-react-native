const { Schema, model } = require('mongoose')

const OrderSchema = new Schema({
  shippingAddress1: {
    type: String,
    required: true,
  },
  shippingAddress2: {
    type: String,
  },
  orderItems: [{
    type: Schema.Types.ObjectId,
    ref: 'OrderItem',
    required: true,
  }],
  city: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: 'Pending'
  },
  totalPrice: {
    type: Number,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  dateOrdered: {
    type: Date,
    default: Date.now
  },

}, {
  versionKey: false,
  timestamps: true,
})

OrderSchema.method('toJSON', function () {
  const { _id, ...object } = this.toObject()
  return {
    id: _id,
    ...object
  }
})

module.exports = model('Order', OrderSchema)