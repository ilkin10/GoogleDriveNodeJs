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

app.post('/addFolder', (req, res) => {
  const { folderName, userId } = req.body;

  try {
    if (folderName && folderName.trim() !== "" && userId) {
      // Check if the user exists
      const user = UserModel.findById(userId);
      if (!user) {
        return res.status(404).json({ success: false, error: 'User not found' });
      }

      // Create a new folder using the Mongoose model
      const newFolder = FolderForDb.create({
        name: folderName,
        owner: userId,
      });

      res.status(201).json({ success: true, folder: newFolder });
    } else {
      res.status(400).json({ success: false, error: 'Invalid folder name or user ID' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});


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
