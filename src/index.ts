import * as readlineSync from "readline-sync";

// ============================================================
// BAGIAN 1: TIPE DATA, KONSTANTA, DAN DATA AWAL (SEED)
// ============================================================

// Mendefinisikan bentuk (tipe) data untuk satu mahasiswa
interface Mahasiswa {
  nim: string; // NIM unik bertipe string
  nama: string; // Nama mahasiswa bertipe string
  jurusan: string; // Jurusan mahasiswa bertipe string
  nilaiTugas: number; // Nilai tugas bertipe number
  nilaiUTS: number; // Nilai UTS bertipe number
  nilaiUAS: number; // Nilai UAS bertipe number
}

// Konstanta bobot penilaian (const karena nilainya tetap)
const BOBOT_TUGAS: number = 0.3; // Bobot nilai tugas = 30%
const BOBOT_UTS: number = 0.3; // Bobot nilai UTS = 30%
const BOBOT_UAS: number = 0.4; // Bobot nilai UAS = 40%
const NILAI_LULUS: number = 55; // Batas minimal nilai akhir agar dinyatakan lulus

// Array penyimpanan data di memori, sudah diisi 6 data awal (seed)
const daftarMahasiswa: Mahasiswa[] = [
  { nim: "263140707111001", nama: "Budi Santoso", jurusan: "Teknik Informatika", nilaiTugas: 80, nilaiUTS: 75, nilaiUAS: 85 },
  { nim: "263140707111002", nama: "Siti Aminah", jurusan: "Sistem Informasi", nilaiTugas: 90, nilaiUTS: 88, nilaiUAS: 92 },
  { nim: "263140707111003", nama: "Andi Wijaya", jurusan: "Teknik Informatika", nilaiTugas: 60, nilaiUTS: 55, nilaiUAS: 50 },
  { nim: "263140707111004", nama: "Dewi Lestari", jurusan: "Manajemen Bisnis", nilaiTugas: 72, nilaiUTS: 68, nilaiUAS: 75 },
  { nim: "263140707111005", nama: "Rizky Pratama", jurusan: "Sistem Informasi", nilaiTugas: 45, nilaiUTS: 40, nilaiUAS: 38 },
  { nim: "263140707111006", nama: "Nadia Putri", jurusan: "Manajemen Bisnis", nilaiTugas: 85, nilaiUTS: 80, nilaiUAS: 78 },
];

// ============================================================
// BAGIAN 2: FUNGSI BANTU (INPUT, HITUNG, FORMAT)
// ============================================================

// Fungsi (dengan parameter) untuk menampilkan pertanyaan dan mengembalikan jawaban pengguna
function tanya(pertanyaan: string): string {
  // readlineSync.question menunggu pengguna mengetik lalu langsung mengembalikan teksnya
  return readlineSync.question(pertanyaan);
}

// Fungsi arrow untuk memformat angka menjadi 2 angka di belakang koma
const formatNilai = (n: number): string => n.toFixed(2);

// Fungsi untuk menghitung nilai akhir (mengembalikan hasil hitung bertipe number)
function hitungNilaiAkhir(m: Mahasiswa): number {
  let akhir: number = 0; // Variabel penampung hasil, nilainya akan berubah (let)
  akhir += m.nilaiTugas * BOBOT_TUGAS; // Compound += : tambahkan bobot nilai tugas
  akhir += m.nilaiUTS * BOBOT_UTS; // Tambahkan bobot nilai UTS
  akhir += m.nilaiUAS * BOBOT_UAS; // Tambahkan bobot nilai UAS
  return akhir; // Kembalikan nilai akhir
}

// Fungsi untuk menghitung persentase (memakai compound *= dan /=)
function hitungPersentase(nilai: number, maksimal: number): number {
  let persen: number = nilai; // Mulai dari nilai awal
  persen *= 100; // Compound *= : kalikan 100
  persen /= maksimal; // Compound /= : bagi dengan nilai maksimal
  return persen; // Kembalikan hasil persentase
}

// Fungsi untuk menentukan grade huruf dari nilai akhir (satu rantai if/else dihitung 1)
function tentukanGrade(nilai: number): string {
  if (nilai >= 85) {
    return "A"; // Nilai 85 ke atas = A
  } else if (nilai >= 70) {
    return "B"; // Nilai 70 sampai di bawah 85 = B
  } else if (nilai >= 55) {
    return "C"; // Nilai 55 sampai di bawah 70 = C
  } else if (nilai >= 40) {
    return "D"; // Nilai 40 sampai di bawah 55 = D
  } else {
    return "E"; // Di bawah 40 = E
  }
}

// Fungsi yang memberi keterangan grade menggunakan switch (4 case + default)
function deskripsiGrade(grade: string): string {
  switch (grade) {
    case "A":
      return "Sangat Baik"; // Keterangan untuk grade A
    case "B":
      return "Baik"; // Keterangan untuk grade B
    case "C":
      return "Cukup"; // Keterangan untuk grade C
    case "D":
      return "Kurang"; // Keterangan untuk grade D
    default:
      return "Sangat Kurang"; // Selain itu (grade E)
  }
}

