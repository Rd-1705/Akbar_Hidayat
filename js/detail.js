let start = 0;
otomatis();

function otomatis() {
  const slider = document.querySelectorAll('.slide');
  
  for (let i = 0; i < slider.length; i++) {
    slider[i].style.display = 'none';
  }
  if (start >= slider.length) {
    start = 0;
  }
  slider[start].style.display = 'block';
  start++;
  setTimeout(otomatis, 2000);
}

function pencaharian() {
  const searchInput = document.getElementById('search-input'); //  Mengambil elemen input pencarian
  const searchForm = document.getElementById('search-form'); // Mengambil elemen form pencarian
  searchInput.addEventListener('input', function () {
    const input = this.value.toLowerCase();
    const lissContainer = document.getElementById('liss'); // Mengambil elemen kontainer untuk saran pencarian
    while (lissContainer.firstChild) {
      lissContainer.removeChild(lissContainer.firstChild);
    }

    if (input.length === 0) { 
      return;
    }// Jika input kosong, keluar dari fungsi

    const liss = data.filter(p => p.name.toLowerCase().includes(input)); // Memfilter data untuk mencari saran yang sesuai dengan input
    liss.forEach(liss => {
      const div = document.createElement('div');// Untuk setiap saran, buat elemen div baru dengan class liss-item dan teks sesuai nama saran
     
      div.className = 'liss-item';
      div.textContent = liss.name;
      div.addEventListener('click', () => { // Tambahkan event listener untuk mengisi input pencarian dengan nama saran saat diklik
        searchInput.value = liss.name;
        while (lissContainer.firstChild) {
          lissContainer.removeChild(lissContainer.firstChild);
        }
      });
      lissContainer.appendChild(div);
    });
  });

  searchForm.addEventListener('submit', function (event) { // Menambahkan event listener untuk menangani event submit pada form pencarian
    event.preventDefault();
    const query = searchInput.value.toLowerCase();
    const filterData = data.filter(p => p.name.toLowerCase().includes(query));// Memfilter data untuk mencari hasil pencarian yang sesuai dengan input
    localStorage.setItem('searc', JSON.stringify(filterData)); // Menyimpan hasil pencarian di localStorage
    window.location.href = searchForm.action; //Mengarahkan pengguna ke URL yang ditentukan oleh atribut action dari form pencarian.
  });
}

const productContainer = document.querySelector('#products');

