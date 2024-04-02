const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const app = express()
const port = 5000

app.use(cors({
    origin: 'http://localhost:3000'
  }))
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/auth', require('./routers/user'))
app.use('/products', require('./routers/product'))
app.use('/img_product', express.static('public/uploads/product'))

app.listen(port, () => {
  console.log(`Server Port: ${port}`)
})