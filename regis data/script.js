// Ambil elemen form dan semua input
var form = document.getElementById("formRegistrasi");
var inputNama = document.getElementById("nama");
var inputNim = document.getElementById("nim");
var selectJurusan = document.getElementById("jurusan");
var inputMatkul = document.getElementById("matkul");
var inputDosen = document.getElementById("dosen");

// Rekomendasi nama ditangani oleh <datalist id="daftarNama"> di index.html.
// Saat pengguna mengetik huruf (misalnya "K"), browser otomatis
// menampilkan nama yang cocok, yaitu "Kevin Jonathan".

// Validasi saat tombol Submit ditekan
form.addEventListener("submit", function (event) {
  // Cegah halaman reload
  event.preventDefault();

  var nama = inputNama.value.trim();
  var nim = inputNim.value.trim();
  var jurusan = selectJurusan.value;
  var matkul = inputMatkul.value.trim();
  var dosen = inputDosen.value.trim();

  if (nama === "") {
    alert("Nama Tidak Boleh Kosong");
    inputNama.focus();
    return;
  }

  if (nim === "") {
    alert("NIM Tidak Boleh Kosong");
    inputNim.focus();
    return;
  }

  if (isNaN(nim)) {
    alert("NIM Harus Berupa Angka");
    inputNim.focus();
    return;
  }

  if (jurusan === "") {
    alert("Jurusan Harus Dipilih");
    selectJurusan.focus();
    return;
  }

  if (matkul === "") {
    alert("Mata Kuliah Tidak Boleh Kosong");
    inputMatkul.focus();
    return;
  }

  if (dosen === "") {
    alert("Dosen Tidak Boleh Kosong");
    inputDosen.focus();
    return;
  }

  // Semua data valid
  alert(
    "Registrasi Berhasil\n\n" +
    "Nama        : " + nama + "\n" +
    "NIM         : " + nim + "\n" +
    "Jurusan     : " + jurusan + "\n" +
    "Mata Kuliah : " + matkul + "\n" +
    "Dosen       : " + dosen
  );

  form.reset();
});
