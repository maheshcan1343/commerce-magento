export const PageMany = /* GraphQL */ `
  query PageMany {
    categoryList(filters: { ids: { eq: "4328" } }) {
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
