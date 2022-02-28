import type {
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next'
import commerce from '@lib/api/commerce'
import { Text } from '@components/ui'
import { Layout } from '@components/common'
import getSlug from '@lib/get-slug'
import { missingLocaleInPages } from '@lib/usage-warns'
import type { Page } from '@commerce/types/page'
import { useRouter } from 'next/router'
//import HomeAllProductsGrid from '@components/common/HomeAllProductsGrid'
import Search from '@components/search'

export async function getStaticProps({
  preview,
  params,
  locale,
  locales,
}: GetStaticPropsContext<{ pages: string[] }>) {
  const config = { locale, locales }
  // const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  //const { pages } = await pagesPromise
  const { categories } = await siteInfoPromise
  const path = params?.pages.join('/')
  const slug = locale ? `${locale}/${path}` : path

  /*const pageItem = pages.map((p: Page) =>
    p.url ? getSlug(p.url) === slug : false
  )*/

  const productPromise = commerce.getCategoryBySlug({
    variables: { slug: path },
    config,
    preview,
  })
  const { pages } = await productPromise
  const pageItem = true
  const data =
    pageItem &&
    (await commerce.getPage({
      variables: { id: '7890' },
      config,
      preview,
    }))

  const page = data?.page

  if (!page) {
    // We throw to make sure this fails at build time as this is never expected to happen
    throw new Error(`Page with slug '${slug}' not found`)
  }

  return {
    props: { pages, page, categories },
    revalidate: 60 * 60, // Every hour
  }
}

export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  const config = { locales }
  const { pages }: { pages: Page[] } = await commerce.getAllPages({ config })
  const [invalidPaths, log] = missingLocaleInPages()
  const paths = pages
    .map((page) => page.url)
    .filter((url) => {
      return url
    })
  log()

  return {
    paths,
    fallback: 'blocking',
  }
}

export default function Pages({
  page,
  categories,
  pages,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()

  return router.isFallback ? (
    <h1>Loading...</h1> // TODO (BC) Add Skeleton Views
  ) : (
    <div>
      {<Search categories={categories} pages={pages} />}
      {page?.body && <Text html={page.body} />}
    </div>
  )
}

Pages.Layout = Layout
