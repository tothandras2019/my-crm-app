import { AddSvg, RemoveSvg } from '../../../../icons/sub-menu/svg-icons-components'
import './plus-button.component.css'

type PlusButtonType = { type: string; handler: () => void }
export const PlusButton = ({ type = 'add', handler }: Partial<PlusButtonType>) => {
  return (
    <div className='plus-button_circle'>
      <button onClick={handler}>{type === 'add' ? <AddSvg /> : <RemoveSvg />}</button>
    </div>
  )
}
