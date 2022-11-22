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

app.get('/api/users/:id', async(req, res) => {
  // user.length ? console.log('User found') : console.log('User NOT found')
  // const user = await Users.find()
  // res.status(200).json(user)
})


app.get('/api/posts', async(req, res) => {
    // const user = await Users.find()
    res.status(200)
})

app.post('/api/users', async (req, res) => {
  const {googleId} = req.body;
  const user = await Users.find({ googleId })
  if (user.length) {
    console.log('user found')
    return res.json(user);
  }
  await Users.create(req.body);
  console.log('user created')
  const newUser = await Users.find({ googleId })
  return res.json(newUser);
})

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
