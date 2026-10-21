/* Penyimpanan data anggota (localStorage) dan fungsi bantu yang dipakai bersama */
const KUNCI_ANGGOTA = 'libraryreg_anggota';
const PRODI = ['Informatika', 'Sistem Informasi', 'Manajemen', 'Akuntansi', 'Hukum', 'Pendidikan Guru', 'Lainnya'];
const JENIS = ['Mahasiswa', 'Dosen', 'Tenaga Kependidikan'];
const DATA_AWAL = [
  { nama: 'Andi Pratama', nim: '230101001', prodi: 'Informatika', alamat: 'Jl. Melati No. 5', telepon: '081234567890', email: 'andi@contoh.com', jenis: 'Mahasiswa' },
  { nama: 'Siti Rahma', nim: '230101002', prodi: 'Sistem Informasi', alamat: 'Jl. Kenanga No. 12', telepon: '081234567891', email: 'siti@contoh.com', jenis: 'Mahasiswa' },
  { nama: 'Budi Santoso', nim: '19881234', prodi: 'Manajemen', alamat: 'Jl. Anggrek No. 3', telepon: '081234567892', email: 'budi@contoh.com', jenis: 'Dosen' },
  { nama: 'Maya Lestari', nim: '19950077', prodi: 'Akuntansi', alamat: 'Jl. Mawar No. 8', telepon: '081234567893', email: 'maya@contoh.com', jenis: 'Tenaga Kependidikan' }
];

function ambilAnggota() {
  try {
    const data = JSON.parse(localStorage.getItem(KUNCI_ANGGOTA));
    if (Array.isArray(data)) return data;
  } catch (e) { /* data rusak atau storage tidak tersedia */ }
  simpanAnggota(DATA_AWAL);
  return DATA_AWAL.map(a => ({ ...a }));
}

function simpanAnggota(daftar) {
  try { localStorage.setItem(KUNCI_ANGGOTA, JSON.stringify(daftar)); } catch (e) { /* abaikan */ }
}

function escapeHtml(teks) {
  return String(teks).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

/* Validasi: kolom wajib, format email, dan NIM/NIP unik. Mengembalikan objek {namaKolom: pesan}. */
function validasiAnggota(d, nimLama) {
  const e = {};
  if (!d.nama) e.nama = 'Nama lengkap wajib diisi.';
  if (!d.nim) e.nim = 'NIM/NIP wajib diisi.';
  else if (!/^[A-Za-z0-9]{4,20}$/.test(d.nim)) e.nim = 'NIM/NIP berisi huruf dan angka, 4 sampai 20 karakter.';
  else if (d.nim !== nimLama && ambilAnggota().some(a => a.nim.toLowerCase() === d.nim.toLowerCase())) e.nim = 'NIM/NIP sudah terdaftar.';
  if (!d.prodi) e.prodi = 'Program studi wajib dipilih.';
  if (!d.jenis) e.jenis = 'Jenis keanggotaan wajib dipilih.';
  if (!d.telepon) e.telepon = 'Nomor telepon wajib diisi.';
  else if (!/^[0-9+\-\s]{8,16}$/.test(d.telepon)) e.telepon = 'Nomor telepon tidak valid (8 sampai 16 digit).';
  if (!d.email) e.email = 'Email wajib diisi.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) e.email = 'Format email tidak valid.';
  if (!d.alamat) e.alamat = 'Alamat wajib diisi.';
  return e;
}

/* Membuat 7 kolom formulir anggota; dipakai di halaman pendaftaran dan modal edit */
function renderBidang(wadah, p) {
  const f = (id, label, tipe, ph) => `<div class="col-md-6"><label for="${p}${id}" class="form-label req">${label}</label><input type="${tipe}" class="form-control" id="${p}${id}" name="${id}" placeholder="${ph}"><div class="invalid-feedback"></div></div>`;
  const s = (id, label, daftar, ph) => `<div class="col-md-6"><label for="${p}${id}" class="form-label req">${label}</label><select class="form-select" id="${p}${id}" name="${id}"><option value="">${ph}</option>${daftar.map(x => `<option>${x}</option>`).join('')}</select><div class="invalid-feedback"></div></div>`;
  wadah.innerHTML =
    f('nama', 'Nama lengkap', 'text', 'Masukkan nama lengkap') +
    f('nim', 'NIM/NIP', 'text', 'Masukkan NIM atau NIP') +
    s('prodi', 'Program studi', PRODI, 'Pilih program studi') +
    s('jenis', 'Jenis keanggotaan', JENIS, 'Pilih jenis keanggotaan') +
    f('telepon', 'Nomor telepon', 'tel', '08xxxxxxxxxx') +
    f('email', 'Email', 'email', 'nama@email.com') +
    `<div class="col-12"><label for="${p}alamat" class="form-label req">Alamat</label><textarea class="form-control" id="${p}alamat" name="alamat" rows="3" placeholder="Masukkan alamat lengkap"></textarea><div class="invalid-feedback"></div></div>`;
}

function ambilForm(form) {
  const d = {};
  new FormData(form).forEach((v, k) => { d[k] = String(v).trim(); });
  return d;
}

function tampilkanError(form, errors) {
  form.querySelectorAll('[name]').forEach(el => {
    const pesan = errors[el.name];
    el.classList.toggle('is-invalid', !!pesan);
    if (el.nextElementSibling) el.nextElementSibling.textContent = pesan || '';
  });
}
