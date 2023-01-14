class Image {
    static IMAGE_CLASS = 'image';
    static IMAGE_TEXT_CLASS = 'image__text';

    constructor(props) {
        const { albumId, title, url } = props;
        this.src = url;
        this.alt = title;
        this.currentAlbumId = albumId;
    }

    render(container) {
        const imageHtml = this.generateHTML();
        container.insertAdjacentHTML('beforeend', imageHtml);
    }

    generateHTML() {
        return `
            <div>
                <img 
                    class=${Image.IMAGE_CLASS}
                    src="${this.src}" 
                    alt="${this.alt}" 
                    data-album="${this.currentAlbumId}" 
                />
                <p class=${Image.IMAGE_TEXT_CLASS}>${this.alt}</p>
            </div>
        `
    }
}