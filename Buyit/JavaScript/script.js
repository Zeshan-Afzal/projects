// imorting files 

import { products } from "../data/products.js"
import { cartHtmlGenerating, addToCart, cartTotalAmount, saveCart, removeFromCart } from "./cart.js"

// getting domElements 
const ham = document.querySelector('.ham')
const navItems = document.querySelector('.navitems')
const search = document.querySelector('.search')
const searchbox = document.querySelector('.searchbox')
const cart = document.querySelector('.cartBtn')
const cartBox = document.querySelector('.cart')
const login = document.querySelector('.loginbtn')
const loginBox = document.querySelector('.login')

// code for hamburger functionality

ham.addEventListener('click', () => {
    if (navItems.style.right !== "0rem") {

        navItems.style.right = "0rem"

        cartBox.style.right = "-35rem"
        loginBox.style.right = "-35rem"

    } else {
        navItems.style.right = "-15rem"



    }

})

// code for Searchbox navigation   

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

// code for cartBox navigation 

cart.addEventListener('click', () => {
    if (cartBox.style.right !== "0rem") {

        cartBox.style.right = "0rem"
        navItems.style.right = "-15rem"
        loginBox.style.right = "-35rem"


    } else {
        cartBox.style.right = "-35rem"


    }

})
// code for Login form  navigation 

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



// conde for home section  home section 
// getting buttons 
const rightBtn = document.querySelector('.right')
const leftBtn = document.querySelector('.left')
let counter = 1;

// creating image scroller 
// added an addEventListener on the right buttton to scroll images 
rightBtn.addEventListener('click', () => {

    // checking if the counter is greater than 3 then setting the counter back to 1

    if (counter > 3) {
        counter = 1
        document.querySelectorAll('.slide-img').forEach((img) => {

            img.style.transform += "translateX(+300%)"

            // image will translate 300% in x axis at start point  

        })

    }
    // if the condition is not true then this code will run 
    else {

        counter++
        document.querySelectorAll('.slide-img').forEach((img) => {

            img.style.transform += "translateX(-100%)"


        })

    }


}
)

// function for generating html for the products dynamically 

productsHtmGenerate()

function productsHtmGenerate() {

    let proHtml = '';

    //  looping through all the products available and creating the html for each product 
    products.forEach((pro) => {

        proHtml += `
            <div class="products">
                    
            <div class="img">
                <img class="detail-of-product"src=${pro.image} data-product-id="${pro.id}" alt="" title="click to view details">
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
                
                <div class="on-add-checked-mark on-add-checked-mark-${pro.id}">
                    <img src="images/icons/checkmark.png" alt="">

                </div>
            </div>
            

            <button class="add-to-cart-btn" data-product-id="${pro.id}" >Add to Cart</button>
            
        </div>

            
            
            
            `


    })

    // add products in html document 
    document.querySelectorAll('.new-arival-js').forEach((item) => {
        item.innerHTML = proHtml
    })


}

// eventListener for add to cart button 


document.querySelectorAll('.add-to-cart-btn').forEach((btn) => (
    btn.addEventListener('click', (e) => {
        let proId = e.target.dataset.productId //getting the id with data set attribute and passing it to addToCart function 

        addToCart(proId) //function foru adding item to cart 
        cartHtmlGenerating() //after adding item cart html will be updated 
        cartTotalAmount()  // function for totallig the cart amount every time a pro added
        addedCheck(proId) // function for a pop up when a pro added 
        setTimeout(hideChecked, 1500)    // function for removing pop up
        saveCart()  // function for saving cart data to localstorage 


    })
))

//    function for hidding checked pop up 
function hideChecked() {
    document.querySelectorAll(`.on-add-checked-mark`).forEach((item) => {
        item.style.visibility = 'hidden'

    })
}
// function for show pop up added to cart 

function addedCheck(proId) {

    document.querySelector(`.on-add-checked-mark-${proId}`).style.visibility = 'visible'


}

//  eventListener for removing item from cart 

