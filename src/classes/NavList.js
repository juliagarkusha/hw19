class NavList extends CRUD {
    list = [];

    constructor(props) {
        super(props);
    }

    async getAllLinks(path) {
        const allRawLinks = await this.get(path);
        this.list = allRawLinks.map(item => new NavLink(item));

        return this.list;
    }
}