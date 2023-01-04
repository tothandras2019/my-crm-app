import './open-close-button-component.css'
export const OpenCloseButton = ({ pageTextValue = 'home', handler }: { pageTextValue: string | undefined; handler: () => void }) => {
  return <input type='button' value={pageTextValue} onClick={handler} />
}
