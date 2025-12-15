/* ----------dom variables----------- */

let input = document.getElementById("searche");
let icon = document.getElementById("sicon");
let icond1 = document.getElementById("icond1");
let icond2 = document.getElementById("icond2");
let icond3 = document.getElementById("icond3");
let icond4 = document.getElementById("icond4");

let tmpd1 = document.getElementById("tmpd1");
let tmpd2 = document.getElementById("tmpd2");
let tmpd3 = document.getElementById("tmpd3");
let tmpd4 = document.getElementById("tmpd4");

let day1 = document.getElementById("d1");
let day2 = document.getElementById("d2");
let day3 = document.getElementById("d3");
let day4 = document.getElementById("d4");

/* ----------Fetch API----------- */

let url = "https://api.openweathermap.org/data/2.5/forecast?q=";
let url2 = "https://api.openweathermap.org/data/2.5/weather?q=";
let key = "&appid=87f421fa1877a07c419e8d3973fa9d4e";

async function getInfos(city, r){
    const res = await fetch(r+city+key);
    const data= await res.json();
    return data;
}

/* ----------function----------- */

function suntime(t){
    const date = new Date(t*1000);
    return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    });
}

async function setInfos() {
    if(input.value == ""){
        alert("nothing to search !");
        return;
    }
    const currentData = await getInfos(input.value, url2);
    if(currentData.message == 'city not found'){
        alert('city not found');
        return;
    }
    document.getElementById("h").classList.remove("hiden");
    //status
    document.getElementById("status").textContent = currentData.weather[0].main;
    icon.src = setIcon(currentData.weather[0].icon);
    //tempurature
    document.getElementById("temp").textContent = Math.round(currentData.main.temp - 273.15) + "°C";
    //tempurature max et min
    document.getElementById("tmax").textContent = Math.round(currentData.main.temp_max - 273.15) + "°C";
    document.getElementById("tmin").textContent = Math.round(currentData.main.temp_min - 273.15) + "°C";
    //wind speed
    document.getElementById("wind").textContent = currentData.wind.speed + " km/h";
    //sunrise et sunset
    document.getElementById("sunrise").textContent = suntime(currentData.sys.sunrise);
    document.getElementById("sunset").textContent = suntime(currentData.sys.sunset);


    const dailyData = await getInfos(input.value, url);
    const forecast = dailyData.list;
    const daily = forecast.filter(item =>   item.dt_txt.includes("00:00:00")).slice(-4);

    //day 1
    icond1.src = setIcon(daily[0].weather[0].icon);
    tmpd1.textContent = Math.round(daily[0].main.temp - 273.15) + "°C";
    day1.textContent = setDay(daily[0].dt_txt);
    //day 2
    icond2.src = setIcon(daily[1].weather[0].icon);
    tmpd2.textContent = Math.round(daily[1].main.temp - 273.15) + "°C";
    day2.textContent = setDay(daily[1].dt_txt);
    //day 3
    icond3.src = setIcon(daily[2].weather[0].icon);
    tmpd3.textContent = Math.round(daily[2].main.temp - 273.15) + "°C";
    day3.textContent = setDay(daily[2].dt_txt);
    //day 4
    icond4.src = setIcon(daily[3].weather[0].icon);
    tmpd4.textContent = Math.round(daily[3].main.temp - 273.15) + "°C";
    day4.textContent = setDay(daily[3].dt_txt);
}

function setIcon(iconId){
    return `https://openweathermap.org/img/wn/${iconId}@4x.png`;
}

function setDay(dayName){
    const date = new Date(dayName);
    const days = ["sunday", "monday", "tursday", "wednesday", "thursday", "friday", "saturday"];
    return days[date.getDay()];
}

document.addEventListener("keypress" , (e) => {
    if(e.key == "Enter") {
        setInfos();
        
    }
})

document.getElementById("exit").addEventListener("click", () => {
    document.getElementById("h").classList.add("hiden");
    input.value = "";
});

document.getElementById("mode").addEventListener("click", () => {
     document.body.classList.toggle("light");
});