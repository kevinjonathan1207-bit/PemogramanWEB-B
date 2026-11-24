<?php
require 'koneksi.php';

$daftar_pesan = [
    'tambah' => ['sukses', 'Data siswa baru berhasil ditambahkan.'],
    'edit'   => ['sukses', 'Data siswa berhasil diperbarui.'],
    'hapus'  => ['sukses', 'Data siswa berhasil dihapus.'],
    'gagal'  => ['error',  'Proses gagal. Data tidak ditemukan atau terjadi kesalahan.'],
];
$pesan = isset($_GET['pesan']) && is_string($_GET['pesan']) ? $_GET['pesan'] : '';
$alert = $daftar_pesan[$pesan] ?? null;

$hasil = mysqli_query($koneksi, "SELECT * FROM siswa ORDER BY id DESC");
if (!$hasil) {
    die("Query gagal: " . e(mysqli_error($koneksi)));
}
$total = mysqli_num_rows($hasil);
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Data Pendaftar | Pendaftaran Siswa Baru</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<header class="topbar">
    <div class="container topbar-inner">
        <div class="brand">
            <span class="brand-logo">PSB</span>
            <div>
                <h1>Pendaftaran Siswa Baru</h1>
                <p>SMK Coding &middot; Tahun Ajaran 2026/2027</p>
            </div>
        </div>
    </div>
</header>

<main class="container">

    <?php if ($alert): ?>
        <div class="alert alert-<?= e($alert[0]) ?>">
            <?= e($alert[1]) ?>
        </div>
    <?php endif; ?>

    <section class="card">
        <div class="card-header">
            <div>
                <h2>Data Calon Siswa</h2>
                <p class="muted">Total pendaftar: <strong><?= $total ?></strong> siswa</p>
            </div>
            <a href="tambah.php" class="btn btn-primary">+ Tambah Pendaftar</a>
        </div>

        <div class="table-wrap">
            <table class="table">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama</th>
                        <th>Alamat</th>
                        <th>Jenis Kelamin</th>
                        <th>Agama</th>
                        <th>Sekolah Asal</th>
                        <th class="text-center">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                <?php if ($total === 0): ?>
                    <tr>
                        <td colspan="7" class="empty">Belum ada data pendaftar.</td>
                    </tr>
                <?php else: ?>
                    <?php $no = 1; while ($siswa = mysqli_fetch_assoc($hasil)): ?>
                        <tr>
                            <td data-label="No"><?= $no++ ?></td>
                            <td data-label="Nama"><strong><?= e($siswa['nama']) ?></strong></td>
                            <td data-label="Alamat"><?= nl2br(e($siswa['alamat'])) ?></td>
                            <td data-label="Jenis Kelamin">
                                <span class="badge <?= $siswa['jenis_kelamin'] === 'Perempuan' ? 'badge-pink' : 'badge-blue' ?>">
                                    <?= e($siswa['jenis_kelamin']) ?>
                                </span>
                            </td>
                            <td data-label="Agama"><?= e($siswa['agama']) ?></td>
                            <td data-label="Sekolah Asal"><?= e($siswa['sekolah_asal']) ?></td>
                            <td data-label="Aksi" class="aksi">
                                <a href="edit.php?id=<?= (int) $siswa['id'] ?>" class="btn btn-warning btn-sm">Edit</a>
                                <form action="hapus.php" method="post" class="form-inline"
                                      onsubmit="return confirm(<?= e(json_encode('Yakin ingin menghapus data ' . $siswa['nama'] . '?')) ?>);">
                                    <input type="hidden" name="id" value="<?= (int) $siswa['id'] ?>">
                                    <button type="submit" class="btn btn-danger btn-sm">Hapus</button>
                                </form>
                            </td>
                        </tr>
                    <?php endwhile; ?>
                <?php endif; ?>
                </tbody>
            </table>
        </div>
    </section>
</main>

<footer class="footer">
    &copy; <?= date('Y') ?> SMK Coding &mdash; Aplikasi PSB dengan PHP Native &amp; MySQL
</footer>

</body>
</html>
<?php
mysqli_free_result($hasil);
mysqli_close($koneksi);
?>
