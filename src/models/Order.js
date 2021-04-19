const { Schema, model } = require('mongoose')

const OrderSchema = new Schema({
  name: {
    type: String,
    required: true,
  }
}, {
  versionKey: false,
  timestamps: true,
})

module.exports = model('Order', OrderSchema)