import React from 'react'

import Country from './Country'

const Countries = ({ countries, filter, countryToShow, handleClick }) => {
  if (filter === '') return <></>

  if (countryToShow !== null)
    return (
      <Country
        key={countryToShow.alpha3Code}
        country={countryToShow}
        showDetail={true}
        handleClick={handleClick}
      />
    )

  let filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(filter.toLowerCase()),
  )

  let totalFiltered = filteredCountries.length

  if (totalFiltered > 10) {
    return <div>Too many matches, specify another filter</div>
  } else if (totalFiltered < 10) {
    const rows = () =>
      countries
        .filter(country =>
          country.name.toLowerCase().includes(filter.toLowerCase()),
        )
        .map(country => (
          <Country
            key={country.alpha3Code}
            country={country}
            showDetail={totalFiltered === 1}
            handleClick={handleClick}
          />
        ))

    return <>{rows()}</>
  }
}

export default Countries
