import mongoose from 'mongoose';

const DocumentSchema = new mongoose.Schema({
  fileName: { 
    type: String, 
    required: true 
  },
  fileHash: { 
    type: String, 
    required: true, 
    unique: true // Setiap hash dokumen harus unik
  },
  transactionHash: { 
    type: String, 
    required: true, 
    unique: true // Setiap transaksi harus unik
  },
  uploaderEmail: { 
    type: String, 
    required: true, 
    index: true // 'index' untuk mempercepat query pencarian riwayat
  },
  uploaderAddress: { 
    type: String, 
    required: true, 
    index: true 
  },
  timestamp: { 
    type: Date, 
    default: Date.now // Timestamp otomatis saat data dibuat
  },
  uploaderName: { 
    type: String, 
    required: true },
});

export default mongoose.models.Document || mongoose.model('Document', DocumentSchema);