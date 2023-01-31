import { FormEvent, MutableRefObject } from 'react'
import { CustomButton } from '../tools/button/submit/custom-button-component'
import { SearchInput } from '../tools/search-input/search-input-component'

type HeaderTitleColumnType = {
  button_title: string
  headerItem: string[]
  useRef: MutableRefObject<HTMLInputElement | null>
  submit_Search: (event: FormEvent<HTMLFormElement>) => void
  reset: () => void
  handleNewItem: () => void
}

export const HeaderTitleColumn = ({
  button_title = 'missing!',
  headerItem,
  useRef,
  submit_Search,
  reset,
  handleNewItem,
}: HeaderTitleColumnType): JSX.Element => {
  return (
    <div className='header-details'>
      <div className='header-details-column'>
        {headerItem.map((title, index) => (
          <p key={`${title}-${index}`}>{title}</p>
        ))}
      </div>
      <div>
        <form onSubmit={submit_Search}>
          <SearchInput searchedValueRef={useRef} reset={reset} />
          <input type='submit' style={{ display: 'none' }} />
        </form>
      </div>
      <CustomButton color={'green'} value={button_title} handler={handleNewItem} />
    </div>
  )
}
