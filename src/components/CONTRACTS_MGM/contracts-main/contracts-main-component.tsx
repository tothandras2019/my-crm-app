import './contracts-main-component.css'
import { ContractType } from '../../../DATASTORE/data-types/main.data.types/contract-data-types'
import { Separator } from '../../tools/separator/separator-component'
import { ProductCard } from '../product-card/product-card-component'
import { OrderedProductsComponent } from '../ordered-products/ordered-producs-component'
import { Fragment } from 'react'

type ContractsMainType = { contracts: ContractType[] }

export const ContractsMain = ({ contracts }: ContractsMainType): JSX.Element => {
  return (
    <div className='contracts-container'>
      {contracts.map((contract, index) => {
        const { customer, date, orders } = contract
        return (
          <div>
            <h3>contract date: {date}</h3>
            <p>{`${customer.companyName}: ${contract.id}`}</p>
            <div>
              {orders.map((order) => {
                const { order_date, order_id, ordered_products } = order
                return (
                  <div>
                    <p>{order_date}</p>
                    <p>{order_id}</p>
                    <div>
                      {ordered_products.map((order, orderProd_index) => {
                        const { id, products } = order
                        return (
                          <OrderedProductsComponent order={order}>
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
                    <Separator />
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
