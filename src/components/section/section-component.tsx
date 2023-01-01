import './section-component.css'
import { SectionActionHeader } from './section-action-header/section-action-header'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
export const Section = ({ Element }: { Element: JSX.Element }): JSX.Element => {
  return (
    <section>
      <SectionActionHeader />
      {Element}
    </section>
  )
}
