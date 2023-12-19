// Import necessary modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const UserModel = require("./models/User");
const FileModel = require("./models/File");
const FolderForDb = require("./models/FolderForDb");

const app = express();
app.use(express.json());

app.use(cors());
mongoose.connect("mongodb://127.0.0.1:27017/GoogleDriveDB");

let globalUserID = "";

// Set up Multer storage for file uploads
const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage: storage });

// Assuming you have a route to delete a file by ID
app.delete("/deleteFile/:id", async (req, res) => {
  const fileId = req.params.id;

  try {
    // Find the file by ID
    const existingFile = await FileModel.findById(fileId);

    if (!existingFile) {
      return res.status(404).json({ error: "File not found" });
    }

    // Find the folder that contains the file
    const existingFolder = await FolderForDb.findById(existingFile.folderId);

    if (!existingFolder) {
      return res.status(404).json({ error: "Folder not found" });
    }

    // Remove the file from the folder's files array
    existingFolder.files = existingFolder.files.filter(
      (file) => file.toString() !== fileId
    );

    // Delete the file
    await FileModel.deleteOne({ _id: fileId });

    // Save the updated folder
    await existingFolder.save();

    res.json({ message: "File deleted successfully" });
  } catch (error) {
    console.error("Error deleting file:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/getFiles", async (req, res) => {
  try {
    const folderId = req.query.folderId;

    if (!folderId) {
      return res.status(400).json({ error: "Folder ID is missing" });
    }

    // Find the folder by ID
    const existingFolder = await FolderForDb.findById(folderId);

    if (!existingFolder) {
      return res.status(404).json({ error: "Folder not found" });
    }

    // Populate the files array with details from the files collection
    const populatedFiles = await FileModel.find({
      _id: { $in: existingFolder.files },
    });

    res.json(populatedFiles);
  } catch (error) {
    console.error("Error fetching files:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/getUsers", async (req, res) => {
  try {
    const users = await UserModel.find({ _id: { $ne: globalUserID } }); // Exclude the user with the globalUserID
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/uploadFile", upload.single("file"), async (req, res) => {
  try {
    const { originalname, mimetype, buffer } = req.file;

    // Assuming you have a folder ID in the request body
    const { folderId } = req.body;

    if (!folderId) {
      return res.status(400).json({ error: "Folder ID is missing" });
    }

    // Check if the folder exists
    const existingFolder = await FolderForDb.findById(folderId);
    if (!existingFolder) {
      return res.status(404).json({ error: "Folder not found" });
    }

    // Check if a file with the same name already exists in the folder
    const existingFileInFolder = await FileModel.findOne({
      name: originalname,
      folderId: folderId,
    });

    if (existingFileInFolder) {
      return res
        .status(400)
        .json({ message: "File with this name already exists in the folder" });
    }

    // Create a new file document
    const newFile = new FileModel({
      name: originalname,
      type: mimetype,
      data: buffer,
      owner: globalUserID,
      folderId: folderId,
    });

    // Save the file to the database
    await newFile.save();
    existingFolder.files.push(newFile);
    await existingFolder.save();
    res.status(200).json({ message: "File uploaded successfully" });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/deleteFolder/:id", async (req, res) => {
  const folderId = req.params.id;

  try {
    const existingFolder = await FolderForDb.findById(folderId);

    if (!existingFolder) {
      return res.status(404).json({ error: "Folder not found" });
    }

    const fileIds = existingFolder.files;

    for (const fileId of fileIds) {
      await FileModel.deleteOne({ _id: fileId });
    }

    await FolderForDb.deleteOne({ _id: folderId });

    res.json({ message: "Folder and associated files deleted successfully" });
  } catch (error) {
    console.error("Error deleting folder:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/addFolder", async (req, res) => {
  try {
    const { folderName } = req.body;
    const userId = globalUserID;

    if (!folderName || !userId) {
      return res.status(400).json({ error: userId });
    }

    const existingUser = await UserModel.findById(userId);
    if (!existingUser) {
      return res.status(400).json({ error: "User not found" });
    }

    const existingFolder = await FolderForDb.findOne({ name: folderName });
    if (existingFolder) {
      return res
        .status(400)
        .json({ error: "Folder with this name already exists for the user" });
    }

    const newFolder = await FolderForDb.create({
      name: folderName,
      owner: userId,
    });

    res.json({ message: "Folder added successfully", folder: newFolder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/getFolders", async (req, res) => {
  try {
    const folders = await FolderForDb.find({ owner: globalUserID });

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
      globalUserID = user._id;
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
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      res.json("User with this email already exists");
    } else {
      const newUser = await UserModel.create(req.body);
      res.json(newUser);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/shareFolder", async (req, res) => {
  try {
    const { folderId, userEmail } = req.body;

    if (!folderId || !userEmail) {
      return res
        .status(400)
        .json({ error: "Folder ID or user email is missing" });
    }

    const folder = await FolderForDb.findById(folderId);

    if (!folder) {
      return res.status(404).json({ error: "Folder not found" });
    }

    const user = await UserModel.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.sharedFolders.includes(folderId)) {
      return res
        .status(400)
        .json({ error: "Folder already shared with the user" });
    }

    user.sharedFolders.push(folderId);

    await user.save();

    res.status(200).json({ message: "Folder shared with user successfully" });
  } catch (error) {
    console.error("Error sharing folder:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/getSharedFolders", async (req, res) => {
  try {
    if (!globalUserID) {
      return res
        .status(400)
        .json({ error: "User ID is missing in the request" });
    }

    // Fetch shared folders based on the user ID
    const user = await UserModel.findById(globalUserID);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const sharedFolders = await FolderForDb.find({
      _id: { $in: user.sharedFolders },
    });

    // Populate each shared folder with details from the files collection
    const populatedFolders = await Promise.all(
      sharedFolders.map(async (folder) => {
        const populatedFiles = await FileModel.find({
          _id: { $in: folder.files },
        });
        return {
          folderId: folder._id,
          folderName: folder.name,
          files: populatedFiles,
        };
      })
    );

    res.json(populatedFolders);
  } catch (error) {
    console.error("Error fetching shared folders:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/getSharedFoldersOfUserByEmail", async (req, res) => {
  const { userEmail } = req.body;
  try {
    if (!globalUserID) {
      return res
        .status(400)
        .json({ error: "User ID is missing in the request" });
    }

    // Fetch shared folders based on the user ID
    const user = await UserModel.find(userEmail);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const sharedFolders = await FolderForDb.find({
      _id: { $in: user.sharedFolders },
    });

    // Populate each shared folder with details from the files collection
    const populatedFolders = await Promise.all(
      sharedFolders.map(async (folder) => {
        const populatedFiles = await FileModel.find({
          _id: { $in: folder.files },
        });
        return {
          folderId: folder._id,
          folderName: folder.name,
          files: populatedFiles,
        };
      })
    );

    res.json(populatedFolders);
  } catch (error) {
    console.error("Error fetching shared folders:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(3001, () => {
  console.log("Server Is Running");
});
