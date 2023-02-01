import { MutableRefObject } from 'react'
import { SearchSvg } from '../../../icons/sub-menu/svg-icons-components'
import './search-input-component.css'

export const SearchInput = ({
  searchedValueRef,
  placeholder = 'search company or id',
  reset,
}: {
  searchedValueRef: MutableRefObject<HTMLInputElement | null>
  placeholder?: string
  reset: () => void
}) => {
  const handle_Reset = () => {
    console.log('reset')
    reset()
  }

  return (
    <span className='search-input-container'>
      <SearchSvg />
      <input ref={searchedValueRef} className='search-input' type='text' placeholder={placeholder} />
      <input className='reset-button' type='button' onClick={handle_Reset} value='✖' />
    </span>
  )
}
