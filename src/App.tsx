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

  const graph = {
    nodes: [
      {
        id: 1,
        title: 'Node A',
        x: 258.3976135253906,
        y: 331.9783248901367,
        type: 'empty',
      },
      {
        id: 2,
        title: 'Node B',
        x: 593.9393920898438,
        y: 260.6060791015625,
        type: 'empty',
      },
      {
        id: 3,
        title: 'Node C',
        x: 237.5757598876953,
        y: 61.81818389892578,
        type: 'custom',
      },
      {
        id: 4,
        title: 'Node C',
        x: 600.5757598876953,
        y: 600.81818389892578,
        type: 'custom',
      },
    ],
    edges: [
      {
        source: 1,
        target: 2,
        type: 'emptyEdge',
      },
      {
        source: 2,
        target: 4,
        type: 'emptyEdge',
      },
    ],
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
      {showGraph && <Graph graph={graph} selected={{}} />}
    </div>
  )
}

export default App
