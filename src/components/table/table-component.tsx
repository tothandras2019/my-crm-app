import './table-component.css'

import { InitCustomersType } from '../../DATASTORE/data-types/data-types'
import { formatter } from '../../utility/utility'
import { Indicator } from '../indicator/indicator-component'

export const Table = ({ customers }: { customers: InitCustomersType[] }) => {
  // const headersHelper = ['id', 'companyName', 'status', 'contract', 'subscribed']
  const headersHelper = ['id', 'companyName', 'status', 'contract', 'subscribed', 'orders aboumt']
  return (
    <div className='table-container'>
      <div className='table-container-header'>
        {headersHelper.map((keys, i) => {
          return <p key={`${keys}-${i}`}>{keys} 🔽</p>
        })}
      </div>
      {customers.map((customer, index) => {
        const { id, companyName, status, contract, subscribed } = customer
        const summOrders = subscribed.products.reduce((reduce, prodItem) => (reduce += prodItem.quantity * prodItem.price), 0)
        return (
          <div key={`${index}--${id} `} className={`customer ${index % 2 === 0 ? '' : 'odd'}`}>
            <p>{id}</p>
            <p>{companyName}</p>
            <div>
              <p>{status.leadState}</p>
              <p>{status.lifecycleState}</p>
            </div>
            <div className='contract-amount'>
              <p>{formatter.format(contract.total)}</p>
              <p>{formatter.format(contract.achieved)}</p>
              <Indicator value={contract.achieved / contract.total} />
            </div>
            <p>{subscribed.products.length}</p>
            <p>{formatter.format(summOrders)}</p>
          </div>
        )
      })}
    </div>
  )
}
// ;<div>
//   <p>subscribed for</p>
//   {subscribed.products.map((product, i) => (
//     <div>
//       <p>
//         ${product.name}:{product.quantity} x ${product.price} = ${product.quantity * product.price}
//       </p>
//     </div>
//   ))}
// </div>

// {
//   Object.keys(customers[0]).map((keys, i) => {
//     if (headersHelper.includes(keys)) return <p key={`${keys}-${i}`}>{keys}</p>
//     return ''
//   })
// }
