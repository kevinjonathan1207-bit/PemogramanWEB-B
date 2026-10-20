// Daftar seluruh provinsi di Indonesia (38 provinsi)
var DAFTAR_PROVINSI = [
  "Aceh",
  "Sumatera Utara",
  "Sumatera Barat",
  "Riau",
  "Kepulauan Riau",
  "Jambi",
  "Sumatera Selatan",
  "Kepulauan Bangka Belitung",
  "Bengkulu",
  "Lampung",
  "DKI Jakarta",
  "Banten",
  "Jawa Barat",
  "Jawa Tengah",
  "DI Yogyakarta",
  "Jawa Timur",
  "Bali",
  "Nusa Tenggara Barat",
  "Nusa Tenggara Timur",
  "Kalimantan Barat",
  "Kalimantan Tengah",
  "Kalimantan Selatan",
  "Kalimantan Timur",
  "Kalimantan Utara",
  "Sulawesi Utara",
  "Gorontalo",
  "Sulawesi Tengah",
  "Sulawesi Barat",
  "Sulawesi Selatan",
  "Sulawesi Tenggara",
  "Maluku",
  "Maluku Utara",
  "Papua",
  "Papua Barat",
  "Papua Barat Daya",
  "Papua Selatan",
  "Papua Tengah",
  "Papua Pegunungan"
];