// Fungsi untuk membuat garis pemisah dengan perulangan for biasa
function buatGaris(panjang: number): string {
  let garis: string = ""; // Penampung teks garis
  // Perulangan for: ulangi sebanyak 'panjang' kali
  for (let i = 0; i < panjang; i++) {
    garis += "="; // Tambahkan satu karakter "=" tiap putaran
  }
  return garis; // Kembalikan garis yang sudah jadi
}

// Fungsi untuk meminta teks yang tidak boleh kosong (perulangan while)
function inputTeks(label: string): string {
  let teks: string = ""; // Penampung jawaban pengguna
  // Ulangi terus selama jawaban masih kosong
  while (teks === "") {
    teks = (tanya(`${label}: `)).trim(); // Baca jawaban dan buang spasi di tepi
    // Jika kosong, beri pesan kesalahan
    if (teks === "") {
      console.log(`${label} tidak boleh kosong.`);
    }
  }
  return teks; // Kembalikan jawaban yang valid
}

// Fungsi untuk meminta nilai 0-100 yang valid (perulangan do...while)
function inputNilai(label: string): number {
  let nilai: number = 0; // Penampung angka yang diketik
  let valid: boolean = false; // Penanda apakah input sudah valid
  do {
    const teks: string = (tanya(`${label} (0-100): `)).trim(); // Baca jawaban
    nilai = Number(teks); // Ubah teks menjadi angka
    // Valid jika tidak kosong, berupa angka, dan berada di rentang 0 sampai 100
    valid = teks !== "" && !isNaN(nilai) && nilai >= 0 && nilai <= 100;
    // Jika tidak valid, beri pesan dan ulangi
    if (!valid) {
      console.log("Nilai tidak valid! Masukkan angka 0 sampai 100.");
    }
  } while (!valid);
  return nilai; // Kembalikan nilai valid
}

// Fungsi untuk meminta NIM baru: tidak kosong, hanya angka, dan belum dipakai
function inputNimBaru(): string {
  let nim: string = ""; // Penampung NIM yang diketik
  let valid: boolean = false; // Penanda apakah NIM sudah valid
  while (!valid) {
    nim = (tanya("NIM (angka)")).trim(); // Baca NIM dari pengguna
    // Satu rantai if/else untuk memeriksa tiga aturan validasi
    if (nim === "") {
      console.log("NIM tidak boleh kosong."); // Aturan 1: tidak boleh kosong
    } else if (!/^\d+$/.test(nim)) {
      console.log("NIM harus berupa angka saja."); // Aturan 2: hanya digit
    } else if (daftarMahasiswa.find((m) => m.nim === nim) !== undefined) {
      console.log("NIM sudah dipakai, gunakan NIM lain."); // Aturan 3: harus unik
    } else {
      valid = true; // Semua aturan terpenuhi
    }
  }
  return nim; // Kembalikan NIM yang valid
}
// ============================================================
// BAGIAN 3: CREATE (TAMBAH DATA)
// ============================================================

// Fungsi untuk menambah data mahasiswa baru (tanpa return / void)
function tambahMahasiswa(): void {
  console.log("\n--- Tambah Mahasiswa ---");
  const nim: string = inputNimBaru(); // Minta NIM yang unik dan valid
  const nama: string = inputTeks("Nama"); // Minta nama (tidak boleh kosong)
  const jurusan: string = inputTeks("Jurusan"); // Minta jurusan (tidak boleh kosong)
  const nilaiTugas: number = inputNilai("Nilai Tugas"); // Minta nilai tugas
  const nilaiUTS: number = inputNilai("Nilai UTS"); // Minta nilai UTS
  const nilaiUAS: number = inputNilai("Nilai UAS"); // Minta nilai UAS
  // Menambahkan data baru ke akhir array dengan push
  daftarMahasiswa.push({ nim, nama, jurusan, nilaiTugas, nilaiUTS, nilaiUAS });
  console.log("Data berhasil ditambahkan.");
}

// ============================================================
// BAGIAN 4: READ (TAMPIL DATA)
// ============================================================

// Fungsi tanpa parameter untuk mencetak judul kolom tabel
function cetakHeader(): void {
  console.log(buatGaris(86)); // Garis atas tabel
  // Judul kolom, dirapikan dengan padEnd agar sejajar
  console.log("No".padEnd(4) + "NIM".padEnd(17) + "Nama".padEnd(18) + "Jurusan".padEnd(20) + "T/UTS/UAS".padEnd(14) + "Akhir".padEnd(8) + "Grade");
  console.log(buatGaris(86)); // Garis bawah judul
}

// Fungsi untuk mencetak satu baris data mahasiswa
function cetakBaris(m: Mahasiswa, no: number): void {
  const akhir: number = hitungNilaiAkhir(m); // Hitung nilai akhir
  const grade: string = tentukanGrade(akhir); // Tentukan grade-nya
  const nilaiGabung: string = `${m.nilaiTugas}/${m.nilaiUTS}/${m.nilaiUAS}`; // Gabungkan 3 nilai
  // Cetak satu baris dengan lebar kolom yang tetap
  console.log(String(no).padEnd(4) + m.nim.padEnd(17) + m.nama.padEnd(18) + m.jurusan.padEnd(20) + nilaiGabung.padEnd(14) + formatNilai(akhir).padEnd(8) + grade);
}