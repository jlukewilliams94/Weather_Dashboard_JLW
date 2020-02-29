$(document).ready(function(){

    var apiKey = "4f192ce4ca46b7df0daa43508a144f12";
    var location = "charlotte"

    function currentWeather () {
    
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
        
        function fiveDayForecast () {
        var ffQueryURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&appid=" + apiKey;
       
        $.ajax({
            url: ffQueryURL,
            method: "GET"
          }).then(function(responseFF) {
            console.log(responseFF);
            console.log(responseFF.list[0],responseFF.list[1])

            for (var d = 1; d <= 5; d++) {
            var futureDates = moment().add(d, 'days').calendar()
            console.log(futureDates)
            }
            
            
            
            for (var i = 0; i <= 4; i++) {
                
        
                
                
                var forecastArray = responseFF.list[i];
                var forcastTemp = ("Forcast Temperature: " + ((responseFF.list[i].main.temp - 273.15) *1.8 + 32).toPrecision(2)) + "F";
                var forcastHumidity = ("Forcast Humidity: " + responseFF.list[i].main.humidity + "%")
                

               
                console.log(forcastTemp)
                console.log(forcastHumidity)

            }
        });
        };


        currentUVIndex()
        fiveDayForecast()




    });
    };      

    

       

        
    

  

    
    


   
    currentWeather()
});
