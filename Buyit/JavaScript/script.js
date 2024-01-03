import { products } from "../data/products.js"
import { cartHtmlGenerating, addToCart, cartTotalAmount, saveCart, removeFromCart } from "./cart.js"

const ham = document.querySelector('.ham')
const navItems = document.querySelector('.navitems')
const search = document.querySelector('.search')
const searchbox = document.querySelector('.searchbox')
const cart = document.querySelector('.cartBtn')
const cartBox = document.querySelector('.cart')
const login = document.querySelector('.loginbtn')
const loginBox = document.querySelector('.login')

ham.addEventListener('click', () => {
    if (navItems.style.right !== "0rem") {

        navItems.style.right = "0rem"

        cartBox.style.right = "-35rem"
        loginBox.style.right = "-35rem"

    } else {
        navItems.style.right = "-15rem"



    }

})
search.addEventListener('click', () => {
    if (searchbox.style.right !== "0rem") {

        searchbox.style.right = "0rem"
        navItems.style.right = "-15rem"
        loginBox.style.right = "-35rem"
        cartBox.style.right = "-35rem"

    } else {
        searchbox.style.right = "-25rem"


    }

})
cart.addEventListener('click', () => {
    if (cartBox.style.right !== "0rem") {

        cartBox.style.right = "0rem"
        navItems.style.right = "-15rem"
        loginBox.style.right = "-35rem"


    } else {
        cartBox.style.right = "-35rem"


    }

})
login.addEventListener('click', () => {
    if (loginBox.style.right !== "0rem") {

        loginBox.style.right = "0rem"
        navItems.style.right = "-15rem"

        cartBox.style.right = "-35rem"

    } else {
        loginBox.style.right = "-35rem"


    }

})
document.querySelector('.body').addEventListener('scroll', () => {
    navItems.style.right = "-15rem"
    searchbox.style.right = "-25rem"
    cartBox.style.right = "-35rem"
    loginBox.style.right = "-35rem"

})



// home section 

const rightBtn = document.querySelector('.right')
const leftBtn = document.querySelector('.left')
let counter = 1;


rightBtn.addEventListener('click', () => {

    if (counter > 3) {
        counter = 1
        document.querySelectorAll('.slide-img').forEach((img) => {

            img.style.transform += "translateX(+300%)"


        })

    }
    else {

        counter++
        document.querySelectorAll('.slide-img').forEach((img) => {

            img.style.transform += "translateX(-100%)"


        })

    }


}
)


productsHtmGenerate()

function productsHtmGenerate(){
    
let proHtml = '';

products.forEach((pro) => {

    proHtml += `
     <div class="products">
             
     <div class="img">
         <img src=${pro.image} alt="" title="click to view details">
     </div>
     <span class="item-name">
        ${pro.name}
     </span>
     <div class="ratings">
         <span><img src="images/ratings/rating-${pro.rating.stars}.png" alt=""></span>
         <span>${pro.rating.count}</span>
     </div>
     <div class="price-of-item">
         $ ${pro.priceCents / 100}
     </div>
     <div class="quantity-of-item">
         <select name="" id="select-quan">
             <option value="1">1</option>
             <option value="2">2</option>
             <option value="3">3</option>
             <option value="4">4</option>
             <option value="5">5</option>
         </select>
         <div class="on-add-checked-mark">
             <img src="images/icons/checkmark.png" alt="">

         </div>
     </div>
    

      <button class="add-to-cart-btn" data-product-id="${pro.id}" >Add to Cart</button>
    
 </div>

    
    
    
    `


})
document.querySelectorAll('.new-arival-js').forEach((item)=>{
    item.innerHTML=proHtml
})


}


document.querySelectorAll('.add-to-cart-btn').forEach((btn) => (
    btn.addEventListener('click', (e) => {
        let proId = e.target.dataset.productId
      
        addToCart(proId)
        cartHtmlGenerating()
        cartTotalAmount()
      
        saveCart()


    })
))




document.querySelectorAll('.remove-pro').forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
      
        let proId = e.target.dataset.productId
      
      
        removeFromCart(proId)
         cartHtmlGenerating()

         cartTotalAmount()
        
        saveCart()

    })
  
})
