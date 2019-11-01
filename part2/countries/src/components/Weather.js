import axios from 'axios'
import React, { useState } from 'react'

const Weather = ({ country }) => {
  const [weather, setWeather] = useState({})
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')

  axios
    .get(
      `http://api.weatherstack.com/current?access_key=53d73d9fb5fc9bee070dbf1d5121096d&query=${country.capital}`,
    )
    .then(response => {
      setImage(response.data.current.weather_icons[0])
      setDescription(response.data.current.weather_descriptions[0])
      setWeather(response.data.current)
    })

  return (
    <>
      <div>
        <b>temperature: </b>
        {weather.temperature} Celsius
      </div>
      <img src={image} alt={description} />
      <div>
        <b>wind: </b>
        {weather.wind_speed} kph direction {weather.wind_dir}
      </div>
    </>
  )
}

export default Weather
