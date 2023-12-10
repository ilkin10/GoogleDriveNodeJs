const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    fullname:String,
    email:String,
    password:String,
    pathArray: [{ type: String }],
    sharedPathArray: [{ type: String }]
})


const UserModel = mongoose.model("Users",UserSchema)

module.exports = UserModel