// Data kode pos hanya tersedia untuk Kota Surabaya (Provinsi Jawa Timur).
// Format: "Kecamatan": [ ["Kelurahan", kodePos], ... ]
var DATA_SURABAYA = {
  "Asemrowo": [
    ["Asem Rowo", 60182],
    ["Genting Kalianak", 60183],
    ["Tambak Sarioso", 60184]
  ],
  "Benowo": [
    ["Kandangan", 60199],
    ["Romokalisari", 60192],
    ["Sememi", 60198],
    ["Tambak Osowilangun", 60191]
  ],
  "Bubutan": [
    ["Alun-Alun Contong", 60174],
    ["Bubutan", 60174],
    ["Gundih", 60172],
    ["Jepara", 60171],
    ["Tembok Dukuh", 60173]
  ],
  "Bulak": [
    ["Bulak", 60124],
    ["Kedung Cowek", 60125],
    ["Kenjeran", 60123],
    ["Sukolilo Baru", 60122]
  ],
  "Dukuh Pakis": [
    ["Dukuh Kupang", 60225],
    ["Dukuh Pakis", 60225],
    ["Gunung Sari", 60224],
    ["Pradah Kali Kendal", 60226]
  ],
  "Gayungan": [
    ["Dukuh Menanggal", 60234],
    ["Gayungan", 60235],
    ["Ketintang", 60231],
    ["Menanggal", 60234]
  ],
  "Genteng": [
    ["Embong Kaliasin", 60271],
    ["Genteng", 60275],
    ["Kapasari", 60273],
    ["Ketabang", 60272],
    ["Peneleh", 60274]
  ],
  "Gubeng": [
    ["Airlangga", 60286],
    ["Baratajaya", 60284],
    ["Kertajaya", 60282],
    ["Mojo", 60285],
    ["Pucang Sewu", 60283]
  ],
  "Gunung Anyar": [
    ["Gunung Anyar", 60294],
    ["Gunung Anyar Tambak", 60294],
    ["Rungkut Menanggal", 60293],
    ["Rungkut Tengah", 60293]
  ],
  "Jambangan": [
    ["Jambangan", 60232],
    ["Karah", 60232],
    ["Kebonsari", 60233],
    ["Pagesangan", 60233]
  ],
  "Karangpilang": [
    ["Karangpilang", 60221],
    ["Kebraon", 60222],
    ["Kedurus", 60223],
    ["Warugunung", 60221]
  ],
  "Kenjeran": [
    ["Bulak Banteng", 60127],
    ["Sidotopo Wetan", 60128],
    ["Tambak Wedi", 60126],
    ["Tanah Kali Kedinding", 60129]
  ],
  "Krembangan": [
    ["Dupak", 60179],
    ["Kemayoran", 60176],
    ["Krembangan Selatan", 60175],
    ["Morokrembangan", 60178],
    ["Perak Barat", 60177]
  ],
  "Lakarsantri": [
    ["Bangkingan", 60214],
    ["Jeruk", 60212],
    ["Lakarsantri", 60211],
    ["Lidah Kulon", 60213],
    ["Lidah Wetan", 60213],
    ["Sumur Welut", 60215]
  ],
  "Mulyorejo": [
    ["Dukuh Sutorejo", 60113],
    ["Kalijudan", 60114],
    ["Kalisari", 60112],
    ["Kejawaan Putih Tambak", 60112],
    ["Manyar Sabrangan", 60116],
    ["Mulyorejo", 60115]
  ],
  "Pabean Cantikan": [
    ["Bongkaran", 60161],
    ["Krembangan Utara", 60163],
    ["Nyamplungan", 60162],
    ["Perak Timur", 60164],
    ["Perak Utara", 60165]
  ],
  "Pakal": [
    ["Babat Jerawat", 60197],
    ["Benowo", 60195],
    ["Pakal", 60196],
    ["Sumber Rejo", 60192]
  ],
  "Rungkut": [
    ["Kalirungkut", 60293],
    ["Kedung Baruk", 60298],
    ["Medokan Ayu", 60295],
    ["Penjaringansari", 60297],
    ["Rungkut Kidul", 60293],
    ["Wonorejo", 60296]
  ],
  "Sambikerep": [
    ["Bringin", 60218],
    ["Lontar", 60216],
    ["Made", 60219],
    ["Sambikerep", 60217]
  ],
  "Sawahan": [
    ["Banyu Urip", 60254],
    ["Kupang Krajan", 60253],
    ["Pakis", 60256],
    ["Petemon", 60252],
    ["Putat Jaya", 60255],
    ["Sawahan", 60251]
  ],
  "Semampir": [
    ["Ampel", 60151],
    ["Pegirian", 60153],
    ["Sidotopo", 60152],
    ["Ujung", 60155],
    ["Wonokusumo", 60154]
  ],
  "Simokerto": [
    ["Kapasan", 60141],
    ["Sidodadi", 60145],
    ["Simokerto", 60143],
    ["Simolawang", 60144],
    ["Tambakrejo", 60142]
  ],
  "Sukolilo": [
    ["Gebang Putih", 60117],
    ["Keputih", 60111],
    ["Klampis Ngasem", 60117],
    ["Medokan Semampir", 60119],
    ["Menur Pumpungan", 60118],
    ["Nginden Jangkungan", 60118],
    ["Semolowaru", 60119]
  ],
  "Sukomanunggal": [
    ["Putat Gede", 60189],
    ["Simomulyo", 60281],
    ["Simomulyo Baru", 60281],
    ["Sonokwijenan", 60189],
    ["Sukomanunggal", 60188],
    ["Tanjungsari", 60187]
  ],
  "Tambaksari": [
    ["Dukuh Setro", 60138],
    ["Gading", 60134],
    ["Kapas Madya Baru", 60137],
    ["Pacar Keling", 60131],
    ["Pacar Kembang", 60132],
    ["Ploso", 60133],
    ["Rangkah", 60135],
    ["Tambaksari", 60136]
  ],
  "Tandes": [
    ["Balongsari", 60186],
    ["Banjar Sugihan", 60185],
    ["Karangpoh", 60186],
    ["Manukan Kulon", 60185],
    ["Manukan Wetan", 60184],
    ["Tandes", 60187]
  ],
  "Tegalsari": [
    ["Dr. Soetomo", 60264],
    ["Kedungdoro", 60261],
    ["Keputran", 60265],
    ["Tegalsari", 60262],
    ["Wonorejo", 60263]
  ],
  "Tenggilis Mejoyo": [
    ["Kendangsari", 60292],
    ["Kutisari", 60291],
    ["Panjang Jiwo", 60299],
    ["Tenggilis Mejoyo", 60292]
  ],
  "Wiyung": [
    ["Babatan", 60227],
    ["Balas Klumprik", 60222],
    ["Jajar Tunggal", 60229],
    ["Wiyung", 60228]
  ],
  "Wonocolo": [
    ["Bendul Merisi", 60239],
    ["Jemur Wonosari", 60237],
    ["Margorejo", 60238],
    ["Sidosermo", 60239],
    ["Siwalankerto", 60236]
  ],
  "Wonokromo": [
    ["Darmo", 60241],
    ["Jagir", 60244],
    ["Ngagel", 60246],
    ["Ngagel Rejo", 60245],
    ["Sawunggaling", 60242],
    ["Wonokromo", 60243]
  ]
};
