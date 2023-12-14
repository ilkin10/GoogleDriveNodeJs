const mongoose = require('mongoose');

const folderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  files: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File' }], // Array of file references
},
{
  timestamps: true
});

const FolderForDb = mongoose.model('FolderForDb', folderSchema);

module.exports = FolderForDb;