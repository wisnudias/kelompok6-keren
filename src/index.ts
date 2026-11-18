import * as readline from "readline";

// =========================================================
// BAGIAN 1:TIPE DATA, KONSTANTA, DAN NILAI DATA AWAL (SEED)
// =========================================================

// Mendefinisikan bentuk (tipe) data untuk satu mahasiswa 
interface Mahasiswa {
    nim: string; // Nomor Induk Mahasiswa
    nama: string; // Nama mahasiswa
    jurusan: string; // Jurusan mahasiswa
    nilaiTugas: number; // Nilai Tugas
    nilaiUTS: number; // Nilai UTS
    nilaiUAS: number; // Nilai UAS
}

// konstanta untuk bobot penilaian
const BOBOT_TUGAS: number = 0.3;
const BOBOT_UTS: number = 0.3;
const BOBOT_UAS: number = 0.4;
const NILAI_LULUS: number = 55;

// Array untuk menyimpan data mahasiswa
const daftarMahasiswa: Mahasiswa[] = [
    { nim: "123456", nama: "Gilang", jurusan: "Informatika", nilaiTugas: 80, nilaiUTS: 75, nilaiUAS: 90 },
    { nim: "234567", nama: "Nadeen", jurusan: "Sistem Informasi", nilaiTugas: 70, nilaiUTS: 65, nilaiUAS: 80 },
    { nim: "345678", nama: "Danilo", jurusan: "Teknik Komputer", nilaiTugas: 60, nilaiUTS: 55, nilaiUAS: 70 },
    { nim: "456789", nama: "Fizri", jurusan: "Manajemen Informatika", nilaiTugas: 75, nilaiUTS: 70, nilaiUAS: 85 }
];

// =========================================================
// BAGIAN 2: FUNGSI BANTU (INPUT, HITUNG, FORMAT)
// =========================================================

// Membuat objek readline untuk membaca ketikan pengguna di terminal 
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

// Fungsi untuk menampilkan pertanyaan dan menunggu jawaban dari pengguna
function tanyaPertanyaan(pertanyaan: string): Promise<string> {
    return new Promise((resolve) => {
        rl.question(pertanyaan, resolve);
    });
}

// Fungsi arrow untuk memformat angka menjadi 2 angka di belakang koma
const formatNilai = (n: number): string => n.toFixed(2);

// Fungsi untuk menghitung nilai akhir 
function hitungNilaiAkhir(m: Mahasiswa): number {
    let akhir: number = 0;
    akhir += m.nilaiTugas * BOBOT_TUGAS;
    akhir += m.nilaiUTS * BOBOT_UTS;
    akhir += m.nilaiUAS * BOBOT_UAS;
    return akhir;
}

// Fungsi untuk menghitung persentase 
function hitungPersentase(nilai: number, maksimal: number): number {
    let persen: number = nilai;
    persen *= 100;
    persen /= maksimal;
    return persen;
}
