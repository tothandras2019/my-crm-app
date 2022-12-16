import './info-panel-component.css'
import { useState } from 'react'

import { AddressType, SocialType } from '../../../DATASTORE/data-types/data-types'
import { OpenCloseButton } from '../../tools/button/open-close/open-close-button-component'

export const InfoPanel = ({ title, address }: { title: string; address: AddressType[] | SocialType[] }) => {
  const [isShowDetails, setIsShowDetails] = useState(false)

  const handlerShow = () => {
    setIsShowDetails(!isShowDetails)
  }

  return (
    <div className={`info-panel`}>
      <div className='info-panel-title'>
        <h4>{title}</h4>
        <OpenCloseButton changeValue={isShowDetails ? 'hide' : 'show'} handler={handlerShow} />
      </div>
      {address.map((value, i) => (
        <div key={`info-${value}--${i}`} className={`info-panel-details ${isShowDetails ? 'show' : ''}`}>
          {Object.entries(value).map(([key, element]) => {
            return <p key={`${key}--${i}`}>{`${key}: ${element}`}</p>
          })}
        </div>
      ))}
    </div>
  )
}
