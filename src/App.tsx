import { CustomerContext } from './DATASTORE/contacts-reducer'
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
import { CalendarSvg, ContactsSvg, DashboardSvg, HomeSvg, SettingsSvg } from './icons/main-menu/menu_svg_items'
import { Contacts } from './components/contacts/contacts-component'
import { PathContext } from './utility/contexts/action.context'
import { ManageCustomerData } from './components/record-customer/modify-all-customer-data/modify-all-customer-data'
import { OpenModalContext } from './utility/contexts/contacts-data-modification/manage.modifications.context'

function App() {
  const { openModifyModal } = useContext(OpenModalContext)

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

  return (
    <div className='App'>
      <Routes>
        <Route path={`/`} element={<Navigation />}>
          <Route path={`/`} element={<Cards />} />
          <Route path={`/dashboard`} element={<Dashboard />} />
          <Route path={`/new customer`} element={<ManageCustomersForm />} />
          <Route path={`/contacts`} element={customerState && <Contacts customersData={customerState} />} />
          <Route path={`/calendar`} element={<h1>calendar will be here</h1>} />
          <Route path={`/settings`} element={<h1>settings will be here</h1>} />
        </Route>
      </Routes>
      {MenuManagerOpenOption.contacts && (
        <div className='modal_window'>
          <ManageCustomersForm />
        </div>
      )}
      {MenuManagerOpenOption.customerForModify.customer && (
        <div className='modal_window'>
          <ManageCustomersForm isModification={true} customerData={MenuManagerOpenOption.customerForModify.customer} />
        </div>
      )}

      {openModifyModal.openModifyUiData && <ManageCustomerData />}
      {!openModifyModal.isModification && <ManageCustomerData />}

      {/* {MenuManagerOpenOption.calendar && <></>}
      {MenuManagerOpenOption.settings && <></>}
      {MenuManagerOpenOption.dashboard && <></>} */}
    </div>
  )
}

export default App
