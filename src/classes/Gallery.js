class Gallery extends CRUD {
    list = [];

    constructor(props) {
        super(props);
    }

    async getAllImages(albumIndex) {
        const allRawContacts = await this.get(`photos?albumId=${albumIndex}`);
        this.list = allRawContacts.map((item) => new Image(item));
        return this.list;
    }
}
