export const PageOne = /* GraphQL */ `
  query PageOne {
    products(filter: { sku: { eq: "FD-FTDE1200R-1-RTN752" } }) {
      items {
        name
        sku
        url_key
        stock_status
      }
    }
  }
`
