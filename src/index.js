'use strict'

const GALLERY_ALBUM_CLASS = 'gallery__album';
const GALLERY_NAV_LIST_CLASS = 'gallery__nav';
const NAV_LINK_ACTIVE_CLASS = 'navLink--active';

const galleryNavListContainer = document.querySelector(`.${GALLERY_NAV_LIST_CLASS}`);
const galleryAlbum = document.querySelector(`.${GALLERY_ALBUM_CLASS}`);

const gallery = new Gallery();
const navLinks = new NavList();

const renderNavLinks = (links) => {
    galleryNavListContainer.innerHTML = '';

    links.forEach(link => {
        link.render(galleryNavListContainer);
    });
}

const renderImages = (images) => {
    galleryAlbum.innerHTML = '';

    images.forEach(image => {
        image.render(galleryAlbum);
    });
}

gallery.getAllImages().then(renderImages);
navLinks.getAllLinks('albums').then(renderNavLinks);


const onGalleryNavListContainerClick = (event) => {
    const currentNav = event.target;
    const navLinkElement = currentNav.closest(`.${NavLink.NAV_LINK_CLASS}`);
    const nextAlbumIndex = navLinkElement.getAttribute('data-album');

    if(!navLinkElement) {
        return;
    }

    gallery.getAllImages(nextAlbumIndex).then(renderImages);
}


galleryNavListContainer.addEventListener('click', onGalleryNavListContainerClick);
