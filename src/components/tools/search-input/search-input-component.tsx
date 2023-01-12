import { MutableRefObject } from 'react'
import { SearchSvg } from '../../../icons/sub-menu/svg-icons-components'
import './search-input-component.css'

export const SearchInput = ({
  searchedValueRef,
  placeholder = 'search company',
  reset,
}: {
  searchedValueRef: MutableRefObject<HTMLInputElement | null>
  placeholder?: string
  reset: () => void
}) => (
  <span className='search-input-container'>
    <SearchSvg />
    <input ref={searchedValueRef} className='search-input' type='text' placeholder={placeholder} />
    <input className='reset-button' type='button' onClick={reset} value='✖' />
  </span>
)
