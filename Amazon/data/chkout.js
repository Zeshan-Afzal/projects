
    // importing functions and variables from cart.js and products.js files 

    import { cart, removeFromCart, saveCart, calculateTotal, updatePro } from "./cart.js"
    import { products } from "./products.js"


    // declaring variable to store all the html generated by cartHtmlGenerating() function  
    let cartHtml = ''

    // varaibles for addToPaymentSection() function and to handle all the payment calculations 

    let subTotal = calculateTotal()[0]
    let cartLength = calculateTotal()[1]
    let shipTaxOnItems = 0
    let totalBeforeTax = 0
    let tax = 0
    let totalOrderAmount = 0

    // function to create a delivery date 
    function deliveryDate() {

      let date = new Date()
      let dateOfDelivery = new Date(date)
      dateOfDelivery.setDate(dateOfDelivery.getDate() + 10)

      let FreedileveryDate = dateOfDelivery.toLocaleDateString('Pk', { weekday: 'long', day: '2-digit', month: 'short' })

      return FreedileveryDate;


    }

    // storing delivery date into a variable for later use 
    let freeDeliveryDate = deliveryDate();

    // handlling delivery date section functons and variables to make dates dynamic 
    const fiveDaysEarly = earlyDelivery(freeDeliveryDate, 5);
    const eightDaysEarly = earlyDelivery(freeDeliveryDate, 8);
    const freeDeliver = 0;
    const fiveDaysErlyCharges = 499;
    const eightDaysErlyCharges = 999;


    // function to create a delivery date and according to date set price as well 
    function earlyDelivery(freeDeliveryDate, earlyDays) {


      let daysBefore = new Date(freeDeliveryDate)
      daysBefore.setDate(daysBefore.getDate() - earlyDays)
      let earlyDaysDate = daysBefore.toLocaleDateString('Pk', { weekday: 'long', day: '2-digit', month: 'short' })
      return earlyDaysDate

    }

    // function to generate all the html for the cart products dynamicaly 
    cartHtmlGenerating()

    function cartHtmlGenerating() {

      cart.forEach((cartItem) => {
        // finding the  card product in the products array 
        let productId = cartItem.productId
        let matchingProduct;
        products.forEach((pro) => {

          if (pro.id === productId) {

            // storing the matching product in a variable to add its values to the page dynamicaly 
            matchingProduct = pro
          }

        })

        // storing all the html into cartHtml variable 
        cartHtml += `
        
        
        <div class="cart-item-container js-container-${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: ${freeDeliveryDate}  
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
            ${matchingProduct.name}
            </div>
            <div class="product-price">
              $ ${matchingProduct.priceCents / 100}
            </div>
            <div class="product-quantity  new-${matchingProduct.id}">
              <span>
                Quantity: <span class="quantity-label label-${matchingProduct.id}">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary update-js" data-product-id="${matchingProduct.id}" >
                Update
              </span>
              <span class="delete-quantity-link link-primary delet-js" data-product-id="${matchingProduct.id}" >
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            <div class="delivery-option">
              <input type="radio" checked
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}"  value='${freeDeliver}'>
              <div>
                <div class="delivery-option-date">
                ${freeDeliveryDate}  
                </div>
                <div class="delivery-option-price">
                  FREE Shipping
                </div>
              </div>
            </div>
            <div class="delivery-option">
              <input type="radio"
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}"  value='${fiveDaysErlyCharges}'>
              <div>
                <div class="delivery-option-date">
                ${fiveDaysEarly}
                </div>
                <div class="delivery-option-price" >
                  $4.99 - Shipping
                </div>
              </div>
            </div>
            <div class="delivery-option">
              <input type="radio"
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}"   value='${eightDaysErlyCharges}'> 
              <div>
                <div class="delivery-option-date">
              ${eightDaysEarly}
                </div>
                <div class="delivery-option-price">
                  $9.99 - Shipping
                </div>
              </div>
            </div>
          </div> 
        </div>
      </div>
        `

      })
      //  adding all the generated html to DOM 
      document.querySelector('.order-js').innerHTML = cartHtml

    }


    deletItemFromCart()

    // function to update payment section after deleting a item from cart 
    let price
    let matchingpro;
    function priceUpdationOnDeletBtn(removingProductId) {
      cart.forEach((item) => {
        if (item.productId === removingProductId) {
          matchingpro = item
          price = ((matchingpro.quantity * matchingpro.price) / 100).toFixed(2)



        }
      })
      return price

    }

    // function to delet an item from cart 
    function deletItemFromCart() {
      let deletBtn = document.querySelectorAll('.delet-js')

      deletBtn.forEach((btn) => {
        btn.addEventListener('click', () => {
          //  decreasing cartLength on every click on delet 
          cartLength--
          let removingProductId = btn.dataset.productId

          priceUpdationOnDeletBtn(removingProductId)

          if (!cartLength) {
            shipTaxOnItems = 0
          }

          subTotal -= price
          addToPaymentSection()
          calculateTotal()
          taxValueOfRadioBtn()
          removeFromCart(removingProductId)
          //  calling all the function related to payment section on delet btn 

          let removeElement = document.querySelector(`.js-container-${removingProductId}`)
          //  getting the item to delet with the spescfic product id 

          removeElement.remove()

          // saving changes to loacal storage 
          saveCart()

        })


      })


    }


    upDateCartBtn()
    function upDateCartBtn() {
      let flag = true
      let updateBtn = document.querySelectorAll('.update-js')
      let updatePr;
      let prevPrice = 0;
      updateBtn.forEach((btn) => {


        let updatingProductId = btn.dataset.productId



        btn.addEventListener('click', () => {
          updatePr = updatePro(updatingProductId)
          let inp
          let ad
          let value;


          if (flag) {

            inp = document.createElement('input')
            ad = document.querySelector(`.new-${updatingProductId}`)

            inp.setAttribute('type', 'number')
            inp.classList.add(`input-${updatingProductId}`)

            inp.style.width = "30px"
            ad.appendChild(inp)

            subTotal -= prevPrice

            btn.innerHTML = "Save"
            flag = false
          } else {
            value = document.querySelector(`.input-${updatePr.productId}`).value
            updatePr.quantity = value


            btn.innerHTML = "Update"
            document.querySelector(`.input-${updatePr.productId}`).remove()
            document.querySelector(`.label-${updatePr.productId}`).innerHTML = updatePr.quantity
            let price = (updatePr.quantity * updatePr.price) / 100;
            prevPrice = price
            subTotal += price


            saveCart()
            flag = true
            if (updatePr.quantity < 1) {
              document.querySelector(`.js-container-${updatePr.productId}`).remove()
            }
            addToPaymentSection()

          }


        })
      })



    }


    let selectedValue = '';

    function handleRadioChange(event) {
      selectedValue = event.target.value;

    }

    //  function to get radio buttons values and make them dynamic
    taxValueOfRadioBtn()

    function taxValueOfRadioBtn() {
      document.querySelectorAll('.delivery-option-input').forEach((item) => {

        item.addEventListener('change', (event) => {

          handleRadioChange(event)


          shipTaxOnItems = Number(item.value / 100)

          addToPaymentSection()

        })

      })

    }


    // function to add all the payment related functionality to the dom and make payment section  interactive 
    export function addToPaymentSection() {
      totalBeforeTax = (shipTaxOnItems + subTotal).toFixed(2)
      tax = (totalBeforeTax * 0.1).toFixed(2);
      totalOrderAmount = Number(tax) + Number(totalBeforeTax)

      document.querySelector('.payment-summary-money-total').innerHTML = '$ ' + subTotal.toFixed(2);
      document.querySelector('.items').innerHTML = 'Itmes ' + '(' + cartLength + ')'
      document.querySelector('.return-to-home-link').innerHTML = 'Itmes ' + '' + cartLength + ''
      document.querySelector('.payment-summary-money-shipping').innerHTML = "$ " + shipTaxOnItems
      document.querySelector('.payment-summary-money-before-tax').innerHTML = '$ ' + totalBeforeTax
      document.querySelector('.payment-summary-money-with-tax').innerHTML = '$ ' + tax
      document.querySelector('.payment-summary-money-total-amount').innerHTML = '$ ' + totalOrderAmount.toFixed(2)


    }
    addToPaymentSection()
