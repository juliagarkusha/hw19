class NavLink extends CRUD {
    static NAV_LINK_CLASS = 'navLink';

    constructor(props) {
        super(props);
        const { id, title } = props;
        this.id = id;
        this.title = title;
    }

    render(container) {
        const navLinkHtml = this.generateHtml();
        container.insertAdjacentHTML('beforeend', navLinkHtml);
        container.addEventListener('click', this.onContainerClick);
    }

    onContainerClick(event) {
        const navLinkElement = event.target.closest(`.${NavLink.NAV_LINK_CLASS}`);
        const navLinkContainer = event.target.parentNode;
        const navLinks = event.target.parentNode.querySelectorAll(`.${NavLink.NAV_LINK_CLASS}`);

        if(!navLinkElement) {
            return;
        }

        const nextActiveLink = Array.from(navLinks).indexOf(navLinkElement);
        navLinkContainer.setAttribute('data-current-album', `${nextActiveLink}`);
    }

    generateHtml() {
        return `
            <span 
                class=${NavLink.NAV_LINK_CLASS}
                data-album="${this.id}"
            >
                ${this.title}
            </span>
        `
    }
}