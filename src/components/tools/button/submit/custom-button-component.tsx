import './custom-button-component.css'
export const CustomButton = ({
  value = 'register',
  type = 'submit',
  handler,
}: {
  value?: string
  type?: string
  handler?: () => void
}): JSX.Element => {
  return <input type={type} value={value} />
}
