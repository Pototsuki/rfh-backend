require("dotenv").config()

const cors = require('cors')
const express = require('express');
const app = express();
const router = require('./routers/index.router')
const port = process.env.PORT || 3000;
const sequelize = require('./config/database')
const errorHandler = require('./middleware/error.middleware')

app.use(cors())

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(router)

app.get('/', (req, res) => {
  res.send('RFH Backend API!');
});

app.get('/healthcheck', (req, res) => {
  res.send(true);
});


(async () => {
  try {
    await sequelize.authenticate()
    console.log('✅ Database connected')
  } catch (err) {
    console.error('❌ Database connection failed:', err)
  }
})()


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.use(errorHandler)
module.exports = app