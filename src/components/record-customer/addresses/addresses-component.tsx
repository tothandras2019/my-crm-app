import './addresses-component.css'

import { Fragment } from 'react'
import { AddressType } from '../../../DATASTORE/data-types/main.data.types/customer-data-types'
import { Input } from '../../tools/input/input-component'

type AddressInputType = { data: AddressType[] }
export const Addresses = ({ data }: AddressInputType): JSX.Element => (
  <div className='addresses-container'>
    <Fragment>
      <div>
        {Object.keys(data[0]).map((key) => (
          <p>{key}</p>
        ))}
      </div>
      <div className='rows'>
        {data.map((dat, index) => {
          return Object.values(dat).map((value) => <p>{value}</p>)
        })}
      </div>
    </Fragment>
  </div>
)

// {
//   addresses.map(({ primary, country, code, city, building, street, zip }, index) => (
//     <Fragment key={index}>
//       <h4>{primary ? 'primary' : 'secondary'}</h4>
//       <Input label='country' defaultValue={country} />
//       <Input label='country code' defaultValue={code} />
//       <Input label='city' defaultValue={city} />
//       <Input label='building' defaultValue={building.toString()} />
//       <Input label='street' defaultValue={street} />
//       <Input label='zip' defaultValue={zip} />
//     </Fragment>
//   ))
// }
