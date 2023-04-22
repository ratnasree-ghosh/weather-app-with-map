var fetch_btn = document.getElementById("btn");
var box = document.getElementById("box");
var latLong = document.getElementById("latLong");
var lat = document.getElementById("lat");
var long = document.getElementById("long");




function getLocation(){
    if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition(showPosition);
         }else{
             latLong.innerHTML = "geolocation is not supported bt this browser";
         }

         
}



function showPosition(position){
    fetch_btn.style.display="none";
    lat.innerHTML = "Lat: " + position.coords.latitude;
    long.innerHTML = "Long: " + position.coords.longitude;
    // latLong.innerHTML = `<span class="lat">Lat: ${position.coords.latitude}</span>
    // <span class="long">Long: ${position.coords.longitude}</span>`

    var coords = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);

     var mapOptions = {
        zoom: 10,
        center: coords,
        mapTypeId: google.maps.MapTypeId.ROADMAP
     }

     var map = new google.maps.Map(document.getElementById("map"), mapOptions);
     var marker = new google.maps.Marker({map: map, position: coords});

     weatherData(position.coords.latitude,position.coords.longitude);
}

function weatherData(lat,long){
    var link = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=e41b75d2588e3a20194ac7fcd012b11d`
    fetch(link)
    .then((res)=>res.json())
    .then(function test(data){
        console.log(data);
        var weather = document.getElementById("weather");
        
        weather.innerHTML = ` <h1>Weather data</h1>
                            <div class="weather-geo">
                                <p>Location: ${data.name}</p>
                                <div class="latLng-data">
                                    <p>Lat: ${data.coord["lat"]}</p>
                                    <p>Long: ${data.coord["lon"]}</p>
                                </div>
                                
                            
                                <p>TimeZone: ${data["timezone"]} </p>
                                <p>Wind Speed: ${data.wind["speed"]} </p>
                                <p>Pressure: ${data.main["pressure"]} </p>
                                <p>Humidity: ${data.main["humidity"]} </p>
                                <p>Wind Direction: ${data.wind["deg"]}</p>
                                <p>UV Index: </p>
                                <p>Feels Like: ${data.main["feels_like"]} </p>
                            </div>
                            `;
         weather.style.display = "block";
    })
}