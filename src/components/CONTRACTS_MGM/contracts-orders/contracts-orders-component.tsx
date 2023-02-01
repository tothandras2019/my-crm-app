import { Fragment } from 'react'
import { ContractType } from '../../../DATASTORE/data-types/main.data.types/contract-data-types'
import { ShowOrdersDetailsType } from '../../../utility/contexts/action.context'
import { OpenCloseButton } from '../../tools/button/open-close/open-close-button-component'
import { OrderedProductsComponent } from '../ordered-products/ordered-producs-component'
import { ProductCard } from '../product-card/product-card-component'

type ContractsOrdersType = {
  customerIndex: number
  contract: ContractType
  handleDelete: (id: string, order_id: string) => void
  handleSetSelectedCustomer: (products_id: string, order_id: string, contract: ContractType) => void
  handleModifyProduct: (products_id: string, order_id: string, contract: ContractType) => void
}
// showOrders.indexs[customerIndex]
export const ContractsOrders = ({
  customerIndex,
  contract,

  handleDelete,
  handleSetSelectedCustomer,
  handleModifyProduct,
}: ContractsOrdersType) => {
  const { orders, id } = contract
  return (
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
              <OpenCloseButton color={`red`} pageTextValue={'delete order'} handler={() => handleDelete(id, order_id)} />
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
                    handler={handleSetSelectedCustomer}
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
                            handle_Modification={handleModifyProduct}
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
  )
}
