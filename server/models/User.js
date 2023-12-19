const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    fullname:String,
    email:String,
    password:String,
    sharedFolders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FolderForDb' }], 
})


const UserModel = mongoose.model("Users",UserSchema)

module.exports = UserModel