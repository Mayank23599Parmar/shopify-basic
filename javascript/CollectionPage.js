import { manageHeight } from "./helper";
class CollectionPage {
    constructor() {
        this.init()
    }
    init = () => {
        let collectionItem = document.querySelectorAll('.collection-items');
        let collectionItemHeight;
        if (collectionItem) {
            collectionItemHeight = manageHeight(collectionItem)
        }
        collectionItem.forEach((item) => {
            item.style.minHeight = `${collectionItemHeight}px`
        })
        console.log(collectionItemHeight, 'collectionItem');
    }
}
if (document.querySelector('.collection-list')) {
    new CollectionPage();
}
