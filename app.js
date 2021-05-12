const express = require('express')
const cors = require('cors')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
require('dotenv/config')

const api = process.env.API_URL

app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))
app.use('/src/public/files', express.static(__dirname + '/src/public/files'))


app.use(`${api}/users`, require('./src/routes/userRouter'))
app.use(`${api}/orders`, require('./src/routes/orderRouter'))
app.use(`${api}/products`, require('./src/routes/productRouter'))
app.use(`${api}/categories`, require('./src/routes/categoryRouter'))

mongoose.connect(process.env.CONNECTION_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
})
  .then(() => console.log('db is ok'))
  .catch((err) => console.log('error in DB', err))



app.listen(4000, () => {
  console.log('the serve is running');
})