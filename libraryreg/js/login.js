if (sudahLogin()) location.replace('anggota.html');

const formLogin = document.getElementById('formLogin');
const pesan = document.getElementById('pesanLogin');

formLogin.addEventListener('submit', e => {
  e.preventDefault();
  const user = formLogin.username.value.trim();
  const pass = formLogin.password.value;
  if (!user || !pass) {
    pesan.textContent = 'Username dan password wajib diisi.';
  } else if (!prosesLogin(user, pass)) {
    pesan.textContent = 'Username atau password salah.';
  } else {
    location.href = 'anggota.html';
    return;
  }
  pesan.classList.remove('d-none');
});
