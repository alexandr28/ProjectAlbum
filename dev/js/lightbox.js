// al hacer click en una imagem se abra su ventana grande
const getImage = container => [...container.querySelectorAll('img')];
const getLargeImagenes = gallery => gallery
    .map(el => el.src)
    .map(el => el.replace('min','large'));
const getDescriptions = gallery=> gallery.map(el=>el.alt);
const openLightBoxEvent = (container,gallery) =>{
    container.addEventListener('click', e =>{
        let el = e.target,
            i= gallery.indexOf(el);
        if(el.tagName === 'IMG'){
            openLightbox(gallery,i,large,descriptions);
        }
    });
};
//console.log(getLargeImagenes(getImage(document.querySelector('.gallery-container'))));
let openLightbox = (gallery,i,large,descriptions) =>{
    //abrir lightbox al pulsar el parametro image
    let lightboxElement = document.createElement('div');
    lightboxElement.innerHTML= `
    <div class="lightbox-overlay">
       <figure class="lightbox-container">
          <img src="${large[i]}" class="lightbox-image">
          <figcaption>
            <p class="lightbox-description">${descriptions[i]}</p>
            <nav class="lightbox-navigation">
              <a href="#" class="lightbox-navigation__button prev"></a>
              <span class="lightbox-navigation__counter">Imagen ${i+1} de ${gallery.length}</span>
              <a href="#" class="lightbox-navigation__button next"></a>
            </nav>
          </figcaption>
       </figure> 
    </div>`;
    lightboxElement.id = 'lightbox';
    document.body.appendChild(lightboxElement);
};


//se abre en un overlay
// ese overlay debe poder cerrarse

//al abrirse la version grande debe  tener lo siguiente
//descripcion de la imagem(que se tomara del atributo)
// navegacion entre la imagen siguiente