const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const UserModel = require("./models/User");
const FileModel = require("./models/File");
const FolderForDb = require("./models/FolderForDb");

const app = express();
app.use(express.json());

app.use(cors());
mongoose.connect("mongodb://127.0.0.1:27017/GoogleDriveDB");

let globalUserID = "";

app.post("/addFolder", async (req, res) => {
  try {
    const { folderName } = req.body;
    const userId = globalUserID; // Assuming you have session middleware

    // Validate if the folder name and userId are provided
    if (!folderName || !userId) {
      return res.status(400).json({ error: userId });
    }

    // Check if the user with the given userId exists
    const existingUser = await UserModel.findById(userId);
    if (!existingUser) {
      return res.status(400).json({ error: "User not found" });
    }

    // Check if the folder with the same name and userId already exists
    const existingFolder = await FolderForDb.findOne({ name: folderName});
    if (existingFolder) {
      return res.status(400).json({ error: "Folder with this name already exists for the user" });
    }

    // Create a new folder
    const newFolder = await FolderForDb.create({ name: folderName, owner: userId });

    // Respond with success message or any other relevant information
    res.json({ message: "Folder added successfully", folder: newFolder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// New route to get all folders
app.get("/getFolders", async (req, res) => {
  try {
    // Retrieve all folders from the database
    const folders = await FolderForDb.find({owner:globalUserID});

    // Respond with the list of folders
    res.json(folders);
  } catch (error) {
    console.error("Error fetching folders:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.post("/login", (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email }).then((user) => {
    if (user) {
      globalUserID = user._id; // Store user ID in the sessio
      if (user.password === password) {
        res.json("Success");
      } else {
        res.json("The Password Is Incorrect");
      }
    } else {
      res.json("No Record Existed");
    }
  });
});

app.post("/signup", async (req, res) => {
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
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(3001, () => {
  console.log("Server Is Running");
});
