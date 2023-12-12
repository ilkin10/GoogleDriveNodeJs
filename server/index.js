const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const UserModel = require('./models/User')
const FileModel = require('./models/File')
const FolderForDb = require('./models/FolderForDb')


const app = express()
app.use(express.json())

app.use(cors())


mongoose.connect("mongodb://127.0.0.1:27017/GoogleDriveDB")


app.post('/login',(req,res) =>{
    const {email,password} = req.body;
    UserModel.findOne({email:email})
    .then(user => {
        if(user){
            if(user.password === password){
                res.json("Success")
            }
            else{
                res.json("The Password Is Incorrect")
            }
        }
        else{
            res.json("No Record Existed")
        }
    })
})


app.post('/signup', async (req, res) => {
    const { email } = req.body;
  
    try {
      // Check if the user already exists
      const existingUser = await UserModel.findOne({ email });
  
      if (existingUser) {
        res.json("User with this email already exists");
      } else {
        // If the user doesn't exist, create a new user
        const newUser = await UserModel.create(req.body);
        res.json(newUser);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

app.listen(3001,()=>{
    console.log("Server Is Running")
})
