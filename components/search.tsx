import cn from 'classnames'
import type { SearchPropsType } from '@lib/search-props'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'

import { Layout } from '@components/common'
import CustomProductCard from '@components/product/CustomProductCard'
import type { Product } from '@commerce/types/product'
import { Container, Skeleton } from '@components/ui'

import useSearch from '@framework/product/use-search'

import getSlug from '@lib/get-slug'
import rangeMap from '@lib/range-map'

const SORT = {
  'trending-desc': 'Trending',
  'latest-desc': 'Latest arrivals',
  'price-asc': 'Price: Low to high',
  'price-desc': 'Price: High to low',
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

import {
  filterQuery,
  getCategoryPath,
  getDesignerPath,
  useSearchMeta,
} from '@lib/search'

export default function Search({ categories, brands, pages }: SearchPropsType) {
  const [activeFilter, setActiveFilter] = useState('')
  const [toggleFilter, setToggleFilter] = useState(false)

  const router = useRouter()
  const { asPath, locale } = router
  const { q, sort } = router.query
  // `q` can be included but because categories and designers can't be searched
  // in the same way of products, it's better to ignore the search input if one
  // of those is selected
  const query = filterQuery({ sort })

  const { pathname, category, brand } = useSearchMeta(asPath)

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
    <Container>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-3 mb-20">
        <div className="col-span-8 lg:col-span-2 order-1 lg:order-none">
          {/* Categories */}
          <div className="relative inline-block w-full">
            <div
              className={`origin-top-left absolute lg:relative left-0 mt-2 w-full rounded-md shadow-lg lg:shadow-none z-10 mb-10 lg:block ${
                activeFilter !== 'categories' || toggleFilter !== true
                  ? 'hidden'
                  : ''
              }`}
            >
              <div className="rounded-sm bg-accent-0 shadow-xs lg:bg-none lg:shadow-none">
                <div
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <ul className="mb-10">
                    <li className="py-1 text-base font-bold tracking-wide">
                      <Link href={getCategoryPath('')}>
                        <a>All Categories</a>
                      </Link>
                    </li>
                    {navBarlinks.map((cat: any) => (
                      <li
                        key={cat.path}
                        className="py-1 text-accent-8 text-base"
                      >
                        <Link href={cat.href}>
                          <a>{cat.label}</a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Products */}
        <div className="col-span-8 order-3 lg:order-none">
          <div className="mb-12 transition ease-in duration-75">
            Showing {pages.length} results{' '}
          </div>
          {pages ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pages.map((product: Product) => (
                <CustomProductCard
                  variant="simple"
                  key={product.path}
                  className="animated fadeIn"
                  product={product}
                  imgProps={{
                    width: 480,
                    height: 480,
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rangeMap(12, (i) => (
                <Skeleton key={i}>
                  <div className="w-60 h-60" />
                </Skeleton>
              ))}
            </div>
          )}
          {'Currently the category have no products. '}
        </div>
      </div>
    </Container>
  )
}

Search.Layout = Layout
