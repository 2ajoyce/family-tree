import React, {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  useMemo,
  useState,
} from 'react'
import { Person } from '../../types/person'
import { mostRecent } from '../../utilities'
import './Editor.css'
import ParentSelector from './parentSelector/ParentSelector'

interface EditorParams {
  people: Person[]
  person?: Person
  setPerson: (person: Partial<Person>) => void
  closeEditor: () => void
}

function Editor({ people, person, setPerson, closeEditor }: EditorParams) {
  const [error, setError] = useState<string | undefined>(undefined)
  const [updatedPerson, setUpdatedPerson] = useState<Partial<Person>>({
    ...person,
  })

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    setPerson(updatedPerson)
    event.currentTarget.reset()
  }

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setError(undefined)
    setUpdatedPerson({
      ...updatedPerson,
      name: event.target.value,
    })
  }

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) =>
    setUpdatedPerson({
      ...updatedPerson,
      [event.target.name]: event.target.value,
    })

  const setParents = (parents: string[]): void =>
    setUpdatedPerson({ ...updatedPerson, parents })

  const handleSpouseChange = (event: ChangeEvent<HTMLSelectElement>): void =>
    setUpdatedPerson({ ...updatedPerson, spouse: event.target.value })

  const handleBackroundClick = (event: MouseEvent<HTMLDivElement>): void =>
    closeEditor()

  const handleCancelClick = (event: MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault()
    closeEditor()
  }

  const spouseOptions = useMemo(
    () =>
      people?.sort(mostRecent).map((person) => (
        <option key={person.id} value={person.id}>
          {person.name}
        </option>
      )),
    [people]
  )

  return (
    <>
      <div id="Editor">
        <form onSubmit={handleSubmit}>
          <h1>Add Person</h1>
          <label>
            Name:
            <input
              value={updatedPerson.name || ''}
              onChange={handleNameChange}
              className="right-aligned"
              placeholder="John Doe"
              type="text"
            ></input>
          </label>

          <label>
            Year Born:
            <input
              name={'birth'}
              value={updatedPerson.birth}
              onChange={handleDateChange}
              className="right-aligned"
              placeholder="1950"
              type="number"
            ></input>
          </label>

          <label>
            Year Died:
            <input
              name={'death'}
              value={updatedPerson.death}
              onChange={handleDateChange}
              className="right-aligned"
              placeholder="2011"
              type="number"
            ></input>
          </label>

          <ParentSelector
            people={people}
            parents={updatedPerson.parents}
            setParents={setParents}
          />

          <label>
            Spouse:
            <select
              name={'spouse'}
              className="right-aligned"
              value={updatedPerson.spouse}
              onChange={handleSpouseChange}
            >
              <option></option>
              {spouseOptions}
            </select>
          </label>

          {error && <span className="error right-aligned">{`* ${error}`}</span>}
          <div id="Editor_actions">
            <input type="submit"></input>
            <button className="secondary" onClick={handleCancelClick}>
              Cancel
            </button>
          </div>
        </form>
      </div>
      <div id="Editor_background" onClick={handleBackroundClick}></div>
    </>
  )
}

export default Editor
