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

UserSchema.method('toJSON', function () {
  const { _id, ...object } = this.toObject()
  return {
    id: _id,
    ...object
  }
})

module.exports = model('User', UserSchema)