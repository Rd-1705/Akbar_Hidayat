function showLoginForm() { // membuatat fungtion 
    document.getElementById('login-container').style.display = 'block';
    document.getElementById('daftar-container').style.display = 'none';
    //memanggil element dan mengatur properti menjadi blok dan none
}

function showDaftarForm() { //membuat fungtion 
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('daftar-container').style.display = 'block';
    //memanggil element dan mengatur properti menjadi blok dan none

}

document.getElementById('daftar-link').addEventListener('click', function(event) {
    event.preventDefault();
    showDaftarForm();
});

document.getElementById('login-link').addEventListener('click', function(event) {
    event.preventDefault();
    showLoginForm();
});


document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const messageElement = document.getElementById('loginMessage');

    // Ambil data dari localStorage
    const user = JSON.parse(localStorage.getItem('user_' + username));

    if (user && user.password === password) {
        window.location.href = "../html/index.html";
    } else {
        messageElement.style.color = 'red';
        messageElement.textContent = 'Username atau password salah!';
    }
});

document.getElementById('daftarForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('daftarUsername').value;
    const email = document.getElementById('daftarEmail').value;
    const password = document.getElementById('daftarPassword').value;
    const messageElement = document.getElementById('daftarMessage');

    // Simpan data ke localStorage
    const user = {
        username: username,
        email: email,
        password: password
    };

    localStorage.setItem('user_' + username, JSON.stringify(user));
    window.location.href = "../html/index.html";

    // Kosongkan form
    document.getElementById('daftarForm').reset();
});

