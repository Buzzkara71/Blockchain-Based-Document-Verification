require("@nomicfoundation/hardhat-toolbox");
// Path ini penting, karena .env.local ada di folder root, satu tingkat di atas folder 'blockchain'
require("dotenv").config({ path: '../.env.local' });

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    // Objek ini mendefinisikan jaringan 'sepolia'
    sepolia: {
      // URL ini diambil dari SEPOLIA_RPC_URL di file .env.local Anda
      url: process.env.SEPOLIA_RPC_URL || "", 
      // Akun untuk deploy diambil dari PRIVATE_KEY di file .env.local Anda
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};