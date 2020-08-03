import React, { ChangeEvent, Dispatch, useMemo } from 'react'
import helpIcon from '../../../img/helpIcon.svg'
import { Person } from '../../../types/person'
import { mostRecent } from '../../../utilities'
import './ParentSelector.css'

interface ParentSelectorParams {
  people: Person[]
  parents?: string[]
  setParents: Dispatch<string[]>
}

function ParentSelector({ people, parents, setParents }: ParentSelectorParams) {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>): void =>
    setParents(
      Array.from(event.target.selectedOptions, (option) => option.value)
    )

  const parentOptions = useMemo(
    () =>
      people.sort(mostRecent).map((person) => (
        <option key={person.id} value={person.id}>
          {person.name}
        </option>
      )),
    [people]
  )

  return (
    <label>
      Parents:
      <img
        className="helpIcon"
        src={helpIcon}
        id="ParentSelector_helpIcon"
        alt="help icon"
        title="Ctrl + click to select multiple parents"
        tabIndex={0}
      />
      <span id="ParentSelector_helpIcon_text">
        Ctrl + click to select multiple parents
      </span>
      <select
        name={'parents'}
        className="right-aligned"
        multiple
        onChange={handleChange}
        value={parents}
        size={10}
      >
        {parentOptions}
      </select>
    </label>
  )
}

export default ParentSelector
