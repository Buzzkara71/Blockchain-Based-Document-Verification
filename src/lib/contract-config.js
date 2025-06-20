// src/lib/contract-config.js

// File ini berfungsi sebagai PUSAT DATA untuk konfigurasi smart contract Anda.
// Tujuannya adalah agar Alamat dan ABI hanya perlu didefinisikan satu kali.

// 1. Ganti string di bawah ini dengan Alamat Kontrak Anda
// yang Anda dapatkan dari terminal setelah menjalankan skrip deploy.
export const contractAddress = "0x03F740Ebf55938cc51218F8DeE34D942b77d73DC";

// 2. Ganti array kosong di bawah ini dengan seluruh array ABI
// yang Anda salin dari file 'blockchain/artifacts/contracts/DocumentRegistry.sol/DocumentRegistry.json'.
export const contractABI = [
	{
		"inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "_hash",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "_uploader",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        }
      ],
      "name": "DocumentAdded",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_hash",
          "type": "bytes32"
        }
      ],
      "name": "addDocument",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "name": "documents",
      "outputs": [
        {
          "internalType": "address",
          "name": "uploader",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_hash",
          "type": "bytes32"
        }
      ],
      "name": "verifyDocument",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];