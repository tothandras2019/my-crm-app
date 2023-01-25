type ID_GENERATOR_TYPE = { type: string }
export const ID_GENERATOR = ({ type }: ID_GENERATOR_TYPE) => {
  return `${type.toUpperCase().slice(0, 3)}_${new Date().toLocaleString().replaceAll('. ', '').replaceAll(':', '').toString()}`
}
