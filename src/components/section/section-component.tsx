import { Indicator } from '../indicator/indicator-component'
import { Menu } from '../menu/rotating-menu/menu-component'
import { Table } from '../table/table-component'
import { CustomerContext } from '../../DATASTORE/contacts-reducer'
import { useContext } from 'react'
import './section-component.css'
import { RecordCustomers } from '../record-customer/record-customer-component'
import { Dashboard } from '../dashboard/dashboard-component'
export const Section = () => {
  const { customers } = useContext(CustomerContext)
  return (
    <section>
      {/* <Menu /> */}
      {/* <Indicator
        value={0.15}
        coords={{
          X: 0,
          Y: 0,
        }}
      />
      <Table customers={customers} />
      <RecordCustomers /> */}
      <Dashboard />
    </section>
  )
}
