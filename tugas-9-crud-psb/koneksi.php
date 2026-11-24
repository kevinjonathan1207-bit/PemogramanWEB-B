<?php
// =========================================================
// Konfigurasi koneksi database (default XAMPP)
// =========================================================
$host = "127.0.0.1";
$user = "root";
$pass = "";
$db   = "db_psb";
$port = 3306;

// Matikan exception bawaan mysqli (PHP 8.1+) agar pengecekan error manual tetap berjalan
mysqli_report(MYSQLI_REPORT_OFF);

$koneksi = mysqli_connect($host, $user, $pass, $db, $port);

if (!$koneksi) {
    die("Koneksi ke database gagal: " . mysqli_connect_error());
}

mysqli_set_charset($koneksi, "utf8mb4");

// Pilihan yang valid (dipakai untuk form & validasi server)
$opsi_jenis_kelamin = ["Laki-laki", "Perempuan"];
$opsi_agama         = ["Islam", "Kristen", "Katolik", "Hindu", "Buddha", "Konghucu"];

// Helper: amankan output HTML dari XSS
function e($teks)
{
    return htmlspecialchars((string) $teks, ENT_QUOTES, 'UTF-8');
}
