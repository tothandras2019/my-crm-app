import { ContractType } from '../data-types/main.data.types/contract-data-types'
import { SummaryCustomerOrdersAmountType } from '../data-types/main.data.types/customer-data-types'
import { Order } from '../data-types/main.data.types/order-data-types'
import { ServiceProductType } from '../data-types/main.data.types/product-data-types'

export const summ_data = (orders: Order[]): number => {
  return orders.reduce((acc, order): number => {
    return (acc += order.ordered_products.reduce((accOrder: number, prod): number => {
      const product = prod.products as ServiceProductType[]
      accOrder += product.reduce<number>((sum: number, product: ServiceProductType) => {
        sum += product.ordered_qty * product.unitPrice
        return sum
      }, 0)
      return accOrder
    }, 0))
  }, 0)

  return 0
}

export const summary_ContractsAmount = (contracts: ContractType[]): SummaryCustomerOrdersAmountType[] => {
  return contracts.reduce((contractCustomerSummaryAcc: any, contractData: ContractType) => {
    const { customer, id, date, orders } = contractData

    let contracDataObject: SummaryCustomerOrdersAmountType | undefined = contractCustomerSummaryAcc.find(
      (contractSumary: SummaryCustomerOrdersAmountType) => contractSumary.contract.id === customer.id,
    )

    const summ = summ_data(orders)

    if (!contracDataObject) {
      contracDataObject = {
        contract: contractData,
        summaryOrdersamount: summ,
      }

      return [...contractCustomerSummaryAcc, contracDataObject]
    } else {
      const filteredContractCustomerSummaryAcc = contractCustomerSummaryAcc.filter(
        (contractSumary: SummaryCustomerOrdersAmountType) => contractSumary.contract.id !== customer.id,
      ) as SummaryCustomerOrdersAmountType[]
      const modifiedContracDataObject = { ...contracDataObject, summaryOrdersamount: (contracDataObject.summaryOrdersamount += summ) }
      return [...filteredContractCustomerSummaryAcc, modifiedContracDataObject] as SummaryCustomerOrdersAmountType[]
    }
  }, [])
}

export const SortOrders = (unsorted: ContractType[]): ContractType[] => {
  return unsorted.sort((a, b) => {
    const dateId_A = a.id.slice(4)
    const dateId_B = b.id.slice(4)

    if (dateId_A < dateId_B) return -1
    if (dateId_A > dateId_B) return 1
    return 0
  })
}

type PrepareChartDataType = { switchPeriod: string; contractDataState: ContractType[] | [] }

export const PrepareChartData = ({ switchPeriod, contractDataState }: Partial<PrepareChartDataType>) => {
  let summary: any[] = []
  if (!contractDataState) return
  contractDataState.forEach((contract) => {
    const { orders } = contract
    orders.forEach((order) => {
      const { ordered_products, order_date } = order
      let periodType: number = 0
      switch (switchPeriod) {
        case 'hours': {
          periodType = new Date(order_date).getHours()
          break
        }
        case 'day': {
          periodType = new Date(order_date).getDay()
          break
        }
        case 'month': {
          periodType = new Date(order_date).getMonth()
          break
        }
        case 'minutes': {
          periodType = new Date(order_date).getMinutes()
          break
        }
      }
      ordered_products.forEach((ordered_prod) => {
        const { products } = ordered_prod

        products.forEach((product) => {
          const { ordered_qty, unitPrice, category } = product

          summary.push({ [periodType]: { [category.toLocaleLowerCase()]: ordered_qty * unitPrice } })
        })
      })
    })
  })

  // console.log('SUMMARY:', summary)

  const groppedByKey = summary.reduce((prev, current) => {
    const [currentKey] = Object.keys(current).map((key) => key)
    const getkey = Object.keys(prev).find((accKey) => accKey === currentKey)
    const key = getkey ? getkey : currentKey

    let newArray = []
    if (prev[key]) {
      newArray = [...prev[key], current[key]]
      return { ...prev, [key]: newArray }
    }

    return { ...prev, [key]: [current[key]] }
  }, {})

  // console.log('GROPUPPED:', groppedByKey)

  type summarizedByCategoryType = { [key: string]: { [type: string]: number } }[]
  let summarizedByCategory: summarizedByCategoryType = []
  let mainCategories: string[] = []
  Object.entries(groppedByKey).forEach((current) => {
    const [key, categoryAmount] = current

    const catAmount = categoryAmount as { [key: string]: number }[]

    const group = catAmount.reduce((sumObject: { [key: string]: number }[], amount) => {
      const [obj] = Object.entries(amount)
      const [key, total] = obj
      if (!mainCategories.includes(key)) mainCategories.push(key)
      const foundObject = sumObject.find((object) => {
        const [objectKey] = Object.keys(object)
        return objectKey === key
      })
      const filtered = sumObject.filter((object) => {
        const [objectKey] = Object.keys(object)
        return objectKey !== key
      })

      return foundObject ? [...filtered, { [key]: foundObject[key] + total }] : [...sumObject, { [key]: total }]
    }, [])

    let temp = {}
    group.forEach((groupItem) => (temp = Object.entries(groupItem).reduce((sum, [key, value]) => ({ ...temp, [key]: value }), {})))
    summarizedByCategory = [...summarizedByCategory, { [key]: temp }]
  })

  const filledEmpty = summarizedByCategory.map((items) => {
    const [item] = Object.entries(items).map((val) => val)
    const [key, value] = item
    const valueKeys = Object.keys(value)

    let modValue = { ...value }
    mainCategories.forEach((categoryString) => {
      if (!valueKeys.includes(categoryString)) modValue = { ...modValue, [categoryString]: 0 }
    })

    return { [key]: modValue }
  })

  return filledEmpty
}
