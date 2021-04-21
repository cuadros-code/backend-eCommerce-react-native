const { Schema, model } = require('mongoose')

const OrderItemSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    default: 0
  }

}, {
  versionKey: false,
  timestamps: true,
})

OrderItemSchema.method('toJSON', function () {
  const { _id, ...object } = this.toObject()
  return {
    id: _id,
    ...object
  }
})

module.exports = model('OrderItem', OrderItemSchema)