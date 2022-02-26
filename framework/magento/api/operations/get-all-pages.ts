import type { OperationContext } from '@commerce/api/operations'

import { QueryPagesArgs, PageCountableEdge } from '../../schema'
import type { SaleorConfig, Provider } from '..'
import * as Query from '../../utils/queries'
import { Children } from 'react'

export type Page = any

export type GetAllPagesResult<T extends { pages: any[] } = { pages: Page[] }> =
  T

export default function getAllPagesOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getAllPages({
    query = Query.PageMany,
    config,
    variables,
  }: {
    url?: string
    config?: Partial<SaleorConfig>
    variables?: QueryPagesArgs
    preview?: boolean
    query?: string
  } = {}): Promise<GetAllPagesResult> {
    const { fetch, locale, locales = ['en-US'] } = commerce.getConfig(config)

    const { data } = await fetch(
      query,
      { variables },
      {
        ...(locale && {
          headers: {
            'Accept-Language': locale,
          },
        }),
      }
    )

    const getDataFromResponse = data.categoryList[0].products

    const pages = getDataFromResponse.items.map((loopChildren) => ({
      url: `/${loopChildren.url_key}`,
      name: loopChildren.name,
      id: loopChildren.id,
      imageUrl: loopChildren.image.url,
      reviewCount: loopChildren.review_count,
      reviewSummary: loopChildren.rating_summary,
      regularPrice: loopChildren.price.regularPrice.amount.value,
      specialPrice: loopChildren.special_price,
      currency: loopChildren.price.regularPrice.amount.currency
    }))
    return { pages }
  }

  return getAllPages
}
