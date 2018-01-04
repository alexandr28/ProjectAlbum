'use strict';

var toggle = document.getElementById('toggle-menu'),
    nav = document.getElementById('nav');
toggle.addEventListener('click', function () {
    nav.classList.toggle('show');
});