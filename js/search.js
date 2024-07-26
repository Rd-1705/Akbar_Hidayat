//===================== kodingan untuk luar search =======================

let data = JSON.parse(localStorage.getItem('searc')) || []; // membuat valiabel data untuk menampung data yang di simpan didalam localStorange
// jika tidak ada data, maka akan menginialisasi data dengan aray kosong 



const displayProducts = (products) => {
    let content = document.querySelector('#content');
    while (content.firstChild) {
        content.removeChild(content.firstChild);
    }
//mengambil element dengan id content dan menghapus semua anak elemennya 
    products.forEach((p) => {
        const figure = document.createElement('figure');// membuat valiabel figure dengan element figure
        const image = document.createElement('img');
        image.setAttribute('src', p.image);

        const figcaption = document.createElement('figcaption');
        const name = document.createElement('h3');
        name.textContent = p.name;

        const price = document.createElement('h3');
        price.innerText = p.price;

        const button = document.createElement('button');
        button.textContent = 'Detail Produk';
        button.addEventListener('click', function () {
            localStorage.setItem('motor', JSON.stringify(p));//simpan data p ke dalam lokalstorange
            window.location.href = "../html/detail.html";
        });

        figcaption.appendChild(name);//menambahkan valiabel name kedalam figcaption 
        figcaption.appendChild(price);
        figcaption.appendChild(button);
        figure.appendChild(image);
        figure.appendChild(figcaption);
        content.appendChild(figure);// menambahkan valibel figure ke dalam div dengan id content
    });
};

document.addEventListener('DOMContentLoaded', () => {
    displayProducts(data);// memanggi fungtion displayProduk ketika dom sudah di muat semua nya 

    const searchInput = document.getElementById('search-input');
    const searchForm = document.getElementById('search-form');

    searchInput.addEventListener('input', function () {// menambah event input pada searchInput untuk mencari produk 
        const input = this.value.toLowerCase();// mengambil value inputan dan mengubah nya ke menjadi huruf kecil 
        const lissContainer = document.getElementById('liss');
        while (lissContainer.firstChild) {
            lissContainer.removeChild(lissContainer.firstChild);//menghapus semua anak element dalam lissContainer
        }

        if (input.length === 0) {
            return;
        }// jika inputan kosong, keluar dari fungsi 

        const liss = data.filter(p => p.name.toLowerCase().includes(input));//Memfilter produk yang sesuai dengan input
        liss.forEach(liss => {
            const div = document.createElement('div'); //membuat elemen div untuk menampung setiap hasil
            div.className = 'liss-item';
            div.textContent = liss.name;
            div.addEventListener('click', () => {// menambahkan event listener clik untuk setiap listan pada div
                searchInput.value = liss.name;
                while (lissContainer.firstChild) {
                    lissContainer.removeChild(lissContainer.firstChild);
                }
                const filterData = data.filter(p => p.name.toLowerCase().includes(liss.name.toLowerCase()));
                displayProducts(filterData); // memanggil fungtion untuk menampilkan produk yang difilter
            });
            lissContainer.appendChild(div);
        });

        const filterProduct = data.filter(p => p.name.toLowerCase().includes(input));
        displayProducts(filterProduct);
        // Memfilter produk berdasarkan input dan menampilkannya
    });

    searchForm.addEventListener('submit', function (event) {// Menangani event submit pada form pencarian 
        event.preventDefault();
        const input = searchInput.value.toLowerCase();
        const filterData = data.filter(p => p.name.toLowerCase().includes(input));
        localStorage.setItem('searc', JSON.stringify(filterData));// menyimpan hasil pencarian ke local localStorage
        window.location.href = searchForm.action;//mengarahkan ke action dari form searc
    });
});


// // ============== untuk kodingan dalam halaman search =====================

const api = 'https://rd-motor-akbar.vercel.app/api/datas';// membuat variabel api untuk mengambil dan menampung data produk 


