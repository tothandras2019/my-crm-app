export type ServiceProductType = {
  id: number
  category: ServiceCategory
  unitPrice: number
  currency: string
  ordered_qty: number
  unit_dimension: Unit
  other_information: string
}

export type WarehouseingServiceType = {
  id: string
  total_capacity: number
  unit_dimension: string
}

export enum ServiceCategory {
  WAREHOUSING = 'WAREHOUSING',
  TRANSPORT = 'TRANSPORT',
  CUSTOM = 'CUSTOM',
}
export enum Unit {
  DISTANCE_KM = 'DISTANCE_KM',
  SQUARE_METER = 'SQUARE_METER',
  PIECE = 'PIECE',
}
