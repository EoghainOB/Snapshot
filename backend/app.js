const express = require('express');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const connect = require('./utils/mongoose')
const Users = require('./utils/schema')
const path = require('path')
require('dotenv').config()

connect();

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json());

app.use(cors());

app.use(express.static(path.join(__dirname, '../client/build')))

app.get('/api/hello', (req, res) => {
    Users.create({id: "1", name: "Nastaran", email:"n@gmail.com"})
    res.json('Hello :)')
})

app.get('/api/users', async(req, res) => {
    const user = await Users.find()
    res.status(200).json(user)
})

app.post('/api/auth', async (req, res) => {
  await Users.create(req.body)
  res.send('Successful')
})

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
