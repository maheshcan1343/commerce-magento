import commerce from '@lib/api/commerce'
import { Layout } from '@components/common'
import { ProductCard } from '@components/product'
import { Grid, Marquee, Hero } from '@components/ui'
// import HomeAllProductsGrid from '@components/common/HomeAllProductsGrid'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales }
  const homepageProductsPromise = commerce.getHomepageProducts({
    config,
    preview,
  })

  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const { categories } = await siteInfoPromise
  const { products: homepageProducts } = await homepageProductsPromise
  
  return {
    props: {
      homepageProducts,
      categories
    },
    revalidate: 60,
  }
}

export default function Home({
  homepageProducts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <div className="flex-1">
        <Grid layout="normal">
          {homepageProducts.map((product: any, i: number) => (
            <ProductCard
              key={product.path}
              product={product}
              variant="simple"
              imgProps={{
                width: 480,
                height: 480,
              }}
            />
          ))}
        </Grid>
      </div>
    </>
  )
}

Home.Layout = Layout
