-- =========================================================
-- Database : db_psb
-- Aplikasi : CRUD Pendaftaran Siswa Baru (PSB)
-- =========================================================

CREATE DATABASE IF NOT EXISTS db_psb
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE db_psb;

DROP TABLE IF EXISTS siswa;

CREATE TABLE siswa (
  id            INT          NOT NULL AUTO_INCREMENT,
  nama          VARCHAR(100) NOT NULL,
  alamat        TEXT         NOT NULL,
  jenis_kelamin VARCHAR(20)  NOT NULL COMMENT 'Laki-laki / Perempuan',
  agama         VARCHAR(20)  NOT NULL COMMENT 'Islam / Kristen / Katolik / Hindu / Buddha / Konghucu',
  sekolah_asal  VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data dummy
INSERT INTO siswa (nama, alamat, jenis_kelamin, agama, sekolah_asal) VALUES
('Ahmad Fauzi',   'Jl. Merdeka No. 12, Bandung',          'Laki-laki', 'Islam',   'SMP Negeri 5 Bandung'),
('Maria Natalia', 'Jl. Diponegoro No. 45, Semarang',      'Perempuan', 'Katolik', 'SMP Pangudi Luhur Semarang'),
('I Made Surya',  'Jl. Raya Ubud No. 8, Gianyar, Bali',   'Laki-laki', 'Hindu',   'SMP Negeri 1 Ubud');
