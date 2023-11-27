import { products } from "../data/products.js";


let cartt=JSON.parse(localStorage.getItem('cart'))
  if(!cartt){
    cartt = [
    ];

  }




export function addToCart(proId) {
  let matchingItem;

    cartt.forEach((cartItem) => {
        if (cartItem.id === proId) {
            matchingItem = cartItem
        }
    })
    if (matchingItem) {
        matchingItem.quantity += 1
        matchingItem = ''
    } else {
        cartt.push({
            id: proId,
            quantity: 1
        })


    }
    console.log(cartt);
    saveCart()



}
cartTotalAmount()
export function cartTotalAmount(){
    let total=0;
    let matchingPro;
    
    cartt.forEach((item) => {
        products.forEach((pro) => {
            if (pro.id === item.id) {
                matchingPro = pro;
            }
            
        })
        total+=Math.round((matchingPro.priceCents/100)*item.quantity)
})

document.querySelector('.total-amount').innerHTML=`$ ${total}`
saveCart()
}

export function saveCart(){
     

    localStorage.setItem('cart', JSON.stringify(cartt))


}

export function removeFromCart(proId){
      
           
        let updatedCart=[];
      cartt.forEach((item)=>{
        if(proId!==item.id){
            updatedCart.push(item)
        }
      })
         cartt=updatedCart
         
         console.log(proId)
  

            // cartt.forEach((item)=>{
            //     if(item.id===proId){
            //         matchingItem=item
            //     }
            // })
        
            // products.forEach((pro)=>{
            //     if(matchingItem.id===matchingItem.id){
                    
            //     }
            // })
    }







    cartHtmlGenerating()
    export function cartHtmlGenerating(){
        let cartHtml = '';
        let matchingPro;
        // console.log(cartt)
    
        if(!cartt){
            console.log(cartt)
            document.querySelector('.cart-items').innerHTML = `<div class="cart-items">
            <div class="item-not-found">
                your cart is empty
            </div>
    `
        }else{
            cartt.forEach((item) => {
                products.forEach((pro) => {
                    if (pro.id === item.id) {
                        matchingPro =pro;
                    }
                })
              
                cartHtml += ` <div class="item item-${matchingPro.id}">
             <div class="item-img">
                 <img src="${matchingPro.image}" alt="">
        
             </div>
             <div class="item-details">
                 <span>${matchingPro.name}</span>
                 <div class="price-quantity">
                     <span class="price">$ ${matchingPro.priceCents/100}</span>
                     <span class="quantity">Qt:${item.quantity}</span>
                 </div>
             </div>
             <div class="remove" >
               <img class="remove-pro"  data-product-id="${matchingPro.id}" src="img/circle-xmark-solid.svg" alt="">
        
             </div>
             
        
         </div>
             `
            })
           
    
        }
        
    
        document.querySelector('.cart-items').innerHTML = cartHtml;
    
    
    }