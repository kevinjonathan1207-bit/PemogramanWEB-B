/* Navbar dan footer yang sama untuk semua halaman, plus notifikasi toast */
(function () {
  const hal = document.body.dataset.page;
  const h = id => (hal === 'beranda' ? '' : 'index.html') + '#' + id;
  const menu = [
    ['Beranda', h('beranda'), 'beranda'],
    ['Tentang Perpustakaan', h('tentang'), 'tentang'],
    ['Layanan', h('layanan'), 'layanan'],
    ['Daftar Anggota', 'anggota.html', 'anggota'],
    ['Pendaftaran Anggota', 'pendaftaran.html', 'pendaftaran']
  ];
  const item = menu.map(([teks, url, kunci]) =>
    `<li class="nav-item"><a class="nav-link${kunci === hal ? ' active' : ''}"${kunci === hal ? ' aria-current="page"' : ''} href="${url}">${teks}</a></li>`).join('');
  const tombol = sudahLogin()
    ? '<button type="button" class="btn btn-outline-teal" id="btnKeluar"><i class="bi bi-box-arrow-right me-1"></i>Keluar</button>'
    : '<a class="btn btn-teal" href="login.html"><i class="bi bi-box-arrow-in-right me-1"></i>Login Petugas</a>';

  const nav = `<nav class="navbar navbar-expand-xl sticky-top" id="navUtama"><div class="container">
    <a class="navbar-brand d-flex align-items-center gap-2" href="${h('beranda')}"><i class="bi bi-journal-bookmark-fill brand-icon fs-3"></i><span class="brand-name">LibraryReg</span></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menuNav" aria-controls="menuNav" aria-expanded="false" aria-label="Buka menu"><span class="navbar-toggler-icon"></span></button>
    <div class="collapse navbar-collapse" id="menuNav"><ul class="navbar-nav ms-auto gap-xl-1 align-items-xl-center">${item}<li class="nav-item ms-xl-2">${tombol}</li></ul></div>
  </div></nav>`;

  const footer = `<footer><div class="container"><div class="row g-4">
    <div class="col-md-4"><h3 class="d-flex align-items-center gap-2"><i class="bi bi-journal-bookmark-fill"></i>LibraryReg</h3><p class="small mb-0">Aplikasi pendaftaran anggota perpustakaan perguruan tinggi.</p></div>
    <div class="col-md-4"><h3>Kontak</h3><ul class="list-unstyled small mb-0">
      <li class="mb-1"><i class="bi bi-geo-alt-fill me-2"></i>Jl. Contoh No. 1, Kota Contoh</li>
      <li class="mb-1"><i class="bi bi-telephone-fill me-2"></i>(021) 000-0000</li>
      <li><i class="bi bi-envelope-fill me-2"></i><a href="mailto:perpustakaan@contoh.ac.id">perpustakaan@contoh.ac.id</a></li></ul></div>
    <div class="col-md-4"><h3>Jam layanan</h3><ul class="list-unstyled small mb-0">
      <li class="mb-1">Senin - Jumat: 08.00 - 20.00</li><li class="mb-1">Sabtu: 08.00 - 14.00</li><li>Minggu dan hari libur: tutup</li></ul></div>
  </div><hr class="border-secondary mt-4"><p class="small text-center mb-0">&copy; 2026 LibraryReg. Seluruh hak dilindungi.</p></div></footer>`;

  document.getElementById('layout-nav').outerHTML = nav;
  document.getElementById('layout-footer').outerHTML = footer;
  const keluarBtn = document.getElementById('btnKeluar');
  if (keluarBtn) keluarBtn.addEventListener('click', keluar);
})();

/* Notifikasi: tipe 'success' atau 'danger' */
function tampilToast(pesan, tipe) {
  let wadah = document.getElementById('wadahToast');
  if (!wadah) {
    wadah = document.createElement('div');
    wadah.id = 'wadahToast';
    wadah.className = 'toast-container position-fixed top-0 end-0 p-3';
    wadah.style.zIndex = 2000;
    document.body.appendChild(wadah);
  }
  const el = document.createElement('div');
  el.className = `toast align-items-center text-bg-${tipe || 'success'} border-0`;
  el.setAttribute('role', 'alert');
  el.innerHTML = `<div class="d-flex"><div class="toast-body">${escapeHtml(pesan)}</div><button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Tutup"></button></div>`;
  wadah.appendChild(el);
  el.addEventListener('hidden.bs.toast', () => el.remove());
  new bootstrap.Toast(el, { delay: 4000 }).show();
}
