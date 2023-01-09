import './table-items-component .css'
import { CustomButton } from '../../../tools/button/submit/custom-button-component'

export const TableItems = ({ dataArray }: { dataArray: (string | number | boolean)[] }): JSX.Element => {
  return (
    <div className='full-details-items'>
      <div className='full-details-title-row'>
        {dataArray.map((data, index) => (
          <p key={`${data}_${index}`}>{data}</p>
        ))}
      </div>
      <CustomButton color={'yellow'} value={'modify'} />
    </div>
  )
}
