const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  }
}, {
  versionKey: false,
  timestamps: true,
})

module.exports = model('User', UserSchema)