window.addEventListener('DOMContentLoaded', () => { //Menambahkan event listener untuk menangani event DOMContentLoaded untuk memastikan DOM telah dimuat sepenuhnya
  const data = JSON.parse(localStorage.getItem('motor')) ?? {}; //Mengambil data produk dari localStorage dan mengubahnya menjadi objek JSON

  const figure = document.createElement('figure');
  figure.classList.add('figure');

  const image = document.createElement('img');
  image.setAttribute('src', data.image ?? '');
  figure.appendChild(image);

  const figcaption = document.createElement('figcaption');
  figcaption.classList.add('figcaption');

  const title = document.createElement('h2');
  title.textContent = data.name ?? '';
  figcaption.appendChild(title);

  const price = document.createElement('h3');
  price.textContent = data.price ?? '';
  figcaption.appendChild(price);

  // Color Slider Section
  const color = document.createElement('div');
  color.classList.add('color-slider');
  figcaption.appendChild(color);

  // Add left and right arrow icons
  const kiri = document.createElement('i');
  kiri.classList.add('bx', 'bx-left-arrow-circle');
  color.appendChild(kiri);

  const kanan = document.createElement('i');
  kanan.classList.add('bx', 'bx-right-arrow-circle');
  color.appendChild(kanan);

  const colorSlides = document.createElement('div');
  colorSlides.classList.add('color-slides');
  color.appendChild(colorSlides);

  for (const colorLink of data.color ?? []) {
    const colorSlide = document.createElement('div');
    colorSlide.classList.add('color-slide');
    const colorImage = document.createElement('img');
    colorImage.setAttribute('src', colorLink);
    colorSlide.appendChild(colorImage);
    colorSlides.appendChild(colorSlide);
  }

  // Navigation Dots untuk detail mesin 
  const navigationDots = document.createElement('div');
  navigationDots.classList.add('navigation-dots');
  figcaption.appendChild(navigationDots);

  (data.color ?? []).forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    dot.addEventListener('click', () => cariColorSlide(index)); // Membuat elemen div baru untuk setiap dot/data detail mesin
    navigationDots.appendChild(dot);
  });

  let colorStart = 0; //  Mendeklarasikan variabel colorStart dengan nilai awal 0
  const dots = document.querySelectorAll('.dot'); // Mengambil semua elemen dengan class dot
  if (dots.length > 0) {
    dots[colorStart].classList.add('active'); // Jika ada dot, tambahkan class active pada dot yang sesuai dengan indeks colorStart
  }

  function cariColorSlide(index) {
    const slides = document.querySelectorAll('.color-slide'); // Mengambil semua elemen dengan class color-slide.
    if (slides.length > 0) {
      colorSlides.style.transform = `translateX(-${index * 100}%)`; //  Jika ada slide, ubah posisi colorSlides menggunakan transformasi translateX berdasarkan indeks
      if (dots.length > 0) {
        dots[colorStart].classList.remove('active');
        colorStart = index;
        dots[colorStart].classList.add('active');
      }
    }
  }

  kanan.addEventListener('click', () => {
    colorStart = (colorStart + 1) % (data.color?.length ?? 1);
    //Meningkatkan nilai colorStart sebesar 1, yang berarti menggeser ke slide warna berikutnya
    // Menggunakan optional chaining untuk mengakses panjang array color dari data. Jika data.color tidak ada, nilai defaultnya adalah 1.
    //Operator modulo digunakan untuk memastikan bahwa jika colorStart mencapai akhir array color, ia akan kembali ke awal.
    cariColorSlide(colorStart);
  });

  kiri.addEventListener('click', () => {
    colorStart = (colorStart - 1 + (data.color?.length ?? 1)) % (data.color?.length ?? 1);
    cariColorSlide(colorStart);
  });

  const buttonDet = document.createElement('button');
  buttonDet.textContent = 'Detail Mesin';
  figcaption.appendChild(buttonDet);

  let deskripsiVisible = false;

  buttonDet.addEventListener('click', function () {
    const detailDeskripsi = document.querySelector('.deskribsi'); //Mencari elemen dengan class deskribsi dalam dokumen dan menyimpannya dalam variabel
    if (detailDeskripsi) {  //Mengecek apakah elemen existingDeskripsi ada. Jika ya, blok kode di dalam if akan dijalankan.
      detailDeskripsi.remove(); // Menghapus elemen detailDeskripsi dari DOM.
      deskripsiVisible = false; // Mengatur variabel deskripsiVisible menjadi false untuk menunjukkan bahwa deskripsi tidak lagi terlihat
    } else {
      const deskripsi = document.createElement('ul'); //Membuat elemen ul baru dan menyimpannya dalam variabel deskripsi
      deskripsi.classList.add('deskribsi'); // Menambahkan class deskribsi pada elemen ul yang baru dibuat.
      figcaption.appendChild(deskripsi);

      for (const key in data.desc ?? {}) { // Melakukan pengecekan melalui setiap properti dalam objek data.desc. data.desc ?? {} memastikan 
        const deskrib = document.createElement('li'); //Membuat elemen li baru dan menyimpannya dalam variabel deskrib
        deskrib.textContent = `${key}: ${data.desc[key] ?? ''}`; // Mengatur teks dalam elemen li dengan format key: value. data.desc[key] ?? '' memastikan bahwa jika data.desc[key] adalah null atau undefined, ia akan diubah menjadi string kosong ''
        deskripsi.appendChild(deskrib);
      }
      deskripsiVisible = true; // Mengatur variabel deskripsiVisible menjadi true untuk menunjukkan bahwa deskripsi sekarang terlihat
    }
  });

  figure.appendChild(figcaption);
  productContainer.appendChild(figure);
});


const div = document.querySelector('.h1-img');
const ft = document.createElement('img');
ft.setAttribute('src', '../aset/logo2.png');

div.appendChild(ft);

ft.addEventListener('click', function () {
    window.location.href = "../html/profile.html";
});