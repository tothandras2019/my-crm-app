import './link-button-component.css'

export const LinkButton = ({ value = 'empty', rotating, hide }: { value?: string | undefined; rotating: number; hide: boolean }) => {
  return (
    <div className={`menu-link ${hide ? 'hide' : ''}`}>
      <p>{value}</p>
    </div>
  )
}

// style={{ transform: `rotateZ(${rotating}deg) translateY(210px)` }}
