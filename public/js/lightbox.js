'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// al hacer click en una imagem se abra su ventana grande
var getImage = function getImage(container) {
    return [].concat(_toConsumableArray(container.querySelectorAll('img')));
};
var getLargeImagenes = function getLargeImagenes(gallery) {
    return gallery.map(function (el) {
        return el.src;
    }).map(function (el) {
        return el.replace('min', 'large');
    });
};
var getDescriptions = function getDescriptions(gallery) {
    return gallery.map(function (el) {
        return el.alt;
    });
};
var openLightBoxEvent = function openLightBoxEvent(container, gallery) {
    container.addEventListener('click', function (e) {
        var el = e.target,
            i = gallery.indexOf(el);
        if (el.tagName === 'IMG') {
            openLightbox(gallery, i, large, descriptions);
        }
    });
};
//console.log(getLargeImagenes(getImage(document.querySelector('.gallery-container'))));
var openLightbox = function openLightbox(gallery, i, large, descriptions) {
    //abrir lightbox al pulsar el parametro image
    var lightboxElement = document.createElement('div');
    lightboxElement.innerHTML = '\n    <div class="lightbox-overlay">\n       <figure class="lightbox-container">\n          <img src="' + large[i] + '" class="lightbox-image">\n          <figcaption>\n            <p class="lightbox-description">' + descriptions[i] + '</p>\n            <nav class="lightbox-navigation">\n              <a href="#" class="lightbox-navigation__button prev"></a>\n              <span class="lightbox-navigation__counter">Imagen ' + (i + 1) + ' de ' + gallery.length + '</span>\n              <a href="#" class="lightbox-navigation__button next"></a>\n            </nav>\n          </figcaption>\n       </figure> \n    </div>';
    lightboxElement.id = 'lightbox';
    document.body.appendChild(lightboxElement);
};

//se abre en un overlay
// ese overlay debe poder cerrarse

//al abrirse la version grande debe  tener lo siguiente
//descripcion de la imagem(que se tomara del atributo)
// navegacion entre la imagen siguiente