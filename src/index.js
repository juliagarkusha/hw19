'use strict'

const GALLERY_CONTAINER_CLASS = 'gallery__container';

const galleryContainer = document.querySelector(`.${GALLERY_CONTAINER_CLASS}`);

const gallery = new Gallery({
    rootEl: galleryContainer,
});

gallery.render();

console.log('debug 111: ', 111);

