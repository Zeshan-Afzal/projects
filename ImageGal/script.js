// Define the API URL

//flag to check if the user LoggedIn or not
let isLoggedIn = false;
// pages for api
let page=1;
//api key
let key = "";
//variables to hold  data
let query;
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
let gallery = JSON.parse(localStorage.getItem("gallery")) || [];
//getting DOM elements
const mainPhotosContainer = document.querySelector(".main-photo-container");
let messageForPhotos=document.querySelector('.h1-for-photos')
let LoadMoreBtn=document.querySelector('.more-btn ')
let inputVal = document.querySelector(".inpVal");
let tabs = document.querySelectorAll("li");
let login = document.querySelector(".login");
let searchBox = document.querySelector(".search-box");

//eventListner on login button
login.addEventListener("click", (e) => {
  handleLogin(e);
});

//eventListner on tabs
tabs.forEach((tab) => {
  tab.addEventListener("click", handleTabs);
});
//eventListner for loadMore button 
LoadMoreBtn.addEventListener('click',()=>{
	page++
	searchAndRenderPhotos()
})

//
inputVal.addEventListener('keydown',(e)=>{
	if(e.key==='Enter'){
		page=1;
	  searchAndRenderPhotos()
	}
})
//eventListner on search button to search for photos

document
  .querySelector(".search-btn")
  .addEventListener("click",()=>{
	  
	  page=1;
	  searchAndRenderPhotos()
  } );
//eventListner on mainPhotosContainer to add remove photos
document
  .querySelector(".main-photo-container")
  .addEventListener("click", handleAddRemoveClicks);
//function responsible for handling tabs and rendering photos on tab clicks
function handleTabs(e) {
  let tabId = e.target.id;
  openTab(tabId);
  let activeTabId=tabId;

  if (activeTabId === "main") {
   searchAndRenderPhotos()
  }

  if (activeTabId === "gallery") {
	  page=1
	  renderPhotosInTab(gallery)
  }
  if (activeTabId === "favorit") {
	  page=1
	renderPhotosInTab(favorites)

  }
}

//function responsible for handling tabs content and some other functionality related to tabs
function renderPhotosInTab(tabArray) {
  mainPhotosContainer.innerHTML = "";
  let activeTabId = activeTab();
  messageForPhotos.style.display='none'
  LoadMoreBtn.style.display = 'none';
  searchBox.style.opacity = 0;
  renderPhotos(activeTabId, tabArray);
}




/*

//fucntion responisble for rendering  photos in gallery
function renderGallery(){
	 mainPhotosContainer.innerHTML = "";
	let activeTabId=activeTab()
	LoadMoreBtn.style.display='none';
    searchBox.style.opacity = 0;
    renderPhotos(activeTabId, gallery);
	
}

*/
/*
//fucntion responisble for rendering  photos in favorites
function renderFavorite(){
	  mainPhotosContainer.innerHTML = "";
	let activeTabId=activeTab()
	 LoadMoreBtn.style.display='none';
    searchBox.style.opacity = 0;
    renderPhotos(activeTabId, favorites);
	
}
*/
//function responsible for opening spesifice tab based on the id provided by  handltab function
function openTab(tabId) {
  for (let i = 0; i < tabs.length; i++) {
    tabs[i].classList.remove("active");
  }

  document.getElementById(tabId).classList.add("active");
}
//function resposible for handling api
async function getPhotosFromApi() {
  try {
	  const baseUrl = `https://api.unsplash.com/search/photos?per_page=12&page=${page}&query=${query}&client_id=ds9Xs3l6PjIhSsb8NrDn9nTPYq1cvz90ZbOkqkS0RKs`;
    let response = await fetch(`${baseUrl}`);
    let data = await response.json();

    let photosArr = data.results;
    return photosArr;
  } catch (error) {
      return error;
  }
}
//function responsible for  searching functionality and rendering photos based on each tabs
async function searchAndRenderPhotos() {
  showSpinner();
  query = inputVal.value;
  let newPhotos = await getPhotosFromApi();
  let activeTabId = activeTab();
 


 if(page===1){
	  mainPhotosContainer.innerHTML = "";
 }
    
	   if (activeTabId === "main") {
    searchBox.style.opacity = 1;
    newPhotos.forEach((photo) => {
      mainPhotosContainer.innerHTML += generateHtmlForTabs(activeTabId, photo);
    });
  }
	   
  if(mainPhotosContainer.innerHTML!==''){
	   LoadMoreBtn.style.display='block';
	   messageForPhotos.style.display='none'
  }
 hideSpinner();

}

