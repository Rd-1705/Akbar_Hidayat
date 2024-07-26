// fungsi untuk mamuat gambar slide 

let start = 0;
otomatis();

function otomatis() {
    const slider = document.querySelectorAll('.slide'); // mengambil semua element pada class slide
    for (let i = 0; i < slider.length; i++) {
        slider[i].style.display = 'none'; // menyembunyikan setiap element dengan menggunakan properti display
    }
    if (start >= slider.length) {
        start = 0;
        // jika nilai start besar dari atau sama besar dengan panjang/banyak nya element pada silde, maka start berubah menjadi 0
    }
    slider[start].style.display = 'block'; // menampilkan element yang sesuai dengan start
    start++; 
    setTimeout(otomatis, 2000); // memanggil fungtion otomatis setelah 2 detik 
}

document.addEventListener('DOMContentLoaded', init); // memanggi fungtion init ketika dom sudah di muat semua nya 

// fungtion untuk mengambil data dari api 
async function fetchData() {
    try {
        const response = await fetch('https://rd-motor-akbar.vercel.app/api/datas'); // menunggu data dari fetch selesai di ambil dan di simpan ke dalam variabel response
        if (!response.ok) {
            throw new Error(`data error! status: ${response.status}`); 
        }
        const data = await response.json();// menunggu dan mengubah proses data menjadi objek json
        return data;
    } catch (error) {// jika saat pengembalian data terjadi eror akan melemparkan kata kata pada console
        console.error('pengambilan data api eror:', error);
    }
}

//fungtion untuk menampilkan informasi data motor 
function displayMotor(motor) {
    const div = document.querySelector('#produk-container');

    const figure = document.createElement('figure');// membuat valiabel figure dengan element figure
    const image = document.createElement('img');
    image.setAttribute('src', motor.image); // mengatur atribut src untuk img.

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

    figcaption.appendChild(name); //menambahkan valiabel name kedalam ficagtion 
    figcaption.appendChild(price);
    figcaption.appendChild(button);
    figure.appendChild(image);
    figure.appendChild(figcaption);
    div.appendChild(figure); // menambahkan valibel figure ke dalam div dengan id produk-container
}

//fungtion untuk menampilkan motor bersadarkan kategori
function displayCategory(data, category) {
    let ids;
    if (category === 'matic') {
        ids = [1, 4, 15, 14];
    } else if (category === 'sport') {
        ids = [7, 8, 21, 22];
    } else if (category === 'cub') {
        ids = [9, 24, 26, 27];
    }

    const filterData = data.filter(item => ids.includes(item.id));// mefilter berdasarkan id dengan variabel ids
    const container = document.getElementById('produk-container');
    while (container.firstChild) { // Hapus semua anak elemen dalam container.
        container.removeChild(container.firstChild);
    }

    filterData.forEach(motor => { // melakukan perulangan dari data ynag sudah di filter
        const element = displayMotor(motor);
        if (element) {
            container.appendChild(element);
        }
    });
}

async function init() {
    const data = await fetchData(); // mengambil data dari api 
    if (data) {
        displayCategory(data, 'matic'); // memapilkan secara default
        const links = document.querySelectorAll('.navbar .a a');
        links.forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault(); 
                const category = event.target.getAttribute('data-category');// mengambil atirbut data-categori 
                displayCategory(data, category);// menampilkan katefori berdasarkan atribut data-category
            });
        });

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
                        lissContainer.removeChild(lissContainer.firstChild); // menghapus semua anak element dalam lissContainer
                    }
                });
                lissContainer.appendChild(div);// menambahkan div valiabel liss ke dalam variabel lissContainer 
            });
        });

        searchForm.addEventListener('submit', function (event) {    
            event.preventDefault();
            const searc = searchInput.value.toLowerCase();
            const filterData = data.filter(p => p.name.toLowerCase().includes(searc));// memfilter data berdasarkan searc
            localStorage.setItem('searc', JSON.stringify(filterData)); //memnyimpan hasil pencaharian ke dalam localStorange
            window.location.href = searchForm.action;// melempar ke url aksi from
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