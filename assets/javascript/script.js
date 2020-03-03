$(document).ready(function(){

    var apiKey = "4f192ce4ca46b7df0daa43508a144f12";
    var location = "Charlotte"
    var favArray = [];
    
    function createBtn () {
        var renderFavCity = JSON.parse(localStorage.getItem("searchCities"));
        $("#favCities").empty()
        if (renderFavCity === null) {
        return
        }else {
        renderFavCity.forEach(function (city, index) {
        var buttonInfo = $("<input>").attr({
            type: "button",
            value: city,
            idenfifier: index,
            class: "row col-md-10 btn btn-light"
        })
        $("#favCities").append(buttonInfo);
        })
        }             
    };


    function currentWeather (){
    
    
    
    var cfQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=" + apiKey;
    var todaysDate = moment().format("LLLL");
    
    $.ajax({
        url: cfQueryURL,
        method: "GET"
      }).then(function(responseCF) {
        console.log(responseCF);
        $("#cityReturn").text(responseCF.name);
        $("#todaysDate").text(todaysDate);
        var cWeatherIcon = $("<img>").attr("src", "https://openweathermap.org/img/w/" + responseCF.weather[0].icon + ".png");
         $("#weatherIcon").append(cWeatherIcon);
        var tempFaren = ("Current Tempreture: " + ((responseCF.main.temp - 273.15) *1.8 + 32).toPrecision(2)) + "F";
        console.log(tempFaren)
        $("#tempToday").text(tempFaren);
        $("#humidityToday").text("Current Humidity: " + responseCF.main.humidity + "%");
        $("#windToday").text("Current Wind Speed: " + responseCF.wind.speed + "mph");
        var lon = responseCF.coord.lon;
        var lat = responseCF.coord.lat;
        var cityID = responseCF.id
        console.log(cityID)
        console.log(lat)
        console.log(lon)
        
        function currentUVIndex (){
            
            uxQueryURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + lat + "&lon=" + lon;

            $.ajax({
                url: uxQueryURL,
                method: "GET"
            }).then(function(responseCFUV) {
                console.log(responseCFUV);
                $("#uvToday").text("UV Index: ")
                uvValue = $("<span>").text(responseCFUV.value)
                $("#uvToday").append(uvValue)
                if (responseCFUV.value <= 3) {
                uvValue.attr("style", "background-color: green;")
                } else if (responseCFUV.value > 3 && responseCFUV.value <= 6) {
                uvValue.attr("style", "background-color: yellow;")
                }else if (responseCFUV.value > 6 && responseCFUV.value <= 9) {
                uvValue.attr("style", "background-color: orange;")
                } else{
                uvValue.attr("style", "background-color: red;")
                };
            });

        };
        
        var fiveDayForcastDiv = $("#fiveDayForecast");
        $("#fiveDayForcastDiv").empty();
        function fiveDayForecast () {
        var ffQueryURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&appid=" + apiKey;
       
        $.ajax({
            url: ffQueryURL,
            method: "GET"
          }).then(function(responseFF) {

            for (var i = 7; i <= 40; i+=8)  {
            var futureDates = moment(responseFF.list[i].dt_txt).format("MM/DD/YYYY");;
                console.log(futureDates)
                cardDiv = $("<div>");
                cardDiv.addClass("col mx-1")
                cardBody = $("<div>");
                cardBody.addClass("card-body forecast-card");
                cardTitle = $("<h5>").text(futureDates)
                
                cardDiv.append(cardBody);
                cardBody.append(cardTitle);
                
                fiveDayForcastDiv.append(cardDiv);

                var fWeatherIcon = $("<img>").attr("src", "https://openweathermap.org/img/w/" + responseFF.list[i].weather[0].icon + ".png");
                cardTitle.append(fWeatherIcon);
                var forcastTemp = $("<li>").text(("Forcast Temperature: " + ((responseFF.list[i].main.temp - 273.15) *1.8 + 32).toPrecision(2)) + "F");
                var forcastHumidity = $("<li>").text("Forcast Humidity: " + responseFF.list[i].main.humidity + "%");
                forcastTemp.addClass("card-text");
                forcastHumidity.addClass("card-text")
                var unorderedList  = $("<ul>")
                unorderedList.append(forcastTemp, forcastHumidity);
                cardTitle.append(unorderedList);
               
                console.log(forcastTemp)
                console.log(forcastHumidity)

            }
            
            
            
        });
        };


        currentUVIndex()
        fiveDayForecast()

    });
    };      

    
    // Search Button Location
    
    $("#searchBtn").on("click", function (e) {

        var favCity = $("#searchInput").val().trim();
        favArray.push(favCity);
        localStorage.setItem("searchCities", JSON.stringify(favArray));
        $("#searchInput").val("");
        createBtn ();
    });


    createBtn()
    currentWeather()
});
