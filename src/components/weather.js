import React from "react";

const Weather = ({ openWeatherMap, weatherBit, language }) => {
  return (
    <>
      {openWeatherMap ? (
        <div>
          {language === "ru" ? (
            <div className="location">
              <h2 className="textWeatherTittle">Погода вашего местоположения:</h2>
              <div>
                <h2 className="textWeather"> OpenWeatherMap погода </h2>
                <div>
                  <span>Ваше местоположение : </span>
                  <span>
                    {openWeatherMap.name},{openWeatherMap.sys.country}
                  </span>
                </div>
                <div>
                  <span>Температура : </span>
                  <span>{openWeatherMap.main.temp} °C</span>
                </div>
                <div>
                  <span>Давление : </span>
                  <span>{openWeatherMap.main.pressure} мм. рт. ст.</span>
                </div>
              </div>
              <div>
                <h2 className="textWeather"> Weatherbit погода </h2>
                <div>
                  <span>Ваше местоположение : </span>
                  <span>{weatherBit.data[0].city_name}</span>
                </div>
                <div>
                  <span>Температура : </span>
                  <span>{weatherBit.data[0].app_temp} °C</span>
                </div>
                <div>
                  <span>Давление : </span>
                  <span>{weatherBit.data[0].pres} мм. рт. ст.</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="location">
              <h2 className="textWeatherTittle">Weather in your location : </h2>
              <div>
                <h2 className="textWeather"> OpenWeatherMap source </h2>
                <div>
                  <span>Possition (region) : </span>
                  <span>{openWeatherMap.name}</span>
                  <span>{openWeatherMap.sys.country}</span>
                </div>
                <div>
                  <span>Temp : </span>
                  <span>{openWeatherMap.main.temp} °C</span>
                </div>
                <div>
                  <span>Pressure : </span>
                  <span>{openWeatherMap.main.pressure} mmHg</span>
                </div>
              </div>
              <div>
                <p className="textWeather"> Weatherbit source </p>
                <div>
                  <span>Possition : </span>
                  <span>{weatherBit.data[0].city_name}</span>
                </div>
                <div>
                  <span>Temp : </span>
                  <span>{weatherBit.data[0].app_temp} °C</span>
                </div>
                <div>
                  <span>Pressure : </span>
                  <span>{weatherBit.data[0].pres} mmHg</span>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
};

export default Weather;
