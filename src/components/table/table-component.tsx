import './table-component.css'

import { InitCustomersType } from '../../DATASTORE/data-types/data-types'

export const Table = ({ customers }: { customers: InitCustomersType[] }) => {
  const headersHelper = ['id', 'companyName', 'status', 'contract', 'subscribed']
  return (
    <div className='table-container'>
      <div className='table-container-header'>
        {Object.keys(customers[0]).map((keys) => {
          if (headersHelper.includes(keys)) return <p>{keys}</p>
          return <></>
        })}
      </div>
      {customers.map((customer, index) => {
        const { id, companyName, status, contract, subscribed } = customer
        return (
          <div key={`customer--${id}`} className='customer'>
            <p>{id}</p>
            <p>{companyName}</p>
            <div>
              <p>{status.leadState}</p>
              <p>{status.lifecycleState}</p>
            </div>
            <div>
              <p>{contract.total}</p>
              <p>{contract.achieved}</p>
            </div>
            <p>{subscribed.products.length}</p>
          </div>
        )
      })}
    </div>
  )
}

//  ;<div>
//    <p>subscribed for</p>
//    {subscribed.products.map((product, i) => (
//      <div>
//        <p>
//          ${product.name}:{product.quantity} x ${product.price} = ${product.quantity * product.price}
//        </p>
//      </div>
//    ))}
//  </div>
