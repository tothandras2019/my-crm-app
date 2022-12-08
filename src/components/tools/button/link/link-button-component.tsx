import './link-button-component.css'

export const LinkButton = ({ value = 'empty', rotating }: { value?: string | undefined; rotating: number }) => {
  return (
    <div className='menu-link' style={{ transform: `rotateZ(${rotating}deg) translateY(210px)` }}>
      <p>{value}</p>
    </div>
  )
}
