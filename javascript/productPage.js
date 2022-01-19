
import VariantSelector from './variantSelector';
import { findSiblings, addToCart } from './helper';
class Product {
    constructor(parent) {
        if (!parent) {
            return;
        }
        this.sliderElement;
        this.parent = document.querySelector(parent);
        this.productJson = null;
        this.init();
    }
    initiateProductVariant = () => {
        const jsonElement = this.parent.querySelector('.product-json');
        if (jsonElement) {
            this.productJson = JSON.parse(jsonElement.innerText);
        }
        if (this.productJson) {
            /* Instance of variant selector class */
            this.variantSelector = new VariantSelector({
                parent: this.parent,
                productJson: this.productJson,
                productSwatchAction: this.productSwatchAction,
                productSliderAction: this.productSliderAction
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
                let variant = this.variantSelector.getVarintInfo();
                var imageID = variant.featured_image.id
                var newImg = $(`.single-thumb[data-var=${imageID}]`);
                var Index = parseInt(newImg.attr("data-slick-index"));
                $(".thumb").slick('slickGoTo', Index)
            })
        })
        let formData;
        // add to cart action
        let addTocartButton = document.querySelector(".add-to-cart")
        addTocartButton.addEventListener("click", (element) => {
            formData = {
                quantity: 1,
                id: variant.id

            }
            addTocartButton.innerText = "Adding..."
            addToCart(formData, () => {
                addTocartButton.innerText = "Add to cart"
            })
        })
        //produt buy now button action
        let ProductBuyNow = document.querySelector(".buy-now")
        ProductBuyNow.addEventListener("click", (element) => {
            formData = {
                quantity: 1,
                id: variant.id

            }
            ProductBuyNow.innerText = "Adding..."
            addToCart(formData, () => {
                addTocartButton.innerText = "Add to cart";
                window.location.href = "/checkout"
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
    createSlider = () => {
        const parent = this.parent;
        const that = this;
        let selector = $(".ProductImages .list", parent);
        let thumbBlock = $(".ProductImages .thumb", parent);
        let thumbLength = $(".single-thumb", parent).length;
        let slidesToShow = 5;
        if (thumbLength == 2) {
            slidesToShow = 2;
        }
        if ($(selector).length > 0 && $(".single-image", selector).length > 1) {
            that.sliderElement = $(selector).slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                asNavFor: thumbBlock,
                dots: false,
                arrows: false,
                infinite: false
            });
            $(thumbBlock).slick({
                infinite: true,
                slidesToShow: slidesToShow,
                slidesToScroll: 1,
                asNavFor: selector,
                arrows: false,
                focusOnSelect: true,
                infinite: false
            });
        }
    }
    productSliderAction = index => {
        const that = this;
        const parent = this.parent;
        let selector = $(".ProductImages .list", parent);
     //   this.sliderElement = $(selector).slick("slickGoTo",index);
    }
    changeSlideImage = () => {
        // Change main slider based on thumb image click
        let thumbs = this.parent.querySelectorAll('.thumb-block .thumb .single-thumb');
        thumbs.forEach((thumb, index) => {
            thumb.addEventListener('click', (e) => {
                this.productSliderAction(index);
            })
        })
    }
    init = () => {
        this.initiateProductVariant();
        this.clickEvent();
        this.changeEvent();
        this.createSlider()
    }
}
if (document.getElementById('product-page')) {
    new Product('#product-page');
}
