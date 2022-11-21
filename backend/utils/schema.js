const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({ 
    id: String,
    name: String,
    email: String, 
});

const Users = mongoose.model('User', userSchema);

module.exports = Users;