async function fetchProducts() {
    try {
        const response = await fetch(api); // Mengirim permintaan pengambilan data ke apiUrl dan menunggu responsnya
        if (!response.ok) {
            throw new Error('Terjadi kesalhan: ' + response.statusText);
        }
        // Jika respons tidak OK (status bukan 200-299), lempar error dengan pesan status teks
        const data = await response.json(); // mengubah variabel response menjadi objek JSON dan menunggu hingga proses selesai ditampusng pada variabel data
        return data;
    } catch (error) {
        console.error(error);
    }// Menangkap dan mencetak error jika terjadi kesalahan selama proses pengambilan data
}

// Menampilkan hasil pencarian yang disimpan di localStorage
const Products = (products) => {
    let content = document.querySelector('#content');
    while (content.firstChild) {
        content.removeChild(content.firstChild);
    }

    products.forEach((p) => {
        const figure = document.createElement('figure'); // membuat variabel figure dengan elemen figure
        const image = document.createElement('img');
        image.setAttribute('src', p.image);

        const figcaption = document.createElement('figcaption');
        const name = document.createElement('h3');
        name.textContent = p.name;

        const price = document.createElement('h3');
        price.innerText = p.price;

        const button = document.createElement('button');
        button.textContent = 'Detail Produk';
        button.addEventListener('click', function () {
            localStorage.setItem('motor', JSON.stringify(p)); // simpan data p ke dalam localStorage
            window.location.href = "../html/detail.html";
        });

        figcaption.appendChild(name); // menambahkan variabel name ke dalam figcaption 
        figcaption.appendChild(price);
        figcaption.appendChild(button);
        figure.appendChild(image);
        figure.appendChild(figcaption);
        content.appendChild(figure); // menambahkan variabel figure ke dalam div dengan id content
    });
};

document.addEventListener('DOMContentLoaded', async () => {
    const products = await fetchProducts();// Menunggu hingga data produk berhasil diambil oleh fungtion fetchProducts

    const searchInput = document.getElementById('search-input');
    const searchForm = document.getElementById('search-form');

    searchInput.addEventListener('input', function () {// menambah event input pada searchInput untuk mencari produk 
        const input = this.value.toLowerCase(); // mengambil nilai input dan mengubahnya menjadi huruf kecil
        const lissContainer = document.getElementById('liss');
        while (lissContainer.firstChild) {
            lissContainer.removeChild(lissContainer.firstChild); // menghapus semua anak elemen dalam lissContainer
        }

        if (input.length === 0) {
            return;
        }// jika inputan kosong, keluar dari fungsi 

        const liss = products.filter(p => p.name.toLowerCase().includes(input));//Memfilter produk yang sesuai dengan input
        liss.forEach(liss => {
            const div = document.createElement('div'); //membuat elemen div untuk menampung setiap hasil
            div.className = 'liss-item';
            div.textContent = liss.name;
            div.addEventListener('click', () => {// menambahkan event listener clik untuk setiap listan pada div
                searchInput.value = liss.name;
                while (lissContainer.firstChild) {
                    lissContainer.removeChild(lissContainer.firstChild);
                }
                const filterData = products.filter(p => p.name.toLowerCase().includes(liss.name.toLowerCase()));
                Products(filterData);// memanggil fungtion untuk menampilkan produk yang difilter
            });
            lissContainer.appendChild(div);
        });

        const filterProduct = products.filter(p => p.name.toLowerCase().includes(input));
        Products(filterProduct);
        // Memfilter produk berdasarkan input dan menampilkannya
    });

    searchForm.addEventListener('submit', function (event) {// Menangani event submit pada form pencarian 
        event.preventDefault();
        const input = searchInput.value.toLowerCase();
        const filterData = products.filter(p => p.name.toLowerCase().includes(input));
        localStorage.setItem('searc', JSON.stringify(filterData));// menyimpan hasil pencarian ke local localStorage
        window.location.href = searchForm.action;//mengarahkan ke action dari form searc
    });
});
