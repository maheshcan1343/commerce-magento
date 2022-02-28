export const CategoryOneBySlug = /* GraphQL */ `
  query CategoryOneBySlug($slug: String!) {
    categoryList(filters: { url_key: { eq: $slug} }) {
      products {
        items {
          id
          name
          sku
          url_key
          review_count
          rating_summary
          image {
            url
          }
          price {
            regularPrice {
              amount {
                currency
                value
              }
            }
          }
          special_price
        }
      }
    }
  }
`
