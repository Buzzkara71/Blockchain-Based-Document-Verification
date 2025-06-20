import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
  },
  ethAddress: {
    type: String,
    unique: true,
    // 'sparse: true' penting agar constraint 'unique' hanya berlaku
    // untuk dokumen yang memiliki field ini. Ini memungkinkan banyak user
    // tanpa ethAddress, tetapi hanya satu untuk setiap ethAddress yang ada.
    sparse: true, 
  },
});

// Mencegah model di-compile ulang pada setiap hot-reload di environment development
export default mongoose.models.User || mongoose.model('User', UserSchema);