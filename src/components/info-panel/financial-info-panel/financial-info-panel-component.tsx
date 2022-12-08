import { ContractType } from '../../../DATASTORE/data-types/data-types'
import { formatter } from '../../../utility/utility'

export const FinancialInfoPanel = ({ contract }: { contract: ContractType }) => {
  return (
    <div className='info-financial-panel'>
      {Object.entries(contract).map(([key, value], i) => {
        const amount = formatter.format(value)
        return <h3 key={`${key}-${i}`}>{`${key}: ${formatter.format(value)}`}</h3>
      })}
    </div>
  )
}
