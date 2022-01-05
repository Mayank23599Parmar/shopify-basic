
import VariantSelector from './variantSelector';
import { findSiblings } from './helper';
class Product {
    constructor(parent) {
        if (!parent) {
            return;
        }
        this.parent = document.querySelector(parent);
        this.productJson = null;
        this.init();
    }
    initiateProductVariant = () => {
        console.log(this.parent, "this.parent");
        const jsonElement = this.parent.querySelector('.product-json');
        if (jsonElement) {
            this.productJson = JSON.parse(jsonElement.innerText);
        }
        if (this.productJson) {
            /* Instance of variant selector class */
            this.variantSelector = new VariantSelector({
                parent: this.parent,
                productJson: this.productJson,
                productSwatchAction: this.productSwatchAction
            });

            /* First auto call when page/quickview load */
            this.variantSelector.selectChange();
        }
    }
    productSwatchAction = (selector, trigger) => {
        if (!selector) {
            return null;
        }
        let siblings = findSiblings(selector);
        console.log(selector, "selector");
        console.log(siblings, "siblings");
        siblings.forEach((item) => {
            item.classList.remove('active');
        })
        selector.classList.add('active');
        if (trigger) {
            let target = selector.getAttribute("data-value");
            let parent = this.parent;
            let swatch = selector.closest('.swatch');
            let oi = swatch.getAttribute("data-option-index");
            oi = parseInt(oi) + 1;
            oi = "option" + oi;
            let select = parent.querySelector(".single-option-selector[data-index='" + oi + "']");
            select.value = target;
            select.dispatchEvent(new Event("change"));
        }
    }



    clickEvent = () => {
        const swatches = this.parent.querySelectorAll('.swatch-element');
        swatches.forEach((swatch) => {
            swatch.addEventListener('click', (e) => {
                this.productSwatchAction(e.currentTarget, true);
            })
        })
    }
    changeEvent = () => {
        const parent = this.parent;
        let singleOptionSelectors = parent.querySelectorAll('.single-option-selector');
        singleOptionSelectors.forEach((item) => {
            item.addEventListener('change', () => {
                this.variantSelector.selectChange();
            })
        });
    }
    init = () => {
        this.initiateProductVariant();
        this.clickEvent();
        this.changeEvent();
    }
}

if (document.getElementById('product-page')) {
    new Product('#product-page');
}