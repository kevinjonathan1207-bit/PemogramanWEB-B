// ===== Ambil elemen =====
var form = document.getElementById("formKodePos");
var selectProvinsi = document.getElementById("provinsi");
var inputKota = document.getElementById("kota");
var selectKecamatan = document.getElementById("kecamatan");
var boxHasil = document.getElementById("hasil");
var teksRingkasan = document.getElementById("ringkasan");
var daftarHasil = document.getElementById("daftarHasil");

// ===== Isi dropdown provinsi dari data.js =====
for (var i = 0; i < DAFTAR_PROVINSI.length; i++) {
  var opsi = document.createElement("option");
  opsi.value = DAFTAR_PROVINSI[i];
  opsi.textContent = DAFTAR_PROVINSI[i];
  selectProvinsi.appendChild(opsi);
}

// ===== Fungsi bantu =====

// Data hanya tersedia jika Provinsi = Jawa Timur dan Kota = Surabaya.
// "Kota Surabaya" dan huruf besar/kecil juga diterima.
function dataTersedia() {
  var kota = inputKota.value.trim().toLowerCase();
  if (kota.indexOf("kota ") === 0) {
    kota = kota.substring(5).trim();
  }
  return selectProvinsi.value === "Jawa Timur" && kota === "surabaya";
}

// Isi ulang dropdown kecamatan sesuai provinsi dan kota yang dipilih
function perbaruiKecamatan() {
  selectKecamatan.innerHTML = '<option value="">Pilih Kecamatan</option>';

  if (!dataTersedia()) {
    return; // wilayah lain: dropdown kecamatan dibiarkan kosong
  }

  var daftar = Object.keys(DATA_SURABAYA).sort();
  for (var i = 0; i < daftar.length; i++) {
    var opsi = document.createElement("option");
    opsi.value = daftar[i];
    opsi.textContent = daftar[i];
    selectKecamatan.appendChild(opsi);
  }
}

function tampilkanHasil() {
  boxHasil.hidden = false;
}

function kosongkanHasil() {
  daftarHasil.innerHTML = "";
  teksRingkasan.textContent = "";
}

// ===== Event: dropdown kecamatan ikut berubah =====
selectProvinsi.addEventListener("change", perbaruiKecamatan);
inputKota.addEventListener("input", perbaruiKecamatan);

// ===== Event: tombol Cari =====
form.addEventListener("submit", function (event) {
  event.preventDefault();

  var provinsi = selectProvinsi.value;
  var kota = inputKota.value.trim();
  var kecamatan = selectKecamatan.value;

  // Validasi
  if (provinsi === "") {
    alert("Provinsi Harus Dipilih");
    selectProvinsi.focus();
    return;
  }

  if (kota === "") {
    alert("Kota atau Kabupaten Tidak Boleh Kosong");
    inputKota.focus();
    return;
  }

  kosongkanHasil();

  // Wilayah di luar Surabaya: data belum tersedia
  if (!dataTersedia()) {
    teksRingkasan.textContent =
      'Pencarian untuk "' + kota + '", ' + provinsi + " tidak menemukan hasil.";

    var pesan = document.createElement("div");
    pesan.className = "pesan-kosong";
    pesan.textContent = "Data kode pos untuk wilayah ini belum tersedia.";
    daftarHasil.appendChild(pesan);

    tampilkanHasil();
    return;
  }

  if (kecamatan === "") {
    alert("Kecamatan Harus Dipilih");
    selectKecamatan.focus();
    return;
  }

  // Tampilkan hasil: satu kartu untuk tiap kelurahan di kecamatan terpilih
  var data = DATA_SURABAYA[kecamatan];

  teksRingkasan.innerHTML = "";
  teksRingkasan.appendChild(
    document.createTextNode("Hasil pencarian kode pos untuk Kecamatan ")
  );
  var tebal = document.createElement("strong");
  tebal.textContent = kecamatan;
  teksRingkasan.appendChild(tebal);
  teksRingkasan.appendChild(
    document.createTextNode(", Kota Surabaya telah ditemukan sebanyak " + data.length + " buah.")
  );

  for (var i = 0; i < data.length; i++) {
    var namaKelurahan = data[i][0];
    var kodePos = data[i][1];

    var kartu = document.createElement("div");
    kartu.className = "card-hasil";

    var judul = document.createElement("div");
    judul.className = "judul";
    judul.textContent = namaKelurahan;

    var isi = document.createElement("div");
    isi.className = "isi";
    isi.appendChild(document.createTextNode("Kode pos "));
    var kode = document.createElement("strong");
    kode.textContent = kodePos;
    isi.appendChild(kode);
    isi.appendChild(
      document.createTextNode(
        " untuk daerah Kelurahan " + namaKelurahan + ", Kecamatan " + kecamatan + "."
      )
    );

    kartu.appendChild(judul);
    kartu.appendChild(isi);
    daftarHasil.appendChild(kartu);
  }

  tampilkanHasil();
});
