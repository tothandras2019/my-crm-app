import './contracts-main-component.css'
import { ContractType } from '../../../DATASTORE/data-types/main.data.types/contract-data-types'
import { Separator } from '../../tools/separator/separator-component'
import { ProductCard } from '../product-card/product-card-component'
import { OrderedProductsComponent } from '../ordered-products/ordered-producs-component'
import { FormEvent, Fragment, MutableRefObject, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { MainInfoPannel } from '../../info-panel/main-info-panel-component'
import { SummaryCustomerOrdersAmountType } from '../../../DATASTORE/data-types/main.data.types/customer-data-types'
import { Order } from '../../../DATASTORE/data-types/main.data.types/order-data-types'
import { OtherActionContexts } from '../../../utility/contexts/action.context'
import { OpenCloseButton } from '../../tools/button/open-close/open-close-button-component'
import { summary_ContractsAmount } from '../../../DATASTORE/side-functions/side-functions'
import { DELETE_ORDER_ON_CONTRACT } from '../../../DATASTORE/manage-contract/order/delete-order'
import { MainContext } from '../../../utility/contexts/main.context'
import { modifyContract } from '../../../DATASTORE/data-types/man.data.reducers/contracts-reducer/contracts.data.actions'
import { RecordOrders } from '../record-order/record-contract-component'
import { HeaderTitleColumn } from '../../header-title-column/header-title-column-component'
import { AvailabilityContext } from '../../../utility/contexts/contacts-data/contacts-data-context'

type ContractsMainType = { contracts: ContractType[] }

export const ContractsMain = ({ contracts: contractsDataMain }: ContractsMainType): JSX.Element => {
  const [headerItem, SetHeaderItem] = useState<string[]>(['Customers'])
  const searchValue = useRef<HTMLInputElement>(null)

  const { showOrders, SetShowOrders, selectedCustomerData, SetSelectedCustomerType } = useContext(OtherActionContexts)
  const { setOpenModifyModal } = useContext(AvailabilityContext)
  const { contracts } = useContext(MainContext)
  const { ContractsDataDispatch } = contracts

  const [customersData, SetCustomersData] = useState<SummaryCustomerOrdersAmountType[] | []>([])

  const SettingShowOrderIndexes = () => {
    const length = contractsDataMain.length
    let result: boolean[] = []
    for (let i = 0; i < length; i++) {
      result.push(false)
    }
    SetShowOrders((state) => ({ ...state, indexs: result }))
  }
  // const GenerateBooleanArray = useCallback(() => {

  // }, [contractsDataMain])

  useEffect(() => {
    // SettingShowOrderIndexes()
    SetCustomersData(summary_ContractsAmount(contractsDataMain))
    console.log(contractsDataMain)

    return () => {}
  }, [contractsDataMain])

  useEffect(() => {
    SettingShowOrderIndexes()
  }, [])

  const handle_Search = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const target = event.target
    Object.values(target).forEach((value) => {
      const searchInput = value as HTMLInputElement
      if (searchInput.type === 'text') {
        //console.log(searchInput.value)
      }
    })

    handle_Reset_Search()
  }
  const handle_Reset_Search = () => {
    const current = searchValue.current
    if (current) current.value = ''
  }

  //TODO:
  const handle_NewContract = () => {
    console.log('ADD NEW CONTRACT')
    setOpenModifyModal((state) => ({ ...state, isOpenRecordContract: true }))
  }

  const handle_DELETE_order = (contractID: string, order_id: string) => {
    const updatedContract = DELETE_ORDER_ON_CONTRACT(contractsDataMain, contractID, order_id)
    if (updatedContract) ContractsDataDispatch(modifyContract(updatedContract))
  }

  const handle_SET_SELECTED_CUSTOMER = (products_id: string, order_id: string, contract: ContractType) => {
    const contract_deep_copy = JSON.parse(JSON.stringify(contract))
    setSelectedCustomer(products_id, order_id, contract_deep_copy)
  }

  const handle_MODIFY_PRODUCT = async (products_id: string, order_id: string, contract: ContractType) => {
    const contract_deep_copy = await JSON.parse(JSON.stringify(contract))
    setSelectedCustomer(products_id, order_id, contract_deep_copy)
  }

  const setSelectedCustomer = (products_id: string, order_id: string, contract: ContractType) => {
    const summarryOrder_ForSelectedCustomer = customersData.find((customer) => customer.contract.id === contract.id)
    SetSelectedCustomerType((state) => ({ ...state, customer: summarryOrder_ForSelectedCustomer, order_id: order_id, products_id: products_id }))
  }

  return (
    <div className='contracts-container'>
      <HeaderTitleColumn
        button_title='add contract'
        headerItem={headerItem}
        useRef={searchValue}
        submit_Search={handle_Search}
        reset={handle_Reset_Search}
        handleNewItem={handle_NewContract}
      />
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
