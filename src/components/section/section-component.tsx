import { Indicator } from '../indicator/indicator-component'
import { Menu } from '../menu/rotating-menu/menu-component'
import { Table } from '../table/table-component'
import { CustomerContext } from '../../DATASTORE/contacts-reducer'
import { useContext } from 'react'
import './section-component.css'
import { RecordCustomers } from '../record-customer/record-customer-component'
import { Dashboard } from '../dashboard/dashboard-component'
export const Section = ({ Element }: { Element: JSX.Element }): JSX.Element => {
  const { customers } = useContext(CustomerContext)
  return <section>{Element}</section>
}
