import React from 'react'

import Person from './Person'

const Persons = ({ persons, filter, handleClick }) => {
  const rows = () =>
    persons
      .filter(person =>
        person.name.toLowerCase().includes(filter.toLowerCase()),
      )
      .map(person => (
        <Person key={person.name} person={person} handleClick={handleClick} />
      ))

  return <>{rows()}</>
}

export default Persons
