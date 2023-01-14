class Gallery extends CRUD {
    static GALLERY_NAV_CLASS = 'gallery__nav';
    static GALLERY_AlBUM_CLASS = 'gallery__album';
    static NAV_LINK_CLASS = 'navLink';
    
    imagesList = [];
    albumsList = [];

    constructor(props) {
        super();
        const { rootEl } = props;

        this.rootEl = rootEl;
        this.albumsEL = null;
        this.imagesEL = null;
        this.imagesList = [];
        this.albumsList = [];
    }
    
    render() {
        const navListHtml = this.generateLinkListHtml();
        const albumContainerHtml = this.generateAlbumHtml();
        
        this.rootEl.insertAdjacentHTML('beforeend', navListHtml);
        this.rootEl.insertAdjacentHTML('beforeend', albumContainerHtml);
        
        this.albumsEL = this.rootEl.children[0];
        this.imagesEL = this.rootEl.children[1];

        this.albumsEL.addEventListener('click', this.onAlbumsElClick.bind(this));

        this.getAllAlbums('albums')
            .then(albums => this.renderAlbumList(albums))
            .then(albums => this.getAllImages(this.getCurrentLink(this.albumsList)))
            .then(images => this.renderImages(images))
    }

    onAlbumsElClick(event) {
        const navLinkElement = event.target.closest(`.${Gallery.NAV_LINK_CLASS}`);
        const nextAlbumIndex = navLinkElement.getAttribute('data-album');

        if(!navLinkElement) {
            return;
        }

        this.renderAlbumList(this.setCurrentLink(nextAlbumIndex));
        this.getAllImages(nextAlbumIndex).then(images => this.renderImages(images));
    }

    renderAlbumList(albums) {
        this.albumsEL.innerHTML = '';

        albums.forEach(album => {
            album.render(this.albumsEL);
        });
    }

    renderImages(images) {
        this.imagesEL.innerHTML = '';

        images.forEach(image => {
            image.render(this.imagesEL);
        });
    }

    async getAllImages(albumIndex) {
        const allRawContacts = await this.get(`photos?albumId=${albumIndex}`);
        this.imagesList = allRawContacts.map((item) => new Image(item));
        return this.imagesList;
    }

    async getAllAlbums(path) {
        const allRawLinks = await this.get(path);
        this.albumsList = allRawLinks.map(item => new NavLink(item));

        this.albumsList[0].isActive = true;
        return this.albumsList;
    }

    getCurrentLink(albumsList) {
        const currentLink = albumsList.find(item => item.isActive);
        return currentLink.id;
    }

    setCurrentLink(id) {
        this.albumsList = this.albumsList.map(item => {
            item.isActive = String(item.id) === String(id);
            return item;
        })

       return this.albumsList;
    }

    generateLinkListHtml() {
        return `
            <nav class="${Gallery.GALLERY_NAV_CLASS}"></nav>
        `
    }

    generateAlbumHtml() {
        return `
            <div class="${Gallery.GALLERY_AlBUM_CLASS}"></div>
        `
    }
}
