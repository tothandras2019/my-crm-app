import { CustomerContext } from './DATASTORE/contacts-reducer'
import { useContext, useEffect } from 'react'
import { MainInfoPannel } from './components/info-panel/main-info-panel-component'
import { Cards } from './components/card/cards-component'
import { Input } from './components/input/input-component'
import { LinkButton } from './components/tools/button/link/link-button-component'
import { Menu } from './components/menu/rotating-menu/menu-component'
import { Section } from './components/section/section-component'
import { Navigation } from './components/navigation/navigation-component'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Dashboard } from './components/dashboard/dashboard-component'
import { RecordCustomers } from './components/record-customer/record-customer-component'
import { MainContext } from './utility/contexts/main.context'
import CONTRACTS from './DATASTORE/data/contracts.json'

function App() {
  const { customers, dispatch } = useContext(CustomerContext)

  const { productReducer } = useContext(MainContext)
  const { ProductDispatch } = productReducer

  useEffect(() => {
    return () => {}
  })

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
    console.log(customers)
  }, [customers])

  return (
    <div className='App'>
      <Routes>
        <Route path={`/`} element={<Navigation />}>
          <Route path={`/`} element={<Cards customers={customers} />} />
          <Route path={`/dashboard`} element={<Dashboard />} />
          <Route path={`/new customer`} element={<RecordCustomers />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
