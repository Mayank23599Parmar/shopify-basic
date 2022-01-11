import { addToCart, cartChange, clearCart } from "./helper";
class CartPage {
    constructor() {
        this.init()
    }
    cartInit = async () => {
        let res = await fetch('/cart?view=ajax');
        let resJson = await res.text();
        document.getElementById("cart-idss").innerHTML = resJson;
        this.clickEvent();
    }
    clickEvent = () => {
        //add to cart quantitty
        const that = this
        let cartItems = document.querySelectorAll('.cart-items-wrapper .cart-item');
        let variantId;
        let quantity = 1;
         
        let formData = {}
        cartItems.forEach(item => {
            let addCartBiutton = item.querySelector('.cart-plus');
            let minusCartBiutton = item.querySelector(".cart-minus");
            // plus cart quantity
            if (addCartBiutton) {
                addCartBiutton.addEventListener("click", (e) => {   
                    variantId = e.currentTarget.dataset.variant;
                    console.log(variantId,"id");
                    if (variantId) {
                        formData = {
                            id: variantId,
                            quantity: quantity
                        }
                        addToCart(formData, that.cartInit);
                    }
                })
            }
            // minus cart quantity
            if (minusCartBiutton) {
                minusCartBiutton.addEventListener("click", (e) => {
                    variantId = e.currentTarget.dataset.variant;
                    let variantQantity = e.currentTarget.dataset.quantity
                    console.log(variantId,variantQantity,"p");
                    if (variantId && variantQantity) {
                        formData = {
                            id: variantId,
                            quantity: parseInt(variantQantity) - 1
                        }
                        console.log(formData);
                        cartChange(formData, that.cartInit)
                    }
                })
            }
        })

        let emptyCart = document.querySelector(".empty-cart")
        //empty cart
        if (emptyCart) {
            emptyCart.addEventListener("click", () => {
                clearCart(window.location.reload())
            })
        }
    }
    init = () => {
        this.clickEvent();

    }
}

new CartPage();
//test