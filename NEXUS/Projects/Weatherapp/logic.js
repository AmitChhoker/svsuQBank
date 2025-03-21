// const button=document.querySelector('button');
// button.addEventListener('click',()=>{
//     const place=document.getElementById('location').value;

//     function update(data){
//         const element= document.getElementById('weatherInfo');
//         let localTime = data.location.localtime; 
//         let [date, time] = localTime.split(" "); 
//         let [hours, minutes] = time.split(":"); 

//         let period = hours >= 12 ? "PM" : "AM"; 
//         hours = hours % 12 || 12; 

//         let formattedTime = `${hours}:${minutes} ${period}`; 

//         element.innerHTML = `
//             <p><strong>Location:</strong> ${data.location.name}, ${data.location.country}</p>
//             <p><strong>Local Time:</strong> ${formattedTime}</p>
//             <p><strong>Temperature:</strong> ${data.current.temp_c} °C</p>
//             <p><strong>Condition:</strong> ${data.current.condition.text}</p>
//             <p><strong>Humidity:</strong> ${data.current.humidity}%</p>
//             <p><strong>Wind Speed:</strong> ${data.current.wind_kph} km/h</p>
//             <p><strong>Air Quality Index (AQI):</strong> ${data.current.air_quality.pm2_5}</p>
//         `;
//     }

//     // 7-Day Forecast
//     const forecastElement = document.getElementById('forecast');
//     forecastElement.innerHTML = "<h2>7-Day Forecast</h2>";

//     data.forecast.forecastday.forEach(day => {
//         const forecastCard = document.createElement("div");
//         forecastCard.classList.add("forecast-card");
//         forecastCard.innerHTML = `
//             <p><strong>${day.date}</strong></p>
//             <img src="${day.day.condition.icon}" alt="${day.day.condition.text}">
//             <p><strong>${day.day.condition.text}</strong></p>
//             <p>🌡 Max: ${day.day.maxtemp_c}°C</p>
//             <p>🌡 Min: ${day.day.mintemp_c}°C</p>
//         `;
//         forecastElement.appendChild(forecastCard);
//     });

//     const prom=fetch(`http://api.weatherapi.com/v1/current.json?key=68bc91f665034254acc115653250703&q=${place}&aqi=yes`)
//     prom
//     .then(response=>response.json())
//     .then(data=>update(data))
//     .catch(error => console.error("Error fetching data:", error));


// })






const button = document.querySelector('button');

button.addEventListener('click', () => {
    const place = document.getElementById('location').value;

    function update(data) {
        const element = document.getElementById('weatherInfo');
        let localTime = data.location.localtime;
        let [date, time] = localTime.split(" ");
        let [hours, minutes] = time.split(":");
        let period = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;
        let formattedTime = `${hours}:${minutes} ${period}`;

        element.innerHTML = `
            <p><strong>Location:</strong> ${data.location.name}, ${data.location.country}</p>
            <p><strong>Local Time:</strong> ${formattedTime}</p>
            <p><strong>Temperature:</strong> ${data.current.temp_c} °C</p>
            <p><strong>Condition:</strong> ${data.current.condition.text}</p>
            <p><strong>Humidity:</strong> ${data.current.humidity}%</p>
            <p><strong>Wind Speed:</strong> ${data.current.wind_kph} km/h</p>
            <p><strong>Air Quality Index (AQI):</strong> ${data.current.air_quality.pm2_5}</p>
        `;

        // 7-Day Forecast
        const forecastElement = document.getElementById('forecast');
        forecastElement.innerHTML = "";

        data.forecast.forecastday.forEach(day => {
            const forecastCard = document.createElement("div");
            forecastCard.classList.add("forecast-card");
            forecastCard.innerHTML = `
                <p><strong>${day.date}</strong></p>
                <img src="${day.day.condition.icon}" alt="${day.day.condition.text}">
                <p><strong>${day.day.condition.text}</strong></p>
                <p>🌡 Max: ${day.day.maxtemp_c}°C</p>
                <p>🌡 Min: ${day.day.mintemp_c}°C</p>
            `;
            forecastElement.appendChild(forecastCard);
        });
    }

    const prom = fetch(`http://api.weatherapi.com/v1/forecast.json?key=68bc91f665034254acc115653250703&q=${place}&days=7&aqi=yes`);
    prom
        .then(response => response.json())
        .then(data => update(data))
        .catch(error => console.error("Error fetching data:", error));
});

const shareButton = document.getElementById("shareWeather");

shareButton.addEventListener("click", () => {
    const location = document.getElementById("location").value;
    const weatherInfo = document.getElementById("weatherInfo").innerText;

    const shareText = `🌤️ Weather Update for ${location}:\n${weatherInfo}\nCheck it out now!`;

    if (navigator.share) {
        navigator.share({
            title: "Weather Report",
            text: shareText
        })
        .then(() => console.log("Weather shared successfully!"))
        .catch((error) => console.log("Error sharing:", error));
    } else {
        alert("Sharing is not supported on this device.");
    }
});

