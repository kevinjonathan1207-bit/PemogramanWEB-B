
let students = [
    { 
        nrp: "5025251080", 
        nama: "Kevin Jonathan", 
        jurusan: "Teknik Informatika", 
        email: "5025251080@student.its.ac.id" 
    }
];

// Elemen DOM
const studentForm = document.getElementById('studentForm');
const nrpInput = document.getElementById('NRP');
const namaInput = document.getElementById('nama');
const jurusanSelect = document.getElementById('jurusan');
const emailInput = document.getElementById('email');
const editIndexInput = document.getElementById('editIndex');
const tableBody = document.getElementById('studentTableBody');
const searchInput = document.getElementById('searchInput');
const dataCountLabel = document.getElementById('dataCount');

// Inisialisasi Tampilan Saat Halaman Dimuat
document.addEventListener('DOMContentLoaded', () => {
    renderTable(students);
});

// Fungsi Render Tabel
function renderTable(dataList = students) {
    tableBody.innerHTML = '';

    if (dataList.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:#94a3b8;">Data tidak ditemukan</td></tr>`;
        dataCountLabel.innerText = 'Menampilkan 0 data';
        return;
    }

    dataList.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${student.nrp}</td>
            <td>${student.nama}</td>
            <td>${student.jurusan}</td>
            <td>${student.email}</td>
            <td>
                <div class="actions">
                    <button class="action edit" onclick="editStudent(${index})">
                        <i class="fa-solid fa-pen"></i>
                    </button>
                    <button class="action delete" onclick="deleteStudent(${index})">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });

    dataCountLabel.innerText = `Menampilkan 1-${dataList.length} dari ${students.length} data`;
}

// Handler Submit Form (Tambah / Edit Data)
studentForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const nrp = nrpInput.value.trim();
    const nama = namaInput.value.trim();
    const jurusan = jurusanSelect.value;
    const email = emailInput.value.trim();
    const editIndex = parseInt(editIndexInput.value);

    if (editIndex === -1) {
        // Mode Tambah Data Baru
        students.push({ nrp, nama, jurusan, email });
    } else {
        // Mode Edit Data
        students[editIndex] = { nrp, nama, jurusan, email };
    }

    resetForm();
    renderTable(students);
});

// Fungsi Edit Data (Mengisi Form Kembali)
function editStudent(index) {
    const student = students[index];
    nrpInput.value = student.nrp;
    namaInput.value = student.nama;
    jurusanSelect.value = student.jurusan;
    emailInput.value = student.email;
    editIndexInput.value = index;
}

// Fungsi Hapus Data
function deleteStudent(index) {
    if (confirm(`Apakah Anda yakin ingin menghapus data ${students[index].nama}?`)) {
        students.splice(index, 1);
        resetForm();
        renderTable(students);
    }
}

// Fungsi Reset Form
function resetForm() {
    studentForm.reset();
    editIndexInput.value = "-1";
}

// Fungsi Pencarian Data
function searchData() {
    const keyword = searchInput.value.toLowerCase();
    const filteredStudents = students.filter(student => {
        return student.nrp.toLowerCase().includes(keyword) ||
               student.nama.toLowerCase().includes(keyword) ||
               student.jurusan.toLowerCase().includes(keyword) ||
               student.email.toLowerCase().includes(keyword);
    });
    renderTable(filteredStudents);
}