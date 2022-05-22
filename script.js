const token = "pk.eyJ1IjoiaXNhYmVsbGEtaHUiLCJhIjoiY2wzZnFiOHlhMDJ3YzNjbGp4NWEzMWtndiJ9.kVgtyWuoNZESQuCvX0jkIA"

const searchInput = document.getElementById("location");
searchInput.addEventListener("keyup",function(e){
  fetchSuggestions (e.target.value);
});

let result = {};

function fetchSuggestions(search_text){
  fetch("https://api.mapbox.com/geocoding/v5/mapbox.places/"+search_text+".json?access_token="+token)
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    result = {};
    json.features.forEach(function (val){
      const key = val.place_name;
      result[key]=val;
    });
    displaySuggestion(json);
  });
}

function displaySuggestion(json){
  const datalist = document.getElementById("suggestions");
  const features = json.features;
  const options = features.map(function (val){
    const option = document.createElement("option");
    // option.id = coordinateToId(val.geometry.coordinates);
    option.value = val.place_name;
    return option;
  });
  datalist.replaceChildren(...options);
  // for (const val of features){
  //   const option = document.createElement("option");
  //   option.value = val.place_name;
  //   datalist.appendChild(option);
  // }
}

// function coordinateToId(coordinates){
//   return `${coordinates[0]}, ${coordinates[1]}`;
// }
const searchForm = document.getElementById("searchForm");
searchForm.addEventListener("submit",function(e){
  e.preventDefault();
  let feature = result[searchInput.value];
  const newLongitude = document.getElementById("longitude");
  newLongitude.value = feature.geometry.coordinates[0];
  const newLatitude = document.getElementById("latitude");
  newLatitude.value = feature.geometry.coordinates[1];
});