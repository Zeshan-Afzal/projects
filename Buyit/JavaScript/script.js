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


})



