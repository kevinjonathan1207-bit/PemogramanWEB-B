const form = document.getElementById('formDaftar');
renderBidang(form.querySelector('.row'), 'd-');

form.addEventListener('submit', e => {
  e.preventDefault();
  const data = ambilForm(form);
  const errors = validasiAnggota(data, '');
  tampilkanError(form, errors);
  if (Object.keys(errors).length) {
    tampilToast('Data belum lengkap atau belum sesuai. Periksa kolom yang ditandai.', 'danger');
    return;
  }
  const daftar = ambilAnggota();
  daftar.push(data);
  simpanAnggota(daftar);
  form.reset();
  tampilToast('Pendaftaran ' + data.nama + ' berhasil. Data anggota sudah tersimpan.');
});

form.addEventListener('reset', () => tampilkanError(form, {}));
