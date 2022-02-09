import type { OperationContext } from '@commerce/api/operations'
import { Product } from '@commerce/types/product'
import type { Provider, SaleorConfig } from '..'
import * as Query from '../../utils/queries'
import { GraphQLFetcherResult } from '@commerce/api'

type ReturnType = {
  products: Product[]
}

export default function getHomepageProductsOperation({ commerce }: OperationContext<Provider>) {
  async function getHomepageProducts({
    query = Query.HomepageProducts,
    variables,
    config,
  }: {
    query?: string
    variables?: any
    config?: Partial<SaleorConfig>
    preview?: boolean
    featured?: boolean
  } = {}): Promise<ReturnType> {
    const { fetch, locale } = commerce.getConfig(config)

    const { data }: GraphQLFetcherResult = await fetch(
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

    const products = data.products.items.length === 0 ? [] : data.products.items
    return {
      products,
    }
  }

  return getHomepageProducts
}
