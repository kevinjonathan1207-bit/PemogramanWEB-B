/* Login petugas (simulasi antarmuka, bukan keamanan sungguhan) */
const KUNCI_LOGIN = 'libraryreg_login';
const AKUN_PETUGAS = { username: 'petugas', password: 'admin123' };

function sudahLogin() {
  try { return localStorage.getItem(KUNCI_LOGIN) === 'ya'; } catch (e) { return false; }
}
function prosesLogin(username, password) {
  if (username === AKUN_PETUGAS.username && password === AKUN_PETUGAS.password) {
    try { localStorage.setItem(KUNCI_LOGIN, 'ya'); } catch (e) { /* abaikan */ }
    return true;
  }
  return false;
}
function keluar() {
  try { localStorage.removeItem(KUNCI_LOGIN); } catch (e) { /* abaikan */ }
  location.href = 'login.html';
}
function wajibLogin() {
  if (!sudahLogin()) { location.replace('login.html'); return false; }
  return true;
}
