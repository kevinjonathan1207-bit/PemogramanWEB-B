if (wajibLogin()) {
  const tbody = document.getElementById('tbodyAnggota');
  const cari = document.getElementById('cari');
  const info = document.getElementById('infoJumlah');
  const formEdit = document.getElementById('formEdit');
  const modal = id => bootstrap.Modal.getOrCreateInstance(document.getElementById(id));
  let daftar = ambilAnggota();
  let nimHapus = null;

  renderBidang(formEdit.querySelector('.row'), 'e-');
  formEdit.elements.nim.readOnly = true;

  function tampil() {
    const kata = cari.value.trim().toLowerCase();
    const hasil = daftar.filter(a => a.nama.toLowerCase().includes(kata) || a.nim.toLowerCase().includes(kata));
    tbody.innerHTML = hasil.length ? hasil.map((a, i) => `<tr>
      <td>${i + 1}</td><td>${escapeHtml(a.nama)}</td><td>${escapeHtml(a.nim)}</td><td>${escapeHtml(a.prodi)}</td>
      <td>${escapeHtml(a.jenis)}</td><td>${escapeHtml(a.telepon)}</td>
      <td class="text-nowrap">
        <button class="btn btn-sm btn-outline-secondary" data-aksi="detail" data-nim="${escapeHtml(a.nim)}" aria-label="Detail ${escapeHtml(a.nama)}"><i class="bi bi-eye"></i></button>
        <button class="btn btn-sm btn-outline-primary" data-aksi="edit" data-nim="${escapeHtml(a.nim)}" aria-label="Edit ${escapeHtml(a.nama)}"><i class="bi bi-pencil"></i></button>
        <button class="btn btn-sm btn-outline-danger" data-aksi="hapus" data-nim="${escapeHtml(a.nim)}" aria-label="Hapus ${escapeHtml(a.nama)}"><i class="bi bi-trash"></i></button>
      </td></tr>`).join('')
      : `<tr><td colspan="7" class="text-center text-muted py-4">${daftar.length ? 'Tidak ada anggota yang cocok dengan pencarian.' : 'Belum ada anggota. Data muncul setelah ada yang mendaftar.'}</td></tr>`;
    info.textContent = `Menampilkan ${hasil.length} dari ${daftar.length} anggota`;
  }

  tbody.addEventListener('click', e => {
    const tombol = e.target.closest('button[data-aksi]');
    if (!tombol) return;
    const a = daftar.find(x => x.nim === tombol.dataset.nim);
    if (!a) return;
    if (tombol.dataset.aksi === 'detail') {
      document.getElementById('isiDetail').innerHTML = [['Nama lengkap', a.nama], ['NIM/NIP', a.nim], ['Program studi', a.prodi], ['Jenis keanggotaan', a.jenis], ['Nomor telepon', a.telepon], ['Email', a.email], ['Alamat', a.alamat]]
        .map(([k, v]) => `<dt class="col-sm-4">${k}</dt><dd class="col-sm-8">${escapeHtml(v)}</dd>`).join('');
      modal('modalDetail').show();
    } else if (tombol.dataset.aksi === 'edit') {
      tampilkanError(formEdit, {});
      Object.keys(a).forEach(k => { if (formEdit.elements[k]) formEdit.elements[k].value = a[k]; });
      modal('modalEdit').show();
    } else {
      nimHapus = a.nim;
      document.getElementById('namaHapus').textContent = a.nama;
      modal('modalHapus').show();
    }
  });

  formEdit.addEventListener('submit', e => {
    e.preventDefault();
    const data = ambilForm(formEdit);
    const errors = validasiAnggota(data, data.nim);
    tampilkanError(formEdit, errors);
    if (Object.keys(errors).length) { tampilToast('Perubahan belum disimpan. Periksa kolom yang ditandai.', 'danger'); return; }
    daftar = daftar.map(a => (a.nim === data.nim ? data : a));
    simpanAnggota(daftar);
    modal('modalEdit').hide();
    tampil();
    tampilToast('Data ' + data.nama + ' berhasil diperbarui.');
  });

  document.getElementById('btnHapus').addEventListener('click', () => {
    const a = daftar.find(x => x.nim === nimHapus);
    daftar = daftar.filter(x => x.nim !== nimHapus);
    simpanAnggota(daftar);
    modal('modalHapus').hide();
    tampil();
    tampilToast('Data ' + (a ? a.nama : 'anggota') + ' berhasil dihapus.');
  });

  cari.addEventListener('input', tampil);
  tampil();
}
