import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {};

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  // Dalam mode development, gunakan variabel global agar nilai
  // tidak hilang saat hot-reloading.
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // Dalam mode production, lebih baik tidak menggunakan variabel global.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;