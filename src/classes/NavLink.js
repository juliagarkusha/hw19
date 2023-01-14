class NavLink extends CRUD {
    static NAV_LINK_CLASS = 'navLink';
    static NAV_LINK_ACTIVE_CLASS = 'navLink--active';

    constructor(props) {
        super(props);
        const { id, title } = props;
        this.id = id;
        this.title = title;
        this.isActive = false;
    }

    render(container) {
        const navLinkHtml = this.generateHtml();
        container.insertAdjacentHTML('beforeend', navLinkHtml);
    }

    generateHtml() {
        return `
            <span 
                class="${this.isActive ? `${NavLink.NAV_LINK_CLASS} ${NavLink.NAV_LINK_ACTIVE_CLASS}` : NavLink.NAV_LINK_CLASS}"
                data-album="${this.id}"
                data-active="${this.isActive}"
            >
                ${this.title}
            </span>
        `
    }
}