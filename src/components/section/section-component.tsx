import { Indicator } from '../indicator/indicator-component'
import { Menu } from '../menu/rotating-menu/menu-component'
import { Table } from '../table/table-component'
import { CustomerContext } from '../../DATASTORE/contacts-reducer'
import { useContext } from 'react'
import './section-component.css'
export const Section = () => {
  const { customers } = useContext(CustomerContext)
  return (
    <section>
      {/* <Menu /> */}
      {/* <Indicator value={0.15} /> */}
      <Table customers={customers} />
    </section>
  )
}
