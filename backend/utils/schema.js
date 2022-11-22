const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({ 
    googleId: String,
    imageUrl: String,
    email: String,
    name: String,
    givenName: String,
    familyName: String,
});

const Users = mongoose.model('User', userSchema);

module.exports = Users;