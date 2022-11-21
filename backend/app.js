const express = require('express');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()
const connect = require('./utils/mongoose')
const Users = require('./utils/schema')

connect();

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(cors())

app.get('/api/hello', (req, res) => {
    Users.create({id: "1", name: "Nastaran", email:"n@gmail.com"})
    res.json('Hello :)')
})

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
