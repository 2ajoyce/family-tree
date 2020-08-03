import React, { MouseEvent, useMemo } from 'react'
import { Person } from '../../../types/person'
import { getParents, getSpouse, isDescendant } from '../../../utilities'
import './PersonRow.css'

interface PersonRowParams {
  people: Person[]
  person: Person
  openEditor: (person: Person) => void
}

function PersonRow({ people, person, openEditor }: PersonRowParams) {
  const handleRowClick = (event: MouseEvent<HTMLTableRowElement>) =>
    openEditor(person)

  const isDescended: boolean = useMemo(() => isDescendant(people, person), [
    people,
    person,
  ])

  return (
    <tr onClick={handleRowClick}>
      <td>{isDescended ? <strong>{person.name}</strong> : person.name}</td>
      <td>{person.birth}</td>
      <td>{person.death}</td>
      <td>
        {getParents(people, person)
          ?.map((p) => p.name)
          .join(', ')}
      </td>
      <td>{getSpouse(people, person)?.name}</td>
    </tr>
  )
}

export default PersonRow
