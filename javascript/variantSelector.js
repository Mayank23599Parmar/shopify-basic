import { formatMoney, handleize } from "./helper";

class VariantSelector {
    constructor(obj) {
        console.log(obj);
        this.parent = obj.parent;
        this.productJson = obj.productJson;
        this.productSwatchAction = obj.productSwatchAction;
    };

    selectChange = () => {
        let productCard = this.parent;
        if (!cn(this.productJson)) {
            let values = [];
            let singleOptionSelector = productCard.querySelectorAll('.single-option-selector');
            singleOptionSelector.forEach((el) => {
                let obj = {};
                obj.index = el.getAttribute("data-index");
                obj.value = el.value;
                values.push(obj);
            });
            console.log(values, "valuesvalues");
            let variant = this.findVariant(values);
            console.log(variant, 'variant');
            if (variant) {
                const singleVariant = productCard.querySelector('.single-variants');
                singleVariant.value = variant.id;
                this.queryString(variant.id);
                this.variant = variant;
                this.productCallback();
            }
        }
    }
    findVariant(values) {
        console.log(values, "values");
        let variants = this.productJson.variants;

        let size = values.length;
        for (let i = 0; i < variants.length; i++) {
            let variant = variants[i];
            console.log(handleize(variant[values[0].index]), values[0].value);
            console.log(handleize(variant[values[1].index]), values[1].value);
            console.log(variant[values[0].index] == values[0].value, handleize(variant[values[1].index]) == values[1].value, "variants");
            if (size == 1) {
                if (handleize(variant[values[0].index]) == handleize(values[0].value)) {
                    return variant;
                }
            }
            else if (size == 2) {
                if (handleize(variant[values[0].index]) == handleize(values[0].value) && handleize(variant[values[1].index]) == handleize(values[1].value)) {
                    return variant;
                }
            }
            else {
                if (handleize(variant[values[0].index]) == handleize(values[0].value) && handleize(variant[values[1].index]) == handleize(values[1].value) && handleize(variant[values[2].index]) == handleize(values[2].value)) {
                    return variant;
                }
            }
        }
    }
     getVarintInfo=()=>{
        const that = this;
        let variant = that.variant;
        if(variant)
        {
            return variant
        }
     }
    productCallback() {
        const that = this;
        let variant = that.variant;
        parent = that.parent
        if (variant) {
            for (let i = 0, length = variant.options.length; i < length; i++) {
                let option = variant.options[i];
                let swatch = parent.querySelector(`.swatch-element[data-value="${option}"]`);
                that.productSwatchAction(swatch, false);
            }
            let produtPice=document.querySelector(".product-price")
            produtPice.innerHTML=formatMoney(variant.price)
            let productSku=document.querySelector(".product-dec span");
            productSku.innerHTML=variant.sku
        }
    }
    queryString(value) {
        let key = "variant";
        let uri = window.location.href;
        let re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
        let separator = uri.indexOf('?') !== -1 ? "&" : "?";
        let newUrl = "";
        if (uri.match(re)) {
            newUrl = uri.replace(re, '$1' + key + "=" + value + '$2');
        }
        else {
            newUrl = uri + separator + key + "=" + value;
        }
        window.history.replaceState({}, document.title, newUrl);
    }
}


export default VariantSelector;
