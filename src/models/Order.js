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

OrderSchema.method('toJSON', function () {
  const { _id, ...object } = this.toObject()
  return {
    id: _id,
    ...object
  }
})

module.exports = model('Order', OrderSchema)