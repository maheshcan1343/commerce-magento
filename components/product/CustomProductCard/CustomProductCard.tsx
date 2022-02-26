/* eslint-disable @next/next/no-img-element */
import { FC } from 'react'
import cn from 'classnames'
import Link from 'next/link'
import type { Product } from '@commerce/types/product'
import s from './ProductCard.module.css'
import Image, { ImageProps } from 'next/image'
import WishlistButton from '@components/wishlist/WishlistButton'
import usePrice from '@framework/product/use-price'
import ProductTag from '../ProductTag'

interface Props {
  className?: string
  product: Product
  noNameTag?: boolean
  imgProps?: Omit<ImageProps, 'src' | 'layout' | 'placeholder' | 'blurDataURL'>
  variant?: 'default' | 'slim' | 'simple'
}

const placeholderImg = '/product-img-placeholder.svg'

const CustomProductCard: FC<Props> = ({
  product,
  imgProps,
  className,
  noNameTag = false,
  variant = 'default',
}) => {
  const rootClassName = cn(
    s.root,
    { [s.slim]: variant === 'slim', [s.simple]: variant === 'simple' },
    className
  )

  return (
    <Link href={`${product.url}`}>
      <a className={rootClassName}>
        <div>
          <span>{product.name}</span>
          <div>
            <img
              src={product.imageUrl}
              alt={'Product Image'}
              height={480}
              width={480}
            />
            <div>
              <p>
                Price : {product.regularPrice}
                {product.currency}
              </p>
              <span>
                Special Price : {product.specialPrice}
                {product.currency}
              </span>
            </div>
            <div>
              <span>
                <p>Review Count : {product.reviewCount}</p>
                <p>Rating Summary : {product.reviewSummary / 20}</p>
              </span>
            </div>
          </div>
        </div>
        <div></div>
      </a>
    </Link>
  )
}

export default CustomProductCard
