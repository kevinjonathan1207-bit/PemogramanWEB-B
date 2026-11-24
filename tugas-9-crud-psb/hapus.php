<?php
require 'koneksi.php';

// Hanya terima metode POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header("Location: index.php");
    exit;
}

$id = filter_input(INPUT_POST, 'id', FILTER_VALIDATE_INT, ['options' => ['min_range' => 1]]);

if (!$id) {
    header("Location: index.php?pesan=gagal");
    exit;
}

// Hapus data (Prepared Statement)
$stmt = mysqli_prepare($koneksi, "DELETE FROM siswa WHERE id = ?");

if ($stmt) {
    mysqli_stmt_bind_param($stmt, "i", $id);
    mysqli_stmt_execute($stmt);
    $terhapus = mysqli_stmt_affected_rows($stmt);
    mysqli_stmt_close($stmt);

    if ($terhapus > 0) {
        header("Location: index.php?pesan=hapus");
        exit;
    }
}

header("Location: index.php?pesan=gagal");
exit;
