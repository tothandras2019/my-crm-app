import { CustomerContext } from './DATASTORE/contacts-reducer'
import { useContext, useEffect } from 'react'
import { InfoPannel } from './components/info-panel/info-panel-component'
import { Cards } from './components/card/cards-component'

function App() {
  const { customer, dispatch } = useContext(CustomerContext)

  const NewInitCustomers = {
    id: 1,
    name: 'BASF',
    email: 'BASF@BASF.com',
    address: {
      country: 'GB',
      city: 'Perth',
      building: 34,
      street: 'Snake of black',
      zip: 143234,
    },
    salesStatus: 'new',
    opportunityAmount: 23425,
  }

  // useEffect(() => {
  //   setCustomer({ type: 'ADD', payload: NewInitCustomers })
  // }, [])

  useEffect(() => {
    console.log(customer)
  }, [customer])

  return (
    <div className='App'>
      <Cards customers={customer} />
    </div>
  )
}

export default App
