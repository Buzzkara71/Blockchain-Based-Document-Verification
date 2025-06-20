const { expect } = require("chai");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { ethers } = require("hardhat");

describe("DocumentRegistry", function () {
  let DocumentRegistry;
  let documentRegistry;
  let owner;
  let addr1;

  // Dijalankan sebelum setiap test 'it(...)'
  beforeEach(async function () {
    // Mendapatkan objek kontrak dan signer (akun)
    [owner, addr1] = await ethers.getSigners();
    DocumentRegistry = await ethers.getContractFactory("DocumentRegistry");
    documentRegistry = await DocumentRegistry.deploy();
  });

  it("Should successfully add a new document", async function () {
    const dummyHash = ethers.keccak256(ethers.toUtf8Bytes("hello world"));

    // Panggil fungsi addDocument
    await documentRegistry.connect(owner).addDocument(dummyHash);

    // Periksa apakah data sudah tersimpan dengan benar
    const storedDoc = await documentRegistry.documents(dummyHash);
    expect(storedDoc.uploader).to.equal(owner.address);
    expect(storedDoc.timestamp).to.be.gt(0); // 'gt' = greater than
  });

  it("Should emit a DocumentAdded event on successful addition", async function () {
    const dummyHash = ethers.keccak256(ethers.toUtf8Bytes("test event"));

    // Panggil fungsi addDocument

    await expect(documentRegistry.connect(addr1).addDocument(dummyHash))
      .to.emit(documentRegistry, "DocumentAdded")
      .withArgs(dummyHash, addr1.address, anyValue); // <-- Gunakan anyValue untuk timestamp
});

  it("Should fail to add a document if the hash already exists", async function () {
    const dummyHash = ethers.keccak256(ethers.toUtf8Bytes("duplicate test"));

    // Tambahkan dokumen pertama kali
    await documentRegistry.connect(owner).addDocument(dummyHash);

    // Coba tambahkan lagi dengan hash yang sama, harapkan error
    await expect(
      documentRegistry.connect(addr1).addDocument(dummyHash)
    ).to.be.revertedWith("Document hash already exists.");
  });
  
  it("Should correctly verify an existing document", async function () {
    const dummyHash = ethers.keccak256(ethers.toUtf8Bytes("verify test"));
    await documentRegistry.connect(owner).addDocument(dummyHash);

    // Panggil fungsi verifyDocument
    const [uploader, timestamp] = await documentRegistry.verifyDocument(dummyHash);

    // Periksa hasilnya
    expect(uploader).to.equal(owner.address);
    expect(timestamp).to.be.gt(0);
  });
  
  it("Should return zero values for a non-existent document", async function() {
    const nonExistentHash = ethers.keccak256(ethers.toUtf8Bytes("not here"));

    const [uploader, timestamp] = await documentRegistry.verifyDocument(nonExistentHash);

    expect(uploader).to.equal(ethers.ZeroAddress);
    expect(timestamp).to.equal(0);
  });
});