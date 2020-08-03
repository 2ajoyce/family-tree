import React, { useMemo } from 'react'
import { Person } from '../../types/person'
import { getDescendants, mostRecent } from '../../utilities'
import PersonRow from './person-row/PersonRow'
import './PersonTable.css'

interface PersonTableParams {
  people: Person[]
  openEditor: (person: Person) => void
}

function PersonTable({ people, openEditor }: PersonTableParams) {
  const tableRows = useMemo(
    () =>
      people
        .sort(mostRecent)
        .map((person) => (
          <PersonRow
            key={person.id}
            people={people}
            person={person}
            openEditor={openEditor}
          />
        )),
    [people, openEditor]
  )

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>
              Name ({getDescendants(people).length}/
              {people.filter((x) => x.name).length})
            </th>
            <th>Birth ({people.filter((x) => x.birth).length})</th>
            <th>Death ({people.filter((x) => x.death).length})</th>
            <th>
              Parents (
              {Array.from(new Set(people.flatMap((p) => p.parents))).length})
            </th>
            <th>Spouse ({people.filter((x) => x.spouse).length})</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    </>
  )
}

export default PersonTable
