import { CustomersArrayType, InitCustomersType } from './../../DATASTORE/contacts-reducer'
import { formatter } from './../../utility/utility'
export const InfoPannel = ({ customer }: { customer: InitCustomersType }) => {
  const { id, name, email, address, salesStatus, opportunityAmount } = customer
  const amount = formatter.format(opportunityAmount)

  return (
    <div className='info-panel-card'>
      <div className='info-panel-head'>
        <h3>{id}</h3>
        <h3>{salesStatus}</h3>
      </div>
      <h1>{name}</h1>
      <h3>opportunity: {amount}</h3>
      <div className='address'>
        <strong> address: </strong>
        {Object.entries(address).map(([key, value], i) => {
          return <p key={i}>{`${key}: ${value}`}</p>
        })}
      </div>
    </div>
  )
}
