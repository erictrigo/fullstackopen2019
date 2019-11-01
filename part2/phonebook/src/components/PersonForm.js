import React from 'react'

const PersonForm = ({
  handleSubmit,
  handleNameChange,
  handleNumberChange,
  nameValue,
  numberValue,
}) => (
  <>
    <form onSubmit={handleSubmit}>
      <div>
        name: <input onChange={handleNameChange} value={nameValue} />
      </div>
      <div>
        number: <input onChange={handleNumberChange} value={numberValue} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  </>
)

export default PersonForm
