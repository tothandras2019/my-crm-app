import './custom-button-component.css'

type CustomButtonType = { value?: string; type?: string; handler?: () => void }
export const CustomButton = ({ value = 'register', type = 'submit', handler }: Partial<CustomButtonType>): JSX.Element => {
  return <input type={type} value={value} onClick={handler} />
}
