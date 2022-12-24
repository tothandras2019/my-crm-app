export type ProductType = {
  id: number
  category: Category
  name: string
  unitPrice: number
  unit: Unit
  stock_qty: number | undefined
  ordered_qty: number
}

export enum Category {
  WAREHOUSING = 'WAREHOUSING',
  TRANSPORT = 'TRANSPORT',
  CUSTOM = 'CUSTOM',
}
export enum Unit {
  DISTANCE_KM = 'DISTANCE_KM',
  SQUARE_METER = 'SQUARE_METER',
  PIECE = 'PIECE',
}
