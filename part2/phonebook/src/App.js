import React, { useEffect, useState } from 'react'

import Filter from './components/Filter'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [notificationType, setNotificationType] = useState('')

  useEffect(() => {
    console.log('effect')
    personService.getAll().then(initialPersons => {
      console.log('promise fulfilled')
      setPersons(initialPersons)
    })
  }, [])
  console.log('render', persons.length, 'persons')

  const addPerson = event => {
    event.preventDefault()

    if (persons.some(person => person.name === newName)) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`,
        )
      ) {
        let existingPerson = persons.find(person => person.name === newName)
        let id = existingPerson.id
        const updatedPerson = { ...existingPerson, number: newNumber }

        personService
          .update(id, updatedPerson)
          .then(returnedPerson => {
            setMessage(`Updated ${returnedPerson.name}`)
            setNotificationType('success')
            setTimeout(() => {
              setMessage(null)
              setNotificationType('')
            }, 3000)

            setPersons(
              persons.map(person =>
                person.id !== id ? person : returnedPerson,
              ),
            )
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            setMessage(
              `Information of '${updatedPerson.name}' has already been removed from server`,
            )
            setNotificationType('error')
            setTimeout(() => {
              setMessage(null)
              setNotificationType('')
            }, 3000)
          })
      }
    } else {
      const person = {
        name: newName,
        number: newNumber,
      }

      personService.create(person).then(returnedPerson => {
        setMessage(`Added ${returnedPerson.name}`)
        setNotificationType('success')
        setTimeout(() => {
          setMessage(null)
          setNotificationType('')
        }, 3000)

        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
    }
  }

  const removePerson = event => {
    let id = parseInt(event.target.id)
    let personName = persons.find(person => person.id === id).name

    if (window.confirm(`Delete ${personName}?`)) {
      personService.remove(id).then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
    }
  }

  const handleFilterChange = event => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const handleNameChange = event => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = event => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={notificationType} />
      <Filter handleChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        handleSubmit={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        nameValue={newName}
        numberValue={newNumber}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} handleClick={removePerson} />
    </div>
  )
}

export default App
