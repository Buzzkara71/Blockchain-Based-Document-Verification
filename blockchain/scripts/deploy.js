const hre = require("hardhat");

async function main() {
  console.log("Deploying DocumentRegistry contract...");

  // Mendapatkan objek ContractFactory untuk 'DocumentRegistry'
  const DocumentRegistry = await hre.ethers.getContractFactory("DocumentRegistry");

  // Memulai proses deployment
  const documentRegistry = await DocumentRegistry.deploy();

  // Menunggu hingga deployment selesai
  await documentRegistry.waitForDeployment();

  // Menampilkan alamat kontrak yang sudah di-deploy
  // Alamat ini SANGAT PENTING untuk dihubungkan dengan frontend
  console.log(`DocumentRegistry deployed successfully to: ${documentRegistry.target}`);
}

// Pola yang direkomendasikan untuk menggunakan async/await di mana-mana
// dan menangani error dengan benar.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});