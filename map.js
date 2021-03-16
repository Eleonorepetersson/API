// Sökinställningar värden ändras varje gång man flyttar på kartan
var latitude = 0;
var longitude = 0;
var searchDistance = 5;

// function onClickMenu(){
//     document.getElementById('menu-bar').classList.toggle('change');
//     document.getElementById('nav').classList.toggle('change-btn');
// }


// mina inställningar för kartan och min nyckel
mapboxgl.accessToken = 'pk.eyJ1IjoibG9sYTQyIiwiYSI6ImNrbWFjcTMybTB3aGoycHBobXdybGIwM3oifQ.xpZAZQq4l3mcr95sV2q45w';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11'
});

// hämtar mitten koordinaaterna och uppdatera sökinställningarna
function getCenterCoordinates(){
    const mapCenter = map.transform._center;
    latitude = mapCenter.lat;
    longitude = mapCenter.lng;
    return {lng: mapCenter.lng, lat: mapCenter.lat};
}
// varje gång jag släpper ger den mig kordinater
map.on("dragend", () => {
    console.log(getCenterCoordinates());
})

// min documenu api
function fetchAPI() {
    // const url = `https://api.documenu.com/v2/restaurants/search/geo?lat=39&lon=-94&distance=5`;
    const url = `https://api.documenu.com/v2/restaurants/search/geo?lat=${latitude}&lon=${longitude}&distance=${searchDistance}`;
    fetch(url, {headers: {"X-API-KEY": "6e9cd45e77008710319e9ceb8d797da6"}})
        .then(response => response.json())
        .then(jsondata => {
            // Gör saker med datan här!
            console.log(jsondata);
            cardList.innerHTML = "";
            // för varje restaurang skapar den en card
            for(let i = 0; i < jsondata.data.length; i++){
                createRestaurantCard(jsondata.data[i]);
            }
        })
        .catch(err => {console.log(err)});
}

// sökfunktion utan att använda console
const searchButton = document.querySelector("#button_search");
searchButton.addEventListener("click", () => {
    console.log("Kapaow!");
    fetchAPI();
});

// list of caaaaaards
const cardList = document.querySelector("#cardList");

// skapar caaaaards
function createRestaurantCard(restaurant) {
    const newDiv = document.createElement("div");
    newDiv.className = "restaurantcard";

    const nameLabel = document.createElement("h2");
    nameLabel.innerText = restaurant.restaurant_name;
newDiv.appendChild(nameLabel); 

    const newLine = document.createElement("hr");
newDiv.appendChild(newLine);

    const addressLabel = document.createElement("h3");
    addressLabel.innerText = restaurant.address.formatted;
newDiv.appendChild(addressLabel);
    const phoneLabel = document.createElement("h3");
    phoneLabel.innerText = restaurant.restaurant_phone;
newDiv.appendChild(phoneLabel);

cardList.appendChild(newDiv);
}

    // create h2 with restaurant name
    // create h3 with restaurant street
    // create h3 with restaurant phone
