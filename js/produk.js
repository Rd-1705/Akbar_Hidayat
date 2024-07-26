
let start = 0;
otomatis();

function otomatis(){
    const slider = document.querySelectorAll('.slide');
    // console.log(slider);

    for (let i = 0; i < slider.length; i++){
        slider[i].style.display='none';
    }
    if(start >= slider.length){
        start = 0;
    }
    slider[start].style.display='block';
    start++;
    setTimeout(otomatis, 2000);
}



document.addEventListener('DOMContentLoaded', init);// memanggi fungtion init ketika dom sudah di muat semua nya 

// Function untuk mengambil data dari API
async function fetchData() {
    try {
        const response = await fetch('https://rd-motor-akbar.vercel.app/api/datas');
        if (!response.ok) {
            throw new Error(`data error! status: ${response.status}`);
        }
        const data = await response.json();// menunggu dan mengubah proses data menjadi objek json
        return data;
    } catch (error) {// jika saat pengembalian data terjadi eror akan melemparkan kata kata pada console
        console.error('pengambilan data api eror:', error);
    }
}

// fungtion untuk menampilkan informasi data motor
function displayMotor(motor) {
    const div = document.querySelector('#categori-motor');
    const figure = document.createElement('figure');// membuat valiabel figure dengan element figure
    const image = document.createElement('img');
    image.setAttribute('src',motor.image);// mengatur atribut src untuk img

    const figcaption = document.createElement('figcaption');
    const name = document.createElement('h3');
    name.textContent = motor.name;

    const price = document.createElement('h3');
    price.innerText = motor.price;

    const button = document.createElement('button');
    button.textContent = 'Selengkapnya';
    button.addEventListener('click', function () {
        localStorage.setItem('motor', JSON.stringify(motor));//simpan data motor ke dalam lokalstorange
        window.location.href = "../html/detail.html";
    });

    figcaption.appendChild(name);//menambahkan valiabel name kedalam figcaption 
    figcaption.appendChild(price);
    figcaption.appendChild(button);
    figure.appendChild(image);
    figure.appendChild(figcaption);
    div.appendChild(figure);// menambahkan valibel figure ke dalam div dengan id categori-motor
}

// Function untuk menampilkan data motor berdasarkan kategori
function displayCategory(data, category) {
    const filteredData = data.filter(item => item.categori.toLowerCase() === category.toLowerCase());
    const div = document.getElementById('categori-motor');
    div.textContent = ''; // Menghapus data sebelumnya yang ada di dalam div

    filteredData.forEach(motor => {
        displayMotor(motor);
    });
}

// Function untuk inisialisasi
async function init() {
    const data = await fetchData();// mengambil data dari api 
    if (data) {
        const link = new URLSearchParams(window.location.search);//Membuat objek URLSearchParams untuk menguraikan query string dari URL saat ini
        const category = link.get('category');//mengambil nilai dari parameter category 
        if (category) {
            displayCategory(data, category);
        } else {
            displayCategory(data, 'matic'); // Default kategori
        }

        const searchInput = document.getElementById('search-input');// pilih element berdasarkan input pencaharian
        const searchForm = document.getElementById('search-form');
        searchInput.addEventListener('input', function () {
            const input = this.value.toLowerCase();// mengambil value inputan dan mengubah nya ke menjadi huruf kecil 
            const lissContainer = document.getElementById('liss');
            while (lissContainer.firstChild) {
                lissContainer.removeChild(lissContainer.firstChild);//menghapus semua anak element dalam lisscontainer
            }

            if (input.length === 0) {
                return;
            }

            const liss = data.filter(p => p.name.toLowerCase().includes(input));// memfilter data berdasarkan inputan 
            liss.forEach(liss => {
                const div = document.createElement('div');
                div.className = 'liss-item';
                div.textContent = liss.name;//menyeting dan menyamakan teks dengan data liss
                div.addEventListener('click', () => {
                    searchInput.value = liss.name; // menyamakan inputan dengan data data liss
                    while (lissContainer.firstChild) {
                        lissContainer.removeChild(lissContainer.firstChild);
                    }
                });
                lissContainer.appendChild(div);
            });
        });

        searchForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const query = searchInput.value.toLowerCase();
            const filteredData = data.filter(p => p.name.toLowerCase().includes(query));// memfilter data berdasarkan searc
            localStorage.setItem('searc', JSON.stringify(filteredData));//memnyimpan hasil pencaharian ke dalam localStorange
            window.location.href = searchForm.action;//mengarahkan ke action dari form searc
        });
        
        const categoryLink = document.querySelectorAll('.category-link');//Mengambil semua elemen dengan kelas category-link dari DOM
        categoryLink.forEach(link => {
            link.addEventListener('click', function (event) { // menambahkan event klik pada class category-link
                event.preventDefault();
                const category = this.getAttribute('data-category'); // mengambil nilai atribut 
                displayCategory(data, category);//Memanggil fungsi displayCategory dengan data dan kategori yang diambil
            });
        });

    }
}


const div = document.querySelector('.h1-img');
const ft = document.createElement('img');
ft.setAttribute('src', '../aset/logo2.png');

div.appendChild(ft);

ft.addEventListener('click', function () {
    window.location.href = "../html/profile.html";
});