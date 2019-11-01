import React from 'react'

const Total = ({ parts }) => {
  const total = parts
    .map(part => part.exercises)
    .reduce((total, exercise) => total + exercise)
  return (
    <div>
      <p>
        <b>total of {total} exercises</b>
      </p>
    </div>
  )
}

export default Total
