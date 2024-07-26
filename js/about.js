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

const div = document.querySelector('.h1-img');
const ft = document.createElement('img');
ft.setAttribute('src', '../aset/logo2.png');

div.appendChild(ft);

ft.addEventListener('click', function () {
    window.location.href = "../html/profile.html";
});