



export let cart = JSON.parse(localStorage.getItem('cart'))
if (!cart) {
  cart = []
}

export function saveCart() {

  localStorage.setItem('cart', JSON.stringify(cart))


}



export function addToCart(productId,productPrice) {
  let matchingItem;
  cart.forEach((item) => {

    if (productId === item.productId) {

      matchingItem = item
    }
  })

  if (matchingItem) {
    matchingItem.quantity += 1


  } else {
    cart.push({

      productId: productId,
      quantity: 1,
      price:productPrice
    })

    saveCart()
  }
console.log(cart)


}

export function removeFromCart(removingProductId) {

  const updatedCart = []
  cart.forEach((item) => {


    if (item.productId !== removingProductId) {

      updatedCart.push(item);

    }
  })

  cart = updatedCart
}


export function calculateTotal(){

  let  subTotal=0
  let cartLength=cart.length
 
cart.forEach((cartItem)=>{
     
   let price= cartItem.price
   let quantity= cartItem.quantity


  subTotal+=(quantity*price)/100



})



return [ subTotal,cartLength,]

}

calculateTotal()

export function updatePro(updatingProductId){

  let matchingpro;
  cart.forEach((item) => {

       if(item.productId===updatingProductId){

        matchingpro=item
       }
    
    
    })

 return matchingpro
}
