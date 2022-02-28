import type { OperationContext } from '@commerce/api/operations'
import { normalizeProduct } from '../../utils'
import type { Provider, SaleorConfig } from '..'

import * as Query from '../../utils/queries'
export type Page = any
export type GetAllPagesResult<T extends { pages: any[] } = { pages: Page[] }> =
  T

type Variables = {
  slug: string
}

type ReturnType = {
  Page: any
}

export default function getProductOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getCategoryBySlug({
    query = Query.CategoryOneBySlug,
    variables,
    config: cfg,
  }: {
    query?: string
    variables: Variables
    config?: Partial<SaleorConfig>
    preview?: boolean
  }): Promise<GetAllPagesResult> {
    const { fetch, locale } = commerce.getConfig(cfg)

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

    let getDataFromResponse = null

    if (data.categoryList.length > 1) {
      if (data.categoryList[0].products.items.length > 0) {
        getDataFromResponse = data.categoryList[0].products
      } else {
        getDataFromResponse = data.categoryList[1].products
      }
    } else {
      getDataFromResponse = data.categoryList[0].products
    }

    const pages = getDataFromResponse.items.map((loopChildren) => ({
      url: `/${loopChildren.url_key}`,
      name: loopChildren.name,
      id: loopChildren.id,
      imageUrl: loopChildren.image.url,
      reviewCount: loopChildren.review_count,
      reviewSummary: loopChildren.rating_summary,
      regularPrice: loopChildren.price.regularPrice.amount.value,
      specialPrice: loopChildren.special_price,
      currency: loopChildren.price.regularPrice.amount.currency,
    }))

    return { pages }
  }

  return getCategoryBySlug
}