document.querySelector('.cart-items').addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-pro')) {
        let proId = e.target.dataset.productId;
        removeFromCart(proId);
        cartTotalAmount();
        cartHtmlGenerating()
        saveCart()
    }
});






//  let searchProHtml='';
// document.querySelector('.search-icon').addEventListener('click',()=>{
//      let searchName=document.querySelector('#search-name').value;

//     let searchItem=products.filter((pro)=> pro.name===searchName)


//     searchProHtml += `
//     <div class="products">

//     <div class="img">
//         <img src=${searchItem.image} alt="" title="click to view details">
//     </div>
//     <span class="item-name">
//        ${searchItem.name}
//     </span>
//     <div class="ratings">

//     </div>
//     <div class="price-of-item">
//         $ ${searchItem.priceCents / 100}
//     </div>
//     <div class="quantity-of-item">

//         <div class="on-add-checked-mark">
//             <img src="images/icons/checkmark.png" alt="">

//         </div>
//     </div>


//      <button class="add-to-cart-btn" data-product-id="${searchItem.id}" >Add to Cart</button>

// </div>




//    `
//    document.querySelector('.new-arival-js').innerHTML=searchProHtml
// console.log(searchItem)
// })




// products details js functionality 

// detail of product 

// getting all the image elements 
document.querySelectorAll('.detail-of-product').forEach((pro) => {
    //   adding addEventListener to check the product details 
    pro.addEventListener('click', (e) => {

        let proId = e.target.dataset.productId; //getting id with dataSet attribute

        showProductDetails(proId) // function for showing the spesific products details dynamically

        // addEventListener on cross to hide the detaile box 
        document.querySelector('.cross').addEventListener('click', () => {
            document.querySelector('.check-out').style.display = 'none'

        })
        //   adding product to cart from the button on detail box
        document.querySelector('.cart-btn').addEventListener('click', (e) => {
            let proId = e.target.dataset.productId;
            addToCart(proId);
            cartHtmlGenerating();
            cartTotalAmount();
            saveCart();
        })


    })





})






//   function for showing products details 
function showProductDetails(proId) {
    let matchingProduct;
    // getting the spasific product from the products array with the id 
    products.forEach((pro) => {

        if (pro.id === proId) {
            matchingProduct = pro // matching element's detail
        }



    })
    //  logic for off price calculation 
    let realPrice = (matchingProduct.priceCents / 100) * 0.3;

    let offOnItem = (realPrice + (matchingProduct.priceCents / 100)).toFixed(2)
    // adding products detail to html Element 
    let box = document.querySelector('.check-out')
    box.innerHTML = ` <span class="cross">x</span>  
  <div class="product-picture">
      <img src="${matchingProduct.image}" alt=""> 
   </div>  
  <div class="product-detailes">
      <div class="rightside">

          <span class="product-name">${matchingProduct.name}</span>
         
          <div class="ratings">
              <span><img src="images/ratings/rating-${matchingProduct.rating.stars}.png" alt=""></span> 
              <span  class="count">${matchingProduct.rating.count}</span> 
             
          </div> 
          <span class="product-bio">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis,  error! Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse  reprehenderit aliquid perferendis magni!</span> 
          <div class="pricing-avail">
              <p class="price">$ ${matchingProduct.priceCents / 100} </p>
              <div  class="avail">
                  <p class="stock">availability </p>
                  <p class="availbl">In Stock</p>
              </div>

                 
          </div>
          <div class="off-price">

              <p class="before-price">$ ${offOnItem}</p>
              <p class="off">( 34% OFF)</p>
          </div>
            <div class="color-qunt">
              
                <select name="" id="">
                  <option value="">quant</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
                
            </div>
          


          <div class="butttons">
            <button class="cart-btn add-to-cart-btn" data-product-id="${matchingProduct.id}" >Add to Cart</ button>
           

          </div>


      </div>
   

  </div>`

    box.style.display = 'flex'
    box.style.top = '30px'
}


