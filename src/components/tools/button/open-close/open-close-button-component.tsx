import './open-close-button-component.css'
export const OpenCloseButton = ({ changeValue = 'home', handler }: { changeValue: string; handler: () => void }) => {
  return <input type='button' value={changeValue} onClick={handler} />
}
