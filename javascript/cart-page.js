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
        cartItems.forEach(item=>{
            let addCartBiutton = item.querySelector('.cart-plus');
            addCartBiutton.addEventListener("click", (e) => {
                debugger;
                let variantId;
                let quantity = 1;
                let formData = {}
                variantId = e.currentTarget.dataset.variant;
                if (variantId) {
                    formData = {
                        id: variantId,
                        quantity: quantity
                    }
                    addToCart(formData, that.cartInit);
                }
            })
        })
        let addCartBiutton = document.querySelectorAll(".cart-plus");
        let minusCartBiutton = document.querySelector(".cart-minus");
        let emptyCart = document.querySelector(".empty-cart")
        
        

        // minus cart quantity
        if (minusCartBiutton) {
            minusCartBiutton.addEventListener("click", (e) => {
                variantId = e.currentTarget.dataset.variant;
                let variantQantity = e.currentTarget.dataset.quantity
                if (variantId && variantQantity) {
                    formData = {
                        id: variantId,
                        quantity: parseInt(variantQantity) - 1
                    }

                    cartChange(formData, this.cartInit)
                }
            })
        }
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