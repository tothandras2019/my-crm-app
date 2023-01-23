export const GetProductObject = (productArray: any[]) => {
  const [_, id, category, unitPrice, currency, ordered_qty, unit_dimension, other_information] = productArray
  return {
    id: id,
    category: category,
    unitPrice: unitPrice,
    currency: currency,
    ordered_qty: ordered_qty,
    unit_dimension: unit_dimension,
    other_information: other_information,
  }
}
