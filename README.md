# Weather_Dashboard_JLW

Please find the link to the published site below:

## https://jlukewilliams94.github.io/Weather_Dashboard_JLW/


##Acceptance Criteria

GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city

## This project requied 3 seperate APIs

### Current Weather API: "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=" + apiKey;
### UV Index API:"http://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + lat + "&lon=" + lon;
### Five Day Forecast: "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&appid=" + apiKey;

## Search Validator 

### Added a search validator to ensure no button was created for invalid cities.

      var cityInput = $("#searchInput").val().trim();

        var inputURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&units=imperial&appid=" + apiKey;
        
        $.ajax({
            url: inputURL,
            method: "GET",
            success: 
                function () {
                    searchBtn();
                },
                statusCode: {
                    404: function() {
                        console.log("Not a City");
                        alert("Not A City, Try Again!");
                    }
                }
        })

