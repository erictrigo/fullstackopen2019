import React from 'react'

const Person = ({ person, handleClick }) => {
  return (
    <div>
      {person.name} {person.number}
      <button id={person.id} onClick={handleClick}>
        delete
      </button>
    </div>
  )
}

export default Person
