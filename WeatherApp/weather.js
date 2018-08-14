var api = "https://fcc-weather-api.glitch.me/api/current?";
var latitude;
var longitude;
var tempUnit = 'C';
var currentTempInCelsius;

$(document).ready(function() 
{
    if (navigator.geolocation) 
    {
      navigator.geolocation.getCurrentPosition(function (position) 
      {
        latitude = "lat=" + position.coords.latitude;
        longitude = "lon=" + position.coords.longitude;
        getWeather(latitude, longitude);
      });
    } 
    else 
    {
      console.log("Geolocation is not supported by this browser.");
    }
  
    $("#tempunit").click(function () {
      var currentTempUnit = $("#tempunit").text();
      var newTempUnit = currentTempUnit == "C" ? "F" : "C";
      $("#tempunit").text(newTempUnit);
      if (newTempUnit == "F") {
        var fahTemp = Math.round(parseInt($("#temp").text()) * 9 / 5 + 32);
        $("#temp").text(fahTemp + " " + String.fromCharCode(176));
      } else {
        $("#temp").text(currentTempInCelsius + " " + String.fromCharCode(176));
      }
    });
    
  });
  
  function getWeather(lat, lon) 
  {
    var urlString = api + lat + "&" + lon;
    $.ajax(
    {
      url: urlString, success: function (result)
      {
        $("#city").text(result.name + ", ");
        $("#country").text(result.sys.country);
        currentTempInCelsius = Math.round(result.main.temp * 10) / 10;
        $("#temp").text(currentTempInCelsius + " " + String.fromCharCode(176));
        $("#tempunit").text(tempUnit);
        $("#desc").text(result.weather[0].main);
        IconGen(result.weather[0].main);
      }
    });
  }
  
  function IconGen(desc) {
    var icon = desc.toLowerCase();
    switch (icon) {
      case 'drizzle':
        addIcon(icon);
        break;
      case 'clouds':
        addIcon(icon);
        break;
      case 'rain':
        addIcon(icon);
        break;
      case 'snow':
        addIcon(icon);
        break;
      case 'clear':
        addIcon(icon);
        break;
      case 'thunderstom':
        addIcon(icon);
        break;
      default:
        $('div.clouds').removeClass('hide');
    }
  }
  
  function addIcon(icon) {
    $('div.' + icon).removeClass('hide');
  }