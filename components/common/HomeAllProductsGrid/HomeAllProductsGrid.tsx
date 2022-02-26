import { FC } from 'react'
import Link from 'next/link'
import type { Product } from '@commerce/types/product'
import { Grid } from '@components/ui'
import { ProductCard } from '@components/product'
import s from './HomeAllProductsGrid.module.css'
import { getCategoryPath, getDesignerPath } from '@lib/search'

interface Props {
  categories?: any
  brands?: any
  products?: Product[]
}

const megaMenuCollections = [
  'special-offers',
  'garden-outdoor-furniture',
  'bbqs-fire-pits',
  'garden-sheds',
  'lawnmowers',
  'ride-on-mowers',
  'strimmers-and-brushcutters',
  'blowers-chainsaws',
  'cultivators',
  'shredders-for-sale',
  'accessories',
  'scarifiers',
]

const HomeAllProductsGrid: FC<Props> = ({
  categories,
  brands,
  products = [],
}) => {
  const navBarlinks = categories.children
    .filter(
      (megamenu) =>
        megamenu.include_in_menu === 1 &&
        megaMenuCollections.indexOf(megamenu.url_path) > -1
    )
    .map((megamenu) => ({
      id: megamenu.id,
      label: megamenu.name,
      href: `/${megamenu.url_path}`,
      include_in_menu: megamenu.include_in_menu,
    }))
  return (
    <div className={s.root}>
      <div className={s.asideWrapper}>
        <div className={s.aside}>
          <ul className="mb-10">
            <li className="py-1 text-base font-bold tracking-wide">
              <Link href={getCategoryPath('')}>
                <a>All Categories</a>
              </Link>
            </li>
            {navBarlinks.map((cat: any) => (
              <li key={cat.path} className="py-1 text-accent-8 text-base">
                <Link href={cat.href}>
                  <a>{cat.label}</a>
                </Link>
              </li>
            ))}
          </ul>
          {/* <ul className="">
            <li className="py-1 text-base font-bold tracking-wide">
              <Link href={getDesignerPath('')}>
                <a>All Designers</a>
              </Link>
            </li>
            {brands.flatMap(({ node }: any) => (
              <li key={node.path} className="py-1 text-accent-8 text-base">
                <Link href={getDesignerPath(node.path)}>
                  <a>{node.name}</a>
                </Link>
              </li>
            ))}
          </ul> */}
        </div>
      </div>
      <div className="flex-1">
        <Grid layout="normal">
          {products.map((product) => (
            <ProductCard
              key={product.path}
              product={product}
              variant="simple"
              imgProps={{
                width: 480,
                height: 480,
              }}
            />
          ))}
        </Grid>
      </div>
    </div>
  )
}

export default HomeAllProductsGrid
