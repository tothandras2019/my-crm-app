import './contacts-component.css'
import { CustomerDataType } from '../../DATASTORE/data-types/main.data.types/customer-data-types'

export const Contacts = ({ customers }: { customers: Required<CustomerDataType>[] }): JSX.Element => {
  return (
    <div className='contacts-container'>
      {customers.map((customer, i) => {
        const { id, companyName, address, access, social, status } = customer

        return (
          <div key={`${id}_${i}`} className='contact-details'>
            <h1>{companyName}</h1>
            <div>
              <ul>
                {access.map(({ primary, person, email, telephone }) => (
                  <li>
                    <h4>{primary ? 'primary' : 'secondary'}</h4>
                    <p>{person}</p>
                    <p>{email}</p>
                    <p>{telephone}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )
      })}
    </div>
  )
}
