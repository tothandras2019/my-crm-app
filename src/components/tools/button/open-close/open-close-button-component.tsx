import './open-close-button-component.css'

type OpenCloseButtonType = { color?: string; pageTextValue: string | undefined; handler: () => void }
export const OpenCloseButton = ({ color = '', pageTextValue = 'home', handler }: OpenCloseButtonType) => {
  return <input className={color} type='button' value={pageTextValue} onClick={handler} />
}
