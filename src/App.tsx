import { useContext, useEffect } from 'react'
import { Cards } from './components/card/cards-component'
import { Navigation } from './components/navigation/navigation-component'
import { Route, Routes } from 'react-router-dom'
import { Dashboard } from './components/dashboard/dashboard-component'
import { Record_Customer } from './components/customer-data-manipulate/add-new-customer/record-customer-component'
import { MainContext } from './utility/contexts/main.context'
import { getContractCollection, getCustomerCollection, getWarehouseCollection } from './utility/google-cloud-store/google-cloud-store'
import { fillUpCustomer } from './DATASTORE/data-types/man.data.reducers/customer-reducer/customer.data.actions'
import { fillUpContracts } from './DATASTORE/data-types/man.data.reducers/contracts-reducer/contracts.data.actions'
import { fillUpWarehouse } from './DATASTORE/data-types/man.data.reducers/warehouse-reducer/warehouse.data.actions'
import { Contacts } from './components/contacts/contacts-component'
import { OtherActionContexts } from './utility/contexts/action.context'
import { Manage_Customer } from './components/customer-data-manipulate/manage-customer-data/manage-customer-data'
import { AvailabilityContext } from './utility/contexts/contacts-data/contacts-data-context'
import { ContractsMain } from './components/CONTRACTS_MGM/contracts-main/contracts-main-component'
import { RecordOrders } from './components/CONTRACTS_MGM/record-order/record-contract-component'
import { RecordNewContract } from './components/CONTRACTS_MGM/record-new-contract/record-new-contract-component'

function App() {
  const { openModifyModal } = useContext(AvailabilityContext)
  const { openModifyUiData, isModification, isOpenRecordContract } = openModifyModal

  const { open_Manager } = useContext(OtherActionContexts)
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
          <Route path={`/contracts`} element={<ContractsMain contracts_main={contractDataState} />} />
          <Route path={`/calendar`} element={<h1>calendar will be here</h1>} />
          <Route path={`/contacts`} element={customerState && <Contacts customersData={customerState} />} />
          <Route path={`/settings`} element={<h1>settings will be here</h1>} />
        </Route>
      </Routes>
      {isOpenRecordContract && (
        <div className='modal_window'>
          <RecordNewContract />
        </div>
      )}
      {open_Manager.contacts && (
        <div className='modal_window'>
          <Record_Customer />
        </div>
      )}

      {openModifyUiData && (
        <div className='modal_window'>
          <Manage_Customer />
        </div>
      )}
      {!isModification && (
        <div className='modal_window'>
          <Manage_Customer />
        </div>
      )}
    </div>
  )
}

export default App
