const { Schema, model } = require('mongoose')

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
  },
  icon: {
    type: String,
  },
}, {
  versionKey: false,
  timestamps: true,
})

module.exports = model('Category', CategorySchema)