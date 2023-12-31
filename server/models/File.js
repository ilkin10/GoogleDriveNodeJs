const mongoose = require('mongoose')
const fileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  data: { type: Buffer, required: true },
  folderId: { type: mongoose.Schema.Types.ObjectId, ref: 'FolderForDb', required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});
  
  const File = mongoose.model('File', fileSchema);
  
  module.exports = File;