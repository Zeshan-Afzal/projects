
import { products } from "./data/products.js";
import { cart, addToCart, saveCart, calculateTotal } from "./data/cart.js"
let productHTML = ''

function generateHtml() {
  products.forEach((product) => {

    productHTML += ` <div class="product-container">
    <div class="product-image-container">
      <img class="product-image"
        src="${product.image}">
    </div>

    <div class="product-name limit-text-to-2-lines">
    ${product.name}
    </div>

    <div class="product-rating-container">
      <img class="product-rating-stars"
        src="images/ratings/rating-45.png">
      <div class="product-rating-count link-primary">
        87
      </div>
    </div>

    <div class="product-price">$
    ${product.priceCents / 100}   
    </div>

    <div class="product-quantity-container">
      <select class="quantity-js">
        <option selected value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </div>

    <div class="product-spacer"></div>

    <div class="added-to-cart added-to-cart-${product.id}">
      <img src="images/icons/checkmark.png">
      Added
    </div> 

    <button class="add-to-cart-button button-primary" data-product-id="${product.id}" data-product-name="${product.name}" data-product-price="${product.priceCents}">
      Add to Cart
    </button>
  </div>
    
    
    
    `



  })
  document.querySelector('.products-grid').innerHTML = productHTML;


}
generateHtml();


export function upDateCart() {

  let cartQuan = 0
  cart.forEach((item) => {

    cartQuan += item.quantity

    let cartQ = document.querySelector('.cart-quantity')
    cartQ.innerHTML = cartQuan
    saveCart()
  })

}


upDateCart()



let addToCartBtn = document.querySelectorAll('.add-to-cart-button')

addToCartBtn.forEach((button) => {

  button.addEventListener('click', () => {

    let productId = button.dataset.productId
    let productPrice = button.dataset.productPrice
    addToCart(productId, productPrice)
    upDateCart()
    saveCart()

    addToCartPopUp(productId)
    setTimeout(addToCartPopUpRemove, 1000)


  })

})




function addToCartPopUp(productId) {

  let popUp = document.querySelector(`.added-to-cart-${productId}`).style.opacity = '1'

}


function addToCartPopUpRemove() {

  let popUp = document.querySelectorAll('.added-to-cart')

  popUp.forEach((item) => {



    item.style.opacity = '0'

  })

}






document.querySelector('.search-button').addEventListener('click', () => {


  let searchInput = document.querySelector('.search-bar').value

  let searchItm = products.filter((item) => { return searchInput === item.name })


  console.log(searchItm)
  document.querySelector('.products-grid').innerHTML = ` <div class="product-container">
<div class="product-image-container">
  <img class="product-image"
    src="${searchItm[0].image}">
</div>

<div class="product-name limit-text-to-2-lines">
${searchItm[0].name}
</div>

<div class="product-rating-container">
  <img class="product-rating-stars"
    src="images/ratings/rating-45.png">
  <div class="product-rating-count link-primary">
    87
  </div>
</div>

<div class="product-price">$
${searchItm[0].priceCents / 100}   
</div>

<div class="product-quantity-container">
  <select class="quantity-js">
    <option selected value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
    <option value="6">6</option>
    <option value="7">7</option>
    <option value="8">8</option>
    <option value="9">9</option>
    <option value="10">10</option>
  </select>
</div>

<div class="product-spacer"></div>

<div class="added-to-cart added-to-cart-${searchItm[0].id}">
  <img src="images/icons/checkmark.png">
  Added
</div> 

<button class="add-to-cart-button button-primary" data-product-id="${searchItm[0].id}" data-product-name="${searchItm[0].name}" data-product-price="${searchItm[0].priceCents}">
  Add to Cart
</button>
</div>



`


})