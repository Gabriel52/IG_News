import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { RichText } from 'prismic-dom'

import { getPrismicClient } from '../../services/prismic'
import styles from './styles.module.scss'

type Result = {
    slug: string
    title: string,
    excerpt: string,
    updatedAt: string
}

type Props = {
    result: Result[]
}

export default function Posts({ result }:Props) {
    return (
        <>
            <Head>
                <title>Posts | Ignews</title>
            </Head>
            <main className={styles.container}>
                <div className={styles.posts}>
                    {result.map(post => (
                        <Link href={`/posts/${post.slug}`}>
                            <a key={post.slug}>
                                <time>
                                    {post.updatedAt}
                                </time>
                                <strong>
                                    {post.title}
                                </strong>
                                <p>
                                    {post.excerpt}
                                </p>
                            </a>
                        </Link>
                    ))}
                </div>
            </main>
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrismicClient()

    const blogPosts = await prismic.getAllByType('publication-custom-type');
    
    const result = blogPosts.map(post => {
        return {
            slug: post.uid,
            title: RichText.asText(post.data.Title),
            excerpt: post.data.Content.find(content => content.type ==='paragraph')?.text ?? '',
            updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            })
        }
    })
    return { 
        props: {result}
    }

}