class NavList extends CRUD {
    list = [];

    constructor(props) {
        super(props);
    }

    async getAllLinks(path) {
        const allRawLinks = await this.get(path);
        this.list = allRawLinks.map(item => new NavLink(item));

        this.list[0].isActive = true;
        return this.list;
    }

    getCurrentLink() {
        const currentLink = this.list.find(item => item.isActive);
        return currentLink.id;
    }

    setCurrentLink(id) {
        this.list = this.list.map(item => {
            if(String(item.id) === String(id)) {
                item.isActive = true;
            } else {
                item.isActive = false;
            }

            return item;
        })

        return this.list;
    }
}