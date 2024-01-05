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

// code for hamburger 

ham.addEventListener('click', () => {
    if (navItems.style.right !== "0rem") {

        navItems.style.right = "0rem"

        cartBox.style.right = "-35rem"
        loginBox.style.right = "-35rem"

    } else {
        navItems.style.right = "-15rem"



    }

})

// code for Search 

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

// code for cartBox 

cart.addEventListener('click', () => {
    if (cartBox.style.right !== "0rem") {

        cartBox.style.right = "0rem"
        navItems.style.right = "-15rem"
        loginBox.style.right = "-35rem"


    } else {
        cartBox.style.right = "-35rem"


    }

})  
// code for Login form 

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

const rightBtn = document.querySelector('.right')
const leftBtn = document.querySelector('.left')
let counter = 1;

// creating image scroller 
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

// function for generating html for the products dynamically 

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
                
                <div class="on-add-checked-mark on-add-checked-mark-${pro.id}">
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

// eventListener for add to cart button 


        document.querySelectorAll('.add-to-cart-btn').forEach((btn) => (
            btn.addEventListener('click', (e) => {
                let proId = e.target.dataset.productId
                
                    addToCart(proId)
                    cartHtmlGenerating()
                    cartTotalAmount()
                    addedCheck(proId)
                    setTimeout(hideChecked,1500)    
                    saveCart() 


            })
           ))

        //    function for hidding checked pop up 
            function hideChecked(){
                document.querySelectorAll(`.on-add-checked-mark`).forEach((item)=>{
                    item.style.visibility='hidden'

                })
            }
            // function for show pop up added to cart 

              function addedCheck(proId){

                    document.querySelector(`.on-add-checked-mark-${proId}`).style.visibility='visible'  
                    

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
