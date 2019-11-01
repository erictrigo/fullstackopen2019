import React from 'react'

import Weather from './Weather'

const Country = ({ country, showDetail, handleClick }) => {
  if (showDetail) {
    return (
      <>
        <h1>{country.name}</h1>
        <div>capital {country.capital}</div>
        <div>population {country.population}</div>
        <h2>languages</h2>
        <ul>
          {country.languages.map(language => (
            <li key={language.name}>{language.name}</li>
          ))}
        </ul>
        <img src={country.flag} alt="flag" height="100" width="100" />
        <h2>Weather in {country.capital}</h2>
        <Weather country={country} />
      </>
    )
  } else {
    return (
      <div>
        {country.name}
        <button id={country.alpha3Code} onClick={handleClick}>
          show
        </button>
      </div>
    )
  }
}

export default Country
