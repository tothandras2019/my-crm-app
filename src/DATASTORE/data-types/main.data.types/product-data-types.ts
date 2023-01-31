export type ServiceProductType = {
  id: string
  category: string
  unitPrice: number
  currency: string
  ordered_qty: number
  unit_dimension: string
  other_information: string
}

export type WarehouseingServiceType = {
  id: string
  total_capacity: number
  unit_dimension: string
}

export enum ServiceCategory {
  DEFAULT = 'PLEASE CHOOSE',
  WAREHOUSING = 'WAREHOUSING',
  TRANSPORT = 'TRANSPORT',
  CUSTOM = 'CUSTOM',
}
export enum Unit {
  DEFAULT = 'PLEASE CHOOSE',
  DISTANCE_KM = 'DISTANCE_KM',
  SQUARE_METER = 'SQUARE_METER',
  PIECE = 'PIECE',
}
export const TempProduct = {
  id: '',
  category: '',
  unitPrice: '',
  currency: '',
  ordered_qty: '',
  unit_dimension: '',
  other_information: '',
}
