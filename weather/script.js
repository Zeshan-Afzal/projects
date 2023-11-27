
toggleHide()
function toggleHide() {
    let burger = document.querySelector(".burg")
    let navBar = document.querySelector('.navbar')
    let navItm = document.querySelector('.navitemss')
    let navItms = document.querySelectorAll('.li')


    burger.addEventListener('click', () => {

        navBar.classList.toggle('activNav')
        navItm.classList.toggle('activeI')

        navItms.forEach((nav) => {
            nav.classList.toggle('activeII')
            nav.classList.toggle('lii')
        })

    })

}


// Weather functionality
let city;

const search = document.querySelector('.icon')
search.addEventListener('click', () => {

    let inpVal = document.querySelector('#search')
    city = inpVal.value
    fetchApi(city)
    inpVal.value = ''
})


fetchApi()




async function fetchApi(city) {

    const api = `https://api.weatherapi.com/v1/current.json?key=%20759fd5f1c00f4a29997162307232509&q=${city}&aqi=no`

    const res = await fetch(api)
    const data = await res.json()

    return bindData(data)







}


// data binding 

function bindData(data) {
    const cityName = document.querySelector('#city')
    const region = document.querySelector('#region')
    const tempC = document.querySelector('#tempC')
    const tempF = document.querySelector('#tempf')
    const cloud = document.querySelector('#cloud')
    const humidity = document.querySelector('#humidity')
    const lastUpdated = document.querySelector('#updated')


    region.innerHTML = data.location.region
    cityName.innerHTML = data.location.name
    tempC.innerHTML = data.current.temp_c
    tempF.innerHTML = data.current.temp_f
    cloud.innerHTML = Number(data.current.cloud)
    humidity.innerHTML = data.current.humidity
    lastUpdated.innerHTML = data.current.last_updated


    let date = new Date()
    h = date.getHours().toLocaleString('Pk')
    m = date.getMinutes().toLocaleString('Pk')
    s = date.getSeconds().toLocaleString('Pk')

    time = h + " : " + m + ' : ' + s
    document.querySelector('.time').innerHTML = time
    if (h < 18 && h > 6) {
        if (data.current.cloud < 20) {

            let img = document.querySelector('#src')


            img.src = '113.png'
        }
        else if (data.current.cloud > 80) {

            let img = document.querySelector('#src')


            img.src = '389.png'
        }
        else if (data.current.cloud > 50) {

            let img = document.querySelector('#src')


            img.src = '176.png'
        }
        else if (data.current.cloud > 20) {

            let img = document.querySelector('#src')


            img.src = '116.png'
        }
     

    }
    else {
   document.body.style.backgroundColor = 'rgba(14, 6, 61, 0.884)'
        document.body.style.color = 'white'

        if (data.current.cloud < 20) {

            let img = document.querySelector('#src')


            img.src = '213.png'
        }
        else if (data.current.cloud > 80) {

            let img = document.querySelector('#src')


            img.src = '389.png'
        }
        else if (data.current.cloud > 50) {

            let img = document.querySelector('#src')


            img.src = '276.png'
        }
        else if (data.current.cloud > 20) {

            let img = document.querySelector('#src')


            img.src = '216.png'
        }




        












        
        

    }




    let day = document.querySelector('.day')
    switch (date.getDay()) {
        case 0:
            day.innerHTML = 'Sunday'


            break;
        case 1:
            day.innerHTML = 'Monday'


            break;
        case 2:
            day.innerHTML = 'Tuesday'


            break;
        case 3:
            day.innerHTML = 'Wendsday'


            break;
        case 4:
            day.innerHTML = 'thursday'


            break;
        case 5:
            day.innerHTML = 'Friday'


            break;
        case 6:
            day.innerHTML = 'Saturday'


            break;


    }






}


