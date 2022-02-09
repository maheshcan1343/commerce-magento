import { Category } from '@commerce/types/site'
import { SaleorConfig } from '../api'
import { CollectionCountableEdge } from '../schema'
import * as query from './queries'

const getCategories = async (config: SaleorConfig): Promise<Category[]> => {
  const { data } = await config.fetch(query.CollectionMany, {
    variables: {
      id: 4234,
    },
  })

  return (
    data.category
  )
}

export default getCategories
