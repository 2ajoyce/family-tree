// export interface Name {
//   first: string
//   middle?: string
//   last: string
// }

export interface Person {
  id: string
  name: string
  birth?: number
  death?: number
  spouse?: string
  parents?: string[]
  children?: string[]
  last_updated: Date
}
