import { CustomerContext } from './DATASTORE/contacts-reducer'
import { useContext, useEffect } from 'react'
import { Cards } from './components/card/cards-component'
import { Navigation } from './components/navigation/navigation-component'
import { Route, Routes } from 'react-router-dom'
import { Dashboard } from './components/dashboard/dashboard-component'
import { RecordCustomers } from './components/record-customer/record-customer-component'
import { MainContext } from './utility/contexts/main.context'
import { getContractCollection, getCustomerCollection, getWarehouseCollection } from './utility/google-cloud-store/google-cloud-store'
import { fillUpCustomer } from './DATASTORE/data-types/man.data.reducers/customer-reducer/customer.data.actions'
import { fillUpContracts } from './DATASTORE/data-types/man.data.reducers/contracts-reducer/contracts.data.actions'
import { fillUpWarehouse } from './DATASTORE/data-types/man.data.reducers/warehouse-reducer/warehouse.data.actions'
import { CalendarSvg, ContactsSvg, DashboardSvg, HomeSvg, SettingsSvg } from './icons/main-menu/menu_svg_items'

function App() {
  const { customers, dispatch } = useContext(CustomerContext)

  const {
    products: productReducer,
    customers: customerReducer,
    contracts: contractsDataReducer,
    warehouse: warehousseDataReducer,
  } = useContext(MainContext)

  const { ProductDispatch } = productReducer
  const { customerState, CustomerDispatch } = customerReducer
  const { contractDataState, ContractsDataDispatch } = contractsDataReducer
  const { warehouseDataState, WarehouseDataDispatch } = warehousseDataReducer

  const UploadCustomer = async () => {
    if (customerState && customerState.length > 0) return
    const customersStore = await getCustomerCollection('Customers')
    if (customersStore) CustomerDispatch(fillUpCustomer(customersStore))
  }

  const UploadContracts = async () => {
    if (contractDataState && contractDataState.length > 0) return
    const contractsStore = await getContractCollection('Contracts')
    if (contractsStore) ContractsDataDispatch(fillUpContracts(contractsStore))
  }
  const UploadWarehouse = async () => {
    if (warehouseDataState && warehouseDataState.length > 0) return
    const warehouseStore = await getWarehouseCollection('Warehouse')
    if (warehouseStore) WarehouseDataDispatch(fillUpWarehouse(warehouseStore))
  }

  useEffect(() => {
    UploadCustomer()
    UploadContracts()
    UploadWarehouse()

    // CustomerDispatch(fillUpCustomer([]))
    // ContractsDataDispatch(fillUpContracts([]))
    // WarehouseDataDispatch(fillUpWarehouse([]))
    return () => {}
  }, [])

  useEffect(() => {
    console.log('contract', contractDataState)
    console.log('cust:', customerState)
    console.log('wh:', warehouseDataState)
  }, [customerState, contractDataState, warehouseDataState])

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

  // useEffect(() => {
  //   console.log(customers)
  // }, [customers])

  return (
    <div className='App'>
      <Routes>
        <Route path={`/`} element={<Navigation />}>
          <Route path={`/`} element={<Cards />} />
          <Route path={`/dashboard`} element={<Dashboard />} />
          <Route path={`/new customer`} element={<RecordCustomers />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
