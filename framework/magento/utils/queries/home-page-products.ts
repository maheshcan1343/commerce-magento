export const HomepageProducts = `
  query{
    products(filter: { sku: { in: ["ALP-AT6102HWA", "FD-FTDT5096-AC", "MF-1530M", "RAC-2000WB", "SAN-SASBT26", "FD-FASBE1600-UK", "AGFA-45-0218", "STIG-3398H", "RAC-PBB75", "FD-FTDE1200R", "JR-FNY026", "MF-SP42"] } }) {
          items {
              id
              name
              sku
              stock_status
              image{
                  url
              }
              review_count
              rating_summary
              reviews{
                  items{
                    created_at
                    nickname
                    summary
                    text
                    average_rating
                  }
              }
              url_key
              price {
                  regularPrice {
                      amount {
                          currency
                          value
                      }
                  }
              }
              special_price
              special_to_date
              meta_title
              meta_keyword
              meta_description
              small_image {
                  url
              }
          }
      }
  }
`
