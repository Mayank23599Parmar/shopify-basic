import { addToCart ,cartChange,clearCart} from "./helper";
class CartPage {
    constructor() {
        this.clickEvent()
    }
    renderCart = async () => {
        let res = await fetch('/cart?view=ajax');
        let resJson = await res.text();
        document.querySelector(".cart-items-wrapper").innerHTML = resJson
    }
    clickEvent = () => {
        //add to cart quantitty
        let addCartBiutton = document.querySelector(".cart-plus");
        let minusCartBiutton = document.querySelector(".cart-minus");
        let emptyCart=document.querySelector(".empty-cart")
        let variantId;
        let quantity = 1;
        let formData = {}
        if (addCartBiutton) {
            addCartBiutton.addEventListener("click", (e) => {
                variantId = e.currentTarget.dataset.variant;
                if (variantId) {
                    formData = {
                        id: variantId,
                        quantity: quantity
                    }
                    addToCart(formData,window.location.reload())



                }
            })
        }
        // minus cart quantity
        if(minusCartBiutton){
            minusCartBiutton.addEventListener("click",(e)=>{
                variantId = e.currentTarget.dataset.variant;
                let variantQantity=e.currentTarget.dataset.quantity
                if (variantId && variantQantity) {
                    formData = {
                        id: variantId,
                        quantity: parseInt(variantQantity) - 1
                    }
                    
                    cartChange(formData,window.location.reload())
                }
            })
        }
        //empty cart
         if(emptyCart){
            emptyCart.addEventListener("click",()=>{
                clearCart(window.location.reload())
            })
         }
    }
}

new CartPage;
