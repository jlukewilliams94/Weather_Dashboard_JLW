$(document).ready(function(){

    var apiKey = "4f192ce4ca46b7df0daa43508a144f12";
    var location = ""

    $("#searchBtn").on("click", function CurrentWeather (e){
        $("#fiveDayForcastDiv").empty();
        e.preventDefault();
        var location = $("#searchInput").val()
    
    var cfQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=" + apiKey;
    var todaysDate = moment().format("LLLL");
    
    $.ajax({
        url: cfQueryURL,
        method: "GET"
      }).then(function(responseCF) {
        console.log(responseCF);
        $("#cityReturn").text(responseCF.name);
        $("#todaysDate").text(todaysDate);
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
                $("#uvToday").text("UV Index: " + responseCFUV.value)
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

            for (var i = 1; i <= 5; i++) {
            var futureDates = moment().add(i, 'days').calendar();
                console.log(futureDates)
                cardDiv = $("<div>");
                cardDiv.addClass("col mx-1")
                cardBody = $("<div>");
                cardBody.addClass("card-body forecast-card");
                cardTitle = $("<h5>").text(futureDates)
                
                cardDiv.append(cardBody);
                cardBody.append(cardTitle);
                
                fiveDayForcastDiv.append(cardDiv);

                var forecastArray = responseFF.list[i];
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
    });      

    
    // Search Button Location
    
     

        
    

  

    
    


   
    //currentWeather()
});
