const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    fullname:String,
    email:String,
    password:String
})


const UserModel = mongoose.model("Users",UserSchema)

module.exports = UserModel