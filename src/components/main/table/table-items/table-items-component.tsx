import { CustomButton } from '../../../tools/button/submit/custom-button-component'

export const TableItems = ({ dataArray }: { dataArray: (string | number | boolean)[] }): JSX.Element => {
  return (
    <div className='full-details-items'>
      {dataArray.map((data, index) => (
        <p key={`${data}_${index}`}>{data}</p>
      ))}
      <CustomButton value={'modify'} />
    </div>
  )
}
