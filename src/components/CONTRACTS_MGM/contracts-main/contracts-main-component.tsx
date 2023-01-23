import './contracts-main-component.css'
import { ContractType } from '../../../DATASTORE/data-types/main.data.types/contract-data-types'
import { Separator } from '../../tools/separator/separator-component'
import { ProductCard } from '../product-card/product-card-component'
import { OrderedProductsComponent } from '../ordered-products/ordered-producs-component'
import { Fragment, useCallback, useContext, useEffect, useState } from 'react'
import { MainInfoPannel } from '../../info-panel/main-info-panel-component'
import { SummaryCustomerOrdersAmountType } from '../../../DATASTORE/data-types/main.data.types/customer-data-types'
import { Order } from '../../../DATASTORE/data-types/main.data.types/order-data-types'
import { OtherActionContexts } from '../../../utility/contexts/action.context'
import { OpenCloseButton } from '../../tools/button/open-close/open-close-button-component'
import { summary_ContractsAmount } from '../../../DATASTORE/side-functions/side-functdions'

type ContractsMainType = { contracts: ContractType[] }

export const ContractsMain = ({ contracts }: ContractsMainType): JSX.Element => {
  const { showOrders, SetShowOrders } = useContext(OtherActionContexts)

  const [customersData, SetCustomersData] = useState<SummaryCustomerOrdersAmountType[] | []>([])

  const GenerateBooleanArray = useCallback(() => {
    const length = contracts.length
    let result: boolean[] = []
    for (let i = 0; i < length; i++) {
      result.push(false)
    }
    SetShowOrders((state) => ({ ...state, indexs: result }))
  }, [contracts])

  useEffect(() => {
    GenerateBooleanArray()

    const summaryContractsAmount = summary_ContractsAmount(contracts)

    SetCustomersData(summaryContractsAmount)

    return () => {}
  }, [contracts])

  return (
    <div className='contracts-container'>
      {contracts.map((contract, index) => {
        const { customer, date, orders } = contract
        return (
          <div key={`contracts_${contracts}`} className='contracts-main-container'>
            {customersData &&
              customersData.map((customer, index) => {
                return <MainInfoPannel customerIndex={index} key={`${customer}-${index}`} customerData={customer} />
              })}
            {showOrders.indexs[index] && (
              <div className='contracts-orders-container'>
                <h3>Orders </h3>
                {orders.map((order) => {
                  const { order_date, order_id, ordered_products } = order
                  return (
                    <div key={`order_${order_id}`} className='contracts-orders-info'>
                      <div className='contracts-orders-info_header'>
                        <p>
                          order date: {order_date} - order id: {order_id}
                        </p>
                        <OpenCloseButton color={`red`} pageTextValue={'delete order'} handler={() => {}} />
                      </div>

                      <div>
                        {ordered_products.map((order, orderProd_index) => {
                          const { id, products } = order
                          return (
                            <OrderedProductsComponent key={`ordered_prod_${orderProd_index}`} order={order}>
                              {
                                <Fragment>
                                  {products.map((product, prod_index) => (
                                    <ProductCard key={`prod_${prod_index}`} product={product} />
                                  ))}
                                </Fragment>
                              }
                            </OrderedProductsComponent>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
