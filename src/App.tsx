import React, { MouseEvent, useState } from 'react'
import { v4 as uuid } from 'uuid'
import './App.css'
import Editor from './components/editor/Editor'
import { Graph } from './components/graph/graph'
import PersonTable from './components/person-table/PersonTable'
import { Person } from './types/person'
import { getSpouse } from './utilities'

function App() {
  const data = localStorage.getItem('family')
  const parsedData: Person[] = data && JSON.parse(data)

  const [family, setFamily] = useState<Person[]>(parsedData ? parsedData : [])
  const [selectedPerson, setSelectedPerson] = useState<Person>()
  const [editing, setEditing] = useState<boolean>(false)
  const [showGraph, setShowGraph] = useState<boolean>(false)

  const closeEditor = () => setEditing(false)
  const openEditor = (person: Person) => {
    setSelectedPerson(person)
    setEditing(true)
  }
  const handleAddPerson = (event: MouseEvent<HTMLButtonElement>) => {
    setSelectedPerson(undefined)
    setEditing(true)
  }
  const toggleGraph = (event: MouseEvent<HTMLButtonElement>) => {
    setShowGraph(!showGraph)
  }

  const setPerson = (person: Partial<Person>) => {
    const updatedPerson: Person = {
      id: person.id ? person.id : uuid(),
      name: person.name!,
      birth: person.birth,
      death: person.death,
      parents: person.parents,
      spouse: person.spouse,
      last_updated: new Date(),
    }

    const updatedFamily = person.id ? [...family] : [updatedPerson, ...family]
    if (person.id)
      updatedFamily[family.findIndex((p) => person.id === p.id)] = updatedPerson

    if (person.spouse) {
      const spouse = getSpouse(updatedFamily, updatedPerson)!
      const spouseIndex = updatedFamily.findIndex(
        (person) => person.id === spouse?.id
      )
      const updatedSpouse = { ...spouse, spouse: updatedPerson.id }
      updatedFamily[spouseIndex] = updatedSpouse
    }

    localStorage.setItem('family', JSON.stringify(updatedFamily))
    setSelectedPerson(undefined)
    setFamily(updatedFamily)
    closeEditor()
  }

  return (
    <div id="App" className="center-aligned">
      {editing && (
        <Editor
          people={family}
          person={selectedPerson}
          setPerson={setPerson}
          closeEditor={closeEditor}
        />
      )}
      <div id="App_header">
        <h1>Family Tree Builder</h1>
        {!showGraph && (
          <button
            id="App_add-person"
            className="primary right-aligned"
            onClick={handleAddPerson}
          >
            Add Person
          </button>
        )}
        <button
          id="App_toggle-graph"
          className={'secondary' + (showGraph ? ' right-aligned' : '')}
          onClick={toggleGraph}
        >
          {showGraph ? 'Show Table' : 'Show Graph'}
        </button>
      </div>
      {!showGraph && <PersonTable people={family} openEditor={openEditor} />}
      {showGraph && <Graph family={family} />}
    </div>
  )
}

export default App
