import './summary-details-component.css'
import { useContext, useEffect, useState } from 'react'
import { ProductsMapping } from './products-mapping/products-mapping-component'
import { CustomerContext } from './../../../DATASTORE/contacts-reducer'
import { ProductType } from '../../../DATASTORE/data-types/data-types'

export const SummaryDetails = ({ coords, items }: { coords?: { X: number; Y: number }; items: any[] }): JSX.Element => {
  const extraTranslations = 30
  const { active } = useContext(CustomerContext)
  const [productItems, setProductItems] = useState<ProductType[]>([])
  useEffect(() => {
    if (!active) return
    const productArray = Object.values(active.subscribed.products)
    setProductItems(productArray)
  }, [active])

  return (
    <div
      className='summary-details-component'
      style={
        coords
          ? {
              transform: `translate(${coords.X}px, ${coords.Y + extraTranslations}px)`,
            }
          : { position: 'relative' }
      }
    >
      {productItems.length !== 0 ? <ProductsMapping products={productItems} /> : <ProductsMapping products={items} />}
    </div>
  )
}
