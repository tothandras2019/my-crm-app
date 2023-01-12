import { useContext, useEffect } from 'react'
import { Cards } from './components/card/cards-component'
import { Navigation } from './components/navigation/navigation-component'
import { Route, Routes } from 'react-router-dom'
import { Dashboard } from './components/dashboard/dashboard-component'
import { ManageCustomersForm } from './components/record-customer/record-customer-component'
import { MainContext } from './utility/contexts/main.context'
import { getContractCollection, getCustomerCollection, getWarehouseCollection } from './utility/google-cloud-store/google-cloud-store'
import { fillUpCustomer } from './DATASTORE/data-types/man.data.reducers/customer-reducer/customer.data.actions'
import { fillUpContracts } from './DATASTORE/data-types/man.data.reducers/contracts-reducer/contracts.data.actions'
import { fillUpWarehouse } from './DATASTORE/data-types/man.data.reducers/warehouse-reducer/warehouse.data.actions'
import { Contacts } from './components/contacts/contacts-component'
import { PathContext } from './utility/contexts/action.context'
import { ManageCustomerData } from './components/record-customer/modify-all-customer-data/modify-all-customer-data'
import { AvailabilityContext } from './utility/contexts/contacts-data/contacts-data-context'

function App() {
  const { openModifyModal } = useContext(AvailabilityContext)

  const { MenuManagerOpenOption } = useContext(PathContext)
  const { products, customers, contracts, warehouse } = useContext(MainContext)

  const { ProductDispatch } = products
  const { customerState, CustomerDispatch } = customers
  const { contractDataState, ContractsDataDispatch } = contracts
  const { warehouseDataState, WarehouseDataDispatch } = warehouse

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

  return (
    <div className='App'>
      <Routes>
        <Route path={`/`} element={<Navigation />}>
          <Route path={`/`} element={<Cards />} />
          <Route path={`/dashboard`} element={<Dashboard />} />
          <Route path={`/contracts`} element={<h1>contracts will be here</h1>} />
          <Route path={`/calendar`} element={<h1>calendar will be here</h1>} />
          <Route path={`/contacts`} element={customerState && <Contacts customersData={customerState} />} />
          <Route path={`/settings`} element={<h1>settings will be here</h1>} />
        </Route>
      </Routes>
      {MenuManagerOpenOption.contacts && (
        <div className='modal_window'>
          <ManageCustomersForm />
        </div>
      )}

      {openModifyModal.openModifyUiData && (
        <div className='modal_window'>
          <ManageCustomerData />
        </div>
      )}
      {!openModifyModal.isModification && (
        <div className='modal_window'>
          <ManageCustomerData />
        </div>
      )}
    </div>
  )
}

export default App
