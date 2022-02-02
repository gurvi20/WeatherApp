import React, { useState } from "react";

const api = {
  key: "49c28aad59af4885e56a5a5151cf0c36",
  base: "http://api.openweathermap.org/data/2.5/",
};

const App = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const[forecast, setForecast]=useState({});

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          console.log(result);
        });
      setQuery("");
      console.log(new Date( ));

      fetch(`${api.base}forecast?q=${query}&units=metric&APPID=${api.key}`)
  
      .then((res) => res.json())
      .then((result) => {
        setForecast(result);
        console.log(result );
      });
    }
  };

 
  

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thurday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };
  return (
    <div className={(typeof weather.main != "undefined")? ((weather.main.temp>16)?'app warm' :'app'):'app'}>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name},{weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>

            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°c</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) :  ""
        }
<div class="scrolling-wrapper">
{typeof weather.main != "undefined" ? ( 
  typeof forecast.list != "undefined" ? (  
  forecast.list.map((element) => (
          <div className="card">
            <div className="weather-box">
             <div className="date">{(new Date(element.dt*1000)).getUTCHours()}</div>

            <div className="temp">{Math.round(element.main.temp)}°c</div> 
            </div>
          </div>
  ))):"") :  ""
        }
        </div>
      </main>
    </div>
  );
};
export default App;
