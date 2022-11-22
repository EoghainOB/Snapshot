const express = require('express');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const connect = require('./utils/mongoose')
const {Users, Posts} = require('./utils/schema')
const cloudinary = require('./utils/cloudinary')
const path = require('path')
const fileUpload = require('express-fileupload')
const streamifier = require('streamifier');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config()

connect();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload());
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
  const posts = await Posts.find();
  res.json(posts)
})

const uploadFile = (file, id) => {
// let cloudinaryStream = cloudinary.uploader.upload_stream(
//   {
//     folder: 'SnapShot',
//     public_id: id
//   },
//   function (error, result) {
//     error ? console.log(error) : result;
//   }
// );
return new Promise((resolve, reject) => {
  let stream = cloudinary.uploader.upload_stream(
    {
      folder: 'SnapShot',
      public_id: id
    },
    (error, result) => {
      if (result) {
        resolve(result);
      } else {
        reject(error);
      }
    }
  );
  streamifier.createReadStream(file).pipe(stream);
});
}

app.post('/api/posts', async(req, res) => {
    const {file} = req.files;
    const {title, description, tags, author} = req.body;
    const location = JSON.parse(req.body.location)
    const uniqueId = uuidv4();
    const fileUpload = await uploadFile(file.data, uniqueId)
    const imageLink = fileUpload.secure_url
    const newPost = {
      id: uniqueId,
      title,
      description,
      tags: tags.split(','),
      author,
      imageLink,
      location,
  }
    Posts.create(newPost)
    res.status(200).send('successful')
})

/* 
  const result = await cloudinary.search
    .expression('resource_type:image AND folder:testing')
    .execute();
  const urls = result.resources.map(resource => {
    return resource.secure_url;
  });
  res.send(urls);
*/

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
