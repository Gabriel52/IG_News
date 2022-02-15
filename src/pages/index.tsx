import Head from 'next/head'
import { GetStaticProps } from 'next'
import { SubscribeButton } from '../components/SubscribeButton'

import styles from './home.module.scss'
import { stripe } from '../services/stripe'
import { ID_PRODUCT_STRIP_SUBSCRIPTION, TIME_FOR_REVALIDATE } from '../const'

type Product = {
  priceId: string,
  amount: number
}

type Props = {
  product: Product
}

export default function Home({product}:Props) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>
      <main  className={styles.contentContainer}>
        <section className={styles.hero}>
          <span> 🖖 Hey, Welcome</span>
          <h1>News about <br/> the <span>React</span> world.</h1>
          <p>
            Get access to all the publications <br/>
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>
        <img src="/images/avatar.svg" alt="Girl Coding" />
      </main>
    </>
  )
}

// responsável por fazer requisições a Api, pelo lado do servidor
export const getStaticProps: GetStaticProps = async () => {
  const locale = 'en-US'
  const currency = 'USD'
  const price = await stripe.prices.retrieve(ID_PRODUCT_STRIP_SUBSCRIPTION)
  const product = {
    priceId: price.id,
    amount: (price.unit_amount / 100)
      .toLocaleString(locale, 
        { style: 'currency', currency }
      )
  } 
  return {
    props: {
      product
    },
    revalidate: TIME_FOR_REVALIDATE
  }
} 