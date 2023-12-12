const mongoose = require('mongoose');

const folderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const FolderForDb = mongoose.model('FolderForDb', folderSchema);

module.exports = FolderForDb;