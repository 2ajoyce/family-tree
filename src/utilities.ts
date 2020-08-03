import { Dispatch } from 'react'
import { Person } from './types/person'

export const mostRecent = (a: Person, b: Person): number => {
  if (!a || !a.last_updated) return -1
  if (!b || !b.last_updated) return 1
  if (a.id === b.id) return 0
  return a.last_updated < b.last_updated ? 1 : -1
}

// export const getName = (name: Name | undefined): string => {
//   if (!name) return ''

//   return name.first.concat(
//     name.middle ? ' ' + name.middle : '',
//     ' ' + name.last
//   )
// }

export const getSpouse = (
  people: Person[],
  person: Person
): Person | undefined => people.find((p) => p.id === person.spouse)

export const getParents = (
  people: Person[],
  person: Person
): Person[] | undefined => people.filter((p) => person?.parents?.includes(p.id))

// export const splitName = (
//   name: string,
//   setError: Dispatch<string>
// ): Name => {
//   const sections = name.split(' ')
//   if (sections.length < 2 || sections.length > 3) setError('Invalid Name')

//   const splitName: Name = {
//     first: sections[0],
//     middle: undefined,
//     last: sections[1],
//   }

//   if (sections.length > 2) {
//     splitName.middle = sections[1]
//     splitName.last = sections[2]
//   }

//   return splitName
// }

export const isDescendant = (
  people: Person[],
  person: Person,
  root: string = '406be5f4-09dc-46a4-b604-493f6243952d'
): boolean => {
  if (!person.parents) return false
  if (person.parents.includes(root)) return true
  return getParents(people, person)!.some((p) => isDescendant(people, p))
}

export const getDescendants = (people: Person[]): Person[] =>
  people.filter((person) => isDescendant(people, person))

export const getNames = (persons: Person[] | undefined): string | undefined =>
  persons?.reduce(
    (accum, person, i) =>
      accum.concat(person.name + (i < persons.length ? ', ' : '')),
    ''
  )
