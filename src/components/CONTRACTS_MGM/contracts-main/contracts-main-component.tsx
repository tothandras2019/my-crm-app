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
import { DELETE_ORDER_ON_CONTRACT } from '../../../DATASTORE/manage-contract/order/delete-order'
import { MainContext } from '../../../utility/contexts/main.context'
import { modifyContract } from '../../../DATASTORE/data-types/man.data.reducers/contracts-reducer/contracts.data.actions'
import { RecordOrders } from '../record-contract/record-contract-component'

type ContractsMainType = { contracts: ContractType[] }

export const ContractsMain = ({ contracts: contractsDataMain }: ContractsMainType): JSX.Element => {
  const { showOrders, SetShowOrders, selectedCustomerData, SetSelectedCustomerType } = useContext(OtherActionContexts)
  const { contracts } = useContext(MainContext)
  const { ContractsDataDispatch } = contracts

  const [customersData, SetCustomersData] = useState<SummaryCustomerOrdersAmountType[] | []>([])

  const GenerateBooleanArray = useCallback(() => {
    const length = contractsDataMain.length
    let result: boolean[] = []
    for (let i = 0; i < length; i++) {
      result.push(false)
    }
    SetShowOrders((state) => ({ ...state, indexs: result }))
  }, [contractsDataMain])

  useEffect(() => {
    GenerateBooleanArray()
    SetCustomersData(summary_ContractsAmount(contractsDataMain))

    return () => {}
  }, [contractsDataMain])

  const handle_DELETE_order = (contractID: string, order_id: string) => {
    const updatedContract = DELETE_ORDER_ON_CONTRACT(contractsDataMain, contractID, order_id)
    if (updatedContract) ContractsDataDispatch(modifyContract(updatedContract))
  }

  const handle_SET_SELECTED_CUSTOMER = (products_id: string, order_id: string, contract: ContractType) => {
    console.log('[handle_SET_SELECTED_CUSTOMER]')

    const contract_deep_copy = JSON.parse(JSON.stringify(contract))
    setSelectedCustomer(products_id, order_id, contract_deep_copy)
  }

  const handle_MODIFY_PRODUCT = (products_id: string, order_id: string, contract: ContractType) => {
    console.log('[handle_MODIFY_PRODUCT]')

    const contract_deep_copy = JSON.parse(JSON.stringify(contract))
    setSelectedCustomer(products_id, order_id, contract_deep_copy)
  }

  const setSelectedCustomer = (products_id: string, order_id: string, contract: ContractType) => {
    const summarryOrder_ForSelectedCustomer = customersData.find((customer) => customer.contract.id === contract.id)
    console.log(selectedCustomerData)
    SetSelectedCustomerType((state) => ({ ...state, customer: summarryOrder_ForSelectedCustomer, order_id: order_id, products_id: products_id }))
  }

  useEffect(() => {}, [selectedCustomerData])

  return (
    <div className='contracts-container'>
      {contractsDataMain.map((contract, index) => {
        const { customer, date, orders, id } = contract
        return (
          <div key={`contracts_${contractsDataMain}`} className='contracts-main-container'>
            {customersData &&
              customersData.map((customersDat, index) => {
                return <MainInfoPannel customerIndex={index} key={`${customersDat}-${index}`} customerData={customersDat} />
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
                        <OpenCloseButton color={`red`} pageTextValue={'delete order'} handler={() => handle_DELETE_order(id, order_id)} />
                      </div>

                      <div>
                        {ordered_products.map((ordered_product, orderProd_index) => {
                          const { products_id, products } = ordered_product
                          return (
                            <OrderedProductsComponent
                              key={`ordered_prod_${orderProd_index}`}
                              ordered_product={ordered_product}
                              order_id={order_id}
                              contract={contract}
                              handler={handle_SET_SELECTED_CUSTOMER}
                            >
                              {
                                <Fragment>
                                  {products.map((product, prod_index) => (
                                    <ProductCard
                                      key={`prod_${prod_index}`}
                                      order_id={order_id}
                                      ordered_product={ordered_product}
                                      contract={contract}
                                      product={product}
                                      handle_Modification={handle_MODIFY_PRODUCT}
                                    />
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

      {selectedCustomerData.customer && <RecordOrders />}
    </div>
  )
}
