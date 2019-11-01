import axios from 'axios'
import React, { useEffect, useState } from 'react'

import Countries from './components/Countries'
import Filter from './components/Filter'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [countryToShow, setCountryToShow] = useState(null)

  useEffect(() => {
    console.log('effect')
    axios.get('https://restcountries.eu/rest/v2/all').then(response => {
      console.log('promise fulfilled')
      setCountries(response.data)
    })
  }, [])
  console.log('render', countries.length, 'countries')

  const handleFilterChange = event => {
    console.log(event.target.value)
    setFilter(event.target.value)
    setCountryToShow(null)
  }

  const handleShowCountry = event => {
    let countryCode = event.target.id
    let country = countries.find(country => country.alpha3Code === countryCode)
    setCountryToShow(country)
  }

  return (
    <div>
      <Filter handleChange={handleFilterChange} />
      <Countries
        countries={countries}
        countryToShow={countryToShow}
        filter={filter}
        handleClick={handleShowCountry}
      />
    </div>
  )
}

export default App
