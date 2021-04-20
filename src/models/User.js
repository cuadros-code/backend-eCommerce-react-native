const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    default: ''
  },
  apartment: {
    type: String,
    default: ''
  },
  city: {
    type: String,
    default: ''
  },
  zip: {
    type: String,
    default: ''
  },
  country: {
    type: String,
    default: ''
  },
  phone: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
}, {
  versionKey: false,
  timestamps: true,
})

UserSchema.method('toJSON', function () {
  const { _id, password, ...object } = this.toObject()
  return {
    id: _id,
    ...object
  }
})

module.exports = model('User', UserSchema)