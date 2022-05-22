const token = "pk.eyJ1IjoiaXNhYmVsbGEtaHUiLCJhIjoiY2wzZnFiOHlhMDJ3YzNjbGp4NWEzMWtndiJ9.kVgtyWuoNZESQuCvX0jkIA"

const searchInput = document.getElementById("location");
searchInput.addEventListener("keyup",function(e){
  fetchSuggestions (e.target.value);
});

function fetchSuggestions(search_text){
  fetch("https://api.mapbox.com/geocoding/v5/mapbox.places/"+search_text+".json?access_token="+token)
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    displaySuggestion(json);
  });
}

function displaySuggestion(json){
  const datalist = document.getElementById("suggestions");
  const features = json.features;
  const options = features.map(function (val){
    const option = document.createElement("option");
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