class CRUD{constructor(t="https://jsonplaceholder.typicode.com"){this.apiUrl=t}async get(t){t=await fetch(t?this.apiUrl+"/"+t:this.apiUrl);if(t.ok)return t.json();console.error("debug exception: ","Network error")}}class Gallery extends CRUD{static GALLERY_NAV_CLASS="gallery__nav";static GALLERY_AlBUM_CLASS="gallery__album";static NAV_LINK_CLASS="navLink";imagesList=[];albumsList=[];constructor(t){super();t=t.rootEl;this.rootEl=t,this.albumsEL=null,this.imagesEL=null,this.imagesList=[],this.albumsList=[]}render(){var t=this.generateLinkListHtml(),e=this.generateAlbumHtml();this.rootEl.insertAdjacentHTML("beforeend",t),this.rootEl.insertAdjacentHTML("beforeend",e),this.albumsEL=this.rootEl.children[0],this.imagesEL=this.rootEl.children[1],this.albumsEL.addEventListener("click",this.onAlbumsElClick.bind(this)),this.getAllAlbums("albums").then(t=>this.renderAlbumList(t)).then(t=>this.getAllImages(this.getCurrentLink(this.albumsList))).then(t=>this.renderImages(t))}onAlbumsElClick(t){var t=t.target.closest("."+Gallery.NAV_LINK_CLASS),e=t.getAttribute("data-album");t&&(this.renderAlbumList(this.setCurrentLink(e)),this.getAllImages(e).then(t=>this.renderImages(t)))}renderAlbumList(t){this.albumsEL.innerHTML="",t.forEach(t=>{t.render(this.albumsEL)})}renderImages(t){this.imagesEL.innerHTML="",t.forEach(t=>{t.render(this.imagesEL)})}async getAllImages(t){t=await this.get("photos?albumId="+t);return this.imagesList=t.map(t=>new Image(t)),this.imagesList}async getAllAlbums(t){t=await this.get(t);return this.albumsList=t.map(t=>new NavLink(t)),this.albumsList[0].isActive=!0,this.albumsList}getCurrentLink(t){return t.find(t=>t.isActive).id}setCurrentLink(e){return this.albumsList=this.albumsList.map(t=>(t.isActive=String(t.id)===String(e),t)),this.albumsList}generateLinkListHtml(){return`
            <nav class="${Gallery.GALLERY_NAV_CLASS}"></nav>
        `}generateAlbumHtml(){return`
            <div class="${Gallery.GALLERY_AlBUM_CLASS}"></div>
        `}}class Image{static IMAGE_CLASS="image";static IMAGE_TEXT_CLASS="image__text";constructor(t){var{albumId:t,title:e,url:s}=t;this.src=s,this.alt=e,this.currentAlbumId=t}render(t){var e=this.generateHTML();t.insertAdjacentHTML("beforeend",e)}generateHTML(){return`
            <div>
                <img 
                    class=${Image.IMAGE_CLASS}
                    src="${this.src}" 
                    alt="${this.alt}" 
                    data-album="${this.currentAlbumId}" 
                />
                <p class=${Image.IMAGE_TEXT_CLASS}>${this.alt}</p>
            </div>
        `}}class NavLink extends CRUD{static NAV_LINK_CLASS="navLink";static NAV_LINK_ACTIVE_CLASS="navLink--active";constructor(t){super(t);var{id:t,title:e}=t;this.id=t,this.title=e,this.isActive=!1}render(t){var e=this.generateHtml();t.insertAdjacentHTML("beforeend",e)}generateHtml(){return`
            <span 
                class="${this.isActive?NavLink.NAV_LINK_CLASS+" "+NavLink.NAV_LINK_ACTIVE_CLASS:NavLink.NAV_LINK_CLASS}"
                data-album="${this.id}"
                data-active="${this.isActive}"
            >
                ${this.title}
            </span>
        `}}const GALLERY_CONTAINER_CLASS="gallery__container",galleryContainer=document.querySelector("."+GALLERY_CONTAINER_CLASS),gallery=new Gallery({rootEl:galleryContainer});gallery.render(),console.log("debug 111: ",111);