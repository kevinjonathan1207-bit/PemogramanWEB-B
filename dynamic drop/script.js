// Daftar merk untuk setiap jenis produk
var daftarMerk = {
  desktop: ["HP", "Dell", "Lenovo", "Asus"],
  laptop: ["Asus", "Acer", "Lenovo", "Apple"],
  smartphone: ["Samsung", "Apple", "Xiaomi", "Oppo"]
};

var selectProduk = document.getElementById("produk");
var selectMerk = document.getElementById("merk");

// Saat jenis produk diganti, isi ulang pilihan merk
selectProduk.addEventListener("change", function () {
  var produk = selectProduk.value;

  // Kosongkan pilihan merk, sisakan teks "Pilih Merk"
  selectMerk.innerHTML = '<option value="">Pilih Merk</option>';

  // Jika belum memilih produk, berhenti di sini
  if (produk === "") {
    return;
  }

  // Tambahkan merk sesuai jenis produk yang dipilih
  var merk = daftarMerk[produk];
  for (var i = 0; i < merk.length; i++) {
    var opsi = document.createElement("option");
    opsi.value = merk[i];
    opsi.textContent = merk[i];
    selectMerk.appendChild(opsi);
  }
});
