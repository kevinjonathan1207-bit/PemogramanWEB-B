<?php
require 'koneksi.php';

$errors = [];
$data = [
    'nama'          => '',
    'alamat'        => '',
    'jenis_kelamin' => '',
    'agama'         => '',
    'sekolah_asal'  => '',
];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Ambil & trim input (abaikan jika bukan string)
    foreach ($data as $kolom => $nilai) {
        $data[$kolom] = isset($_POST[$kolom]) && is_string($_POST[$kolom]) ? trim($_POST[$kolom]) : '';
    }

    // Validasi sisi server
    if ($data['nama'] === '') {
        $errors['nama'] = 'Nama lengkap wajib diisi.';
    } elseif (mb_strlen($data['nama']) > 100) {
        $errors['nama'] = 'Nama maksimal 100 karakter.';
    }

    if ($data['alamat'] === '') {
        $errors['alamat'] = 'Alamat wajib diisi.';
    }

    if ($data['jenis_kelamin'] === '') {
        $errors['jenis_kelamin'] = 'Jenis kelamin wajib dipilih.';
    } elseif (!in_array($data['jenis_kelamin'], $opsi_jenis_kelamin, true)) {
        $errors['jenis_kelamin'] = 'Pilihan jenis kelamin tidak valid.';
    }

    if ($data['agama'] === '') {
        $errors['agama'] = 'Agama wajib dipilih.';
    } elseif (!in_array($data['agama'], $opsi_agama, true)) {
        $errors['agama'] = 'Pilihan agama tidak valid.';
    }

    if ($data['sekolah_asal'] === '') {
        $errors['sekolah_asal'] = 'Sekolah asal wajib diisi.';
    } elseif (mb_strlen($data['sekolah_asal']) > 100) {
        $errors['sekolah_asal'] = 'Sekolah asal maksimal 100 karakter.';
    }

    // Simpan jika valid (Prepared Statement)
    if (empty($errors)) {
        $sql  = "INSERT INTO siswa (nama, alamat, jenis_kelamin, agama, sekolah_asal) VALUES (?, ?, ?, ?, ?)";
        $stmt = mysqli_prepare($koneksi, $sql);

        if ($stmt) {
            mysqli_stmt_bind_param(
                $stmt,
                "sssss",
                $data['nama'],
                $data['alamat'],
                $data['jenis_kelamin'],
                $data['agama'],
                $data['sekolah_asal']
            );

            if (mysqli_stmt_execute($stmt)) {
                mysqli_stmt_close($stmt);
                header("Location: index.php?pesan=tambah");
                exit;
            }
            $errors['db'] = 'Gagal menyimpan data: ' . mysqli_stmt_error($stmt);
            mysqli_stmt_close($stmt);
        } else {
            $errors['db'] = 'Gagal menyiapkan query: ' . mysqli_error($koneksi);
        }
    }
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tambah Pendaftar | Pendaftaran Siswa Baru</title>
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

<main class="container container-narrow">
    <section class="card">
        <div class="card-header">
            <div>
                <h2>Formulir Pendaftaran</h2>
                <p class="muted">Lengkapi data calon siswa di bawah ini.</p>
            </div>
            <a href="index.php" class="btn btn-secondary">&larr; Kembali</a>
        </div>

        <?php if (!empty($errors)): ?>
            <div class="alert alert-error">
                <?= isset($errors['db']) ? e($errors['db']) : 'Periksa kembali isian yang ditandai merah.' ?>
            </div>
        <?php endif; ?>

        <form action="tambah.php" method="post" class="form" novalidate>
            <div class="form-group <?= isset($errors['nama']) ? 'has-error' : '' ?>">
                <label for="nama">Nama Lengkap</label>
                <input type="text" id="nama" name="nama" maxlength="100"
                       placeholder="Contoh: Budi Santoso" value="<?= e($data['nama']) ?>">
                <?php if (isset($errors['nama'])): ?><small class="error-text"><?= e($errors['nama']) ?></small><?php endif; ?>
            </div>

            <div class="form-group <?= isset($errors['alamat']) ? 'has-error' : '' ?>">
                <label for="alamat">Alamat</label>
                <textarea id="alamat" name="alamat" rows="3"
                          placeholder="Alamat lengkap tempat tinggal"><?= e($data['alamat']) ?></textarea>
                <?php if (isset($errors['alamat'])): ?><small class="error-text"><?= e($errors['alamat']) ?></small><?php endif; ?>
            </div>

            <div class="form-group <?= isset($errors['jenis_kelamin']) ? 'has-error' : '' ?>">
                <span class="label">Jenis Kelamin</span>
                <div class="radio-group">
                    <?php foreach ($opsi_jenis_kelamin as $jk): ?>
                        <label class="radio">
                            <input type="radio" name="jenis_kelamin" value="<?= e($jk) ?>"
                                <?= $data['jenis_kelamin'] === $jk ? 'checked' : '' ?>>
                            <span><?= e($jk) ?></span>
                        </label>
                    <?php endforeach; ?>
                </div>
                <?php if (isset($errors['jenis_kelamin'])): ?><small class="error-text"><?= e($errors['jenis_kelamin']) ?></small><?php endif; ?>
            </div>

            <div class="form-group <?= isset($errors['agama']) ? 'has-error' : '' ?>">
                <label for="agama">Agama</label>
                <select id="agama" name="agama">
                    <option value="">-- Pilih Agama --</option>
                    <?php foreach ($opsi_agama as $ag): ?>
                        <option value="<?= e($ag) ?>" <?= $data['agama'] === $ag ? 'selected' : '' ?>><?= e($ag) ?></option>
                    <?php endforeach; ?>
                </select>
                <?php if (isset($errors['agama'])): ?><small class="error-text"><?= e($errors['agama']) ?></small><?php endif; ?>
            </div>

            <div class="form-group <?= isset($errors['sekolah_asal']) ? 'has-error' : '' ?>">
                <label for="sekolah_asal">Sekolah Asal</label>
                <input type="text" id="sekolah_asal" name="sekolah_asal" maxlength="100"
                       placeholder="Contoh: SMP Negeri 1 Jakarta" value="<?= e($data['sekolah_asal']) ?>">
                <?php if (isset($errors['sekolah_asal'])): ?><small class="error-text"><?= e($errors['sekolah_asal']) ?></small><?php endif; ?>
            </div>

            <div class="form-actions">
                <a href="index.php" class="btn btn-secondary">Batal</a>
                <button type="submit" class="btn btn-primary">Daftar</button>
            </div>
        </form>
    </section>
</main>

<footer class="footer">
    &copy; <?= date('Y') ?> SMK Coding &mdash; Aplikasi PSB dengan PHP Native &amp; MySQL
</footer>

</body>
</html>