//function responsible for renderning photos for gallery and favorite tab
const renderPhotos = (activeTabId, photos) => {

	if( (photos.length === 0)){
		  mainPhotosContainer.innerHTML =` <h1 class='add-photos' >Add Photos</h1>`
		  return;
	}
  photos.forEach((photo) => {
    mainPhotosContainer.innerHTML += generateHtmlForTabs(activeTabId, photo);
  });

 
};
//function responsible for providing the id of active tab
function activeTab() {
  let id;
  tabs.forEach((tab) => {
    if (tab.classList.contains("active")) {
      id = tab.id;
    }
  });
  return id;
}
//function responsible for generating the hmtl for each tab based on id
function generateHtmlForTabs(tabId, photo) {
  if (tabId === "main") {
    return `
            <div class="photo-box">
                <div class="img">
				
                <a href='${photo.urls.full}' target='_blank'>    <img src="${photo.urls.regular}" title='click to view full image' ></a>
                </div>
                <div class="fav-button">
				
				<p class='description'>${photo.alt_description}
</p>
                    <button class="add-to-gal" data-id='${photo.id}' >Add to Gallery</button>
                    <button class="fav" data-id='${photo.id}'>Favorites</button>
                </div>
            </div>`;
  } else if (tabId === "gallery") {
    return `
            <div class="photo-box">
                <div class="img">
                   <a href='${photo.full}' target='_blank'>    <img src="${photo.url}" ></a>
                </div>
                <div class="fav-button">
				<p class='description'>${photo.description}
</p>
                    <button class="remove-from-gal" data-id='${photo.id}'>Remove from Gallery</button>
                    
            </div>`;
  } else if (tabId === "favorit") {
    return `
            <div class="photo-box">
                <div class="img">
                    <a href='${photo.full}' target='_blank'>    <img src="${photo.url}" ></a>
                </div>
                <div class="fav-button">
				<p class='description'>${photo.description}
</p>
                   
                    <button class="unfav" data-id='${photo.id}'>Unfavorite</button>
                </div>
            </div>`;
  }
}
//function responsible for handling all the add remove favorite buttons click
async function handleAddRemoveClicks(e) {
	
  if (isLoggedIn) {
    if (e.target.classList.contains("add-to-gal")) {
      let id = e.target.dataset.id;
      let photos = await getPhotosFromApi();

      addPhotos(photos, id, gallery);
    }
    if (e.target.classList.contains("fav")) {
      let id = e.target.dataset.id;
      let photos = await getPhotosFromApi();
      let matchingItem;
      addPhotos(photos, id, favorites);
    }

    if (e.target.classList.contains("remove-from-gal")) {
      let id = e.target.dataset.id;

      gallery = gallery.filter((item) => id !== item.id);
renderPhotosInTab(gallery)
      saveToGallery();
	  
    }
    if (e.target.classList.contains("unfav")) {
      let id = e.target.dataset.id;

      favorites = favorites.filter((item) => id !== item.id);
renderPhotosInTab(favorites)
      saveToFavorite();
	  
    }

  } else {
    alert("login First");
  }
}
//function resposible for adding photos to gallery or mark photos as favorite
function addPhotos(photos, id, photoArray) {
	if(!photos){
			return;
	}
  const matchingItem = photos.find((photo) => photo.id === id);
	

  if (!photoArray.some((element) => matchingItem.id === element.id)) {
    photoArray.push({ id: matchingItem.id, url: matchingItem.urls.regular,full:matchingItem.urls.full,description: matchingItem.alt_description });
    saveToGallery();
    saveToFavorite();
  } else {
    alert("Already Added");
  }
}
//function responsible for saving gallery data to local storage
function saveToGallery() {
  localStorage.setItem("gallery", JSON.stringify(gallery));
}
//function resposible for saving favorite data to local storage
function saveToFavorite() {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}
//function responsible for handling login functionality
function handleLogin(e) {
  if (e.target.innerHTML === "Login") {
    e.target.innerHTML = "Logout";
    e.target.style.background = "red";
    isLoggedIn = true;
  } else if (e.target.innerHTML === "Logout") {
    e.target.style.background = "green";
    e.target.innerHTML = "Login";
    isLoggedIn = false;
  }
}
//function resposible for showing Sppinner
function showSpinner() {
  document.getElementById("loading-spinner").style.display = "block";
}
//function resposible for hidding  Sppinner
function hideSpinner() {
  document.getElementById("loading-spinner").style.display = "none";
}
