class Gallery extends CRUD {
    static CURRENT_ALBUM_INDEX = 1;

    list = [];

    constructor(props) {
        super(props);
    }

    async getAllImages(albumIndex = Gallery.CURRENT_ALBUM_INDEX) {
        const allRawContacts = await this.get(`photos?albumId=${albumIndex}`);
        this.list = allRawContacts.map((item) => new Image(item));
        return this.list;
    }
}
