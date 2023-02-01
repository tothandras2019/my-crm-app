import './record-new-contract-component.css'

import { Fragment, useContext, useEffect, useState } from 'react'
import { MainContext } from '../../../utility/contexts/main.context'
import { ManageDataFrame } from '../../manage-data-frame/manage-data-frame-component'
import { CustomButton } from '../../tools/button/submit/custom-button-component'
import { AvailabilityContext } from '../../../utility/contexts/contacts-data/contacts-data-context'
import { CustomerDataType } from '../../../DATASTORE/data-types/main.data.types/customer-data-types'
import { ContractType } from '../../../DATASTORE/data-types/main.data.types/contract-data-types'
import { CONTRACT_ID_GENERATOR } from '../../../DATASTORE/side-functions/id-generator'
import { useInRouterContext } from 'react-router-dom'
import { addContract } from '../../../DATASTORE/data-types/man.data.reducers/contracts-reducer/contracts.data.actions'

export const RecordNewContract = (): JSX.Element => {
  const [header, SetHeader] = useState(['Id', 'Company', 'lead', 'lifecycle'])

  const { contracts } = useContext(MainContext)
  const { ContractsDataDispatch } = contracts
  const { setOpenModifyModal } = useContext(AvailabilityContext)

  const { customers } = useContext(MainContext)
  const { customerState } = customers

  const handle_Select = (selectedCustomer: CustomerDataType) => {
    const id = CONTRACT_ID_GENERATOR(selectedCustomer.companyName)
    console.log(id)
    const newInitContract: ContractType = {
      id: id,
      date: new Date().toLocaleDateString().replaceAll('. ', '.').slice(0, -1),
      customer: selectedCustomer,
      orders: [],
    }

    ContractsDataDispatch(addContract(newInitContract))
  }
  const handle_Cancel = () => setOpenModifyModal((state) => ({ ...state, isOpenRecordContract: false }))

  return (
    <ManageDataFrame>
      <Fragment>
        {customerState.length > 0 && (
          <div className='record_new_contract'>
            <h1>Record contract</h1>
            <div className='customer-header-container'>
              {header.map((record, index) => (
                <p key={`${record}_${index}`}>{record}</p>
              ))}
            </div>
            {customerState.map((customer) => {
              const { companyName, access, address, id, social, status } = customer
              const data = [companyName, access, address, id, social, status]
              return (
                <div key={`${companyName}_${id}`} className='customer-data-container'>
                  <p>{id}</p>
                  <p>{companyName}</p>
                  <p>{status.leadState}</p>
                  <p>{status.lifecycleState}</p>
                  <CustomButton value={'select'} handler={() => handle_Select(customer)} />
                </div>
              )
            })}
          </div>
        )}
        <div className='button-container'>
          <CustomButton type={'button'} value={'cancel'} handler={handle_Cancel} />
        </div>
      </Fragment>
    </ManageDataFrame>
  )
}
