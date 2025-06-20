// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title DocumentRegistry
 * @dev Kontrak ini digunakan untuk mendaftarkan dan memverifikasi hash dokumen digital.
 * Tujuannya adalah untuk menyediakan bukti keberadaan (Proof of Existence) yang tidak dapat diubah.
 */
contract DocumentRegistry {

    // Struktur untuk menyimpan metadata dokumen
    struct Document {
        address uploader;   // Alamat dompet pengunggah
        uint256 timestamp;  // Waktu saat dokumen didaftarkan (dalam Unix timestamp)
    }

    // Mapping dari hash dokumen (bytes32) ke metadata dokumen
    // 'public' agar bisa diakses dari luar kontrak
    mapping(bytes32 => Document) public documents;

    // Event yang akan dipancarkan setiap kali dokumen baru berhasil ditambahkan
    // 'indexed' memungkinkan pencarian/filter event dengan lebih efisien di frontend
    event DocumentAdded(
        bytes32 indexed _hash,
        address indexed _uploader,
        uint256 timestamp
    );

    /**
     * @dev Mendaftarkan hash dokumen baru ke blockchain.
     * Akan gagal jika hash tersebut sudah pernah didaftarkan sebelumnya.
     * @param _hash Hash SHA-256 dari dokumen yang akan didaftarkan.
     */
    function addDocument(bytes32 _hash) public {
        // Memastikan hash belum ada di dalam mapping (timestamp akan bernilai 0 jika kosong)
        require(documents[_hash].timestamp == 0, "Document hash already exists.");

        // Menyimpan data dokumen baru ke dalam mapping
        documents[_hash] = Document({
            uploader: msg.sender,        // msg.sender adalah alamat yang memanggil fungsi ini
            timestamp: block.timestamp   // block.timestamp adalah waktu saat ini di blockchain
        });

        // Memancarkan event untuk memberitahu aplikasi luar (frontend) bahwa ada dokumen baru
        emit DocumentAdded(_hash, msg.sender, block.timestamp);
    }

    /**
     * @dev Memverifikasi sebuah hash dokumen.
     * Mengembalikan alamat pengunggah dan timestamp pendaftaran.
     * @param _hash Hash SHA-256 dari dokumen yang akan diverifikasi.
     * @return address Alamat dompet pengunggah.
     * @return uint256 Timestamp saat dokumen didaftarkan.
     */
    function verifyDocument(bytes32 _hash) public view returns (address, uint256) {
        Document storage doc = documents[_hash];
        return (doc.uploader, doc.timestamp);
    }
}