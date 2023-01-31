type ID_GENERATOR_ORDER_TYPE = { type: string }
export const ID_GENERATOR_ORDER = ({ type }: ID_GENERATOR_ORDER_TYPE) => {
  return `${type.toUpperCase().slice(0, 3)}_${new Date().toLocaleString().replaceAll('. ', '').replaceAll(':', '').toString()}`
}

export const CONTRACT_ID_GENERATOR = (companyName: string) => {
  return `${companyName.slice(0, 4).toLocaleUpperCase()}${new Date().toLocaleString().replaceAll('. ', '').replaceAll(':', '')}`
}
