import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react";
import { RichText } from "prismic-dom";
import Head from 'next/head';


import { getPrismicClient } from "../../services/prismic";
import styles from './post.module.scss'

type Post = {
    slug: string;
    title: string;
    content: string;
    updatedAt: string
}

type Props = {
    post: Post
}

export default function Post({post}: Props){
    return (
        <>
            <Head>
                <title>{post.slug} | Ignews</title>
            </Head>
            <main className={styles.container}>
                <article className={styles.post}>
                    <h1>{post.title}</h1>
                    <time>{post.updatedAt}</time>
                    <div 
                        dangerouslySetInnerHTML={{ __html: post.content}} 
                        className={styles.postContent}
                    />
                </article>
            </main>
        </>
    )
} 

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
    const session = await getSession({ req });
    const client = getPrismicClient()
    const { slug } = params
    const document = await client.getByUID('publication-custom-type', String(slug), {})
    const post = {
        slug,
        title: RichText.asText(document.data.Title),
        content: RichText.asHtml(document.data.Content),
        updatedAt: new Date(document.last_publication_date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        })
    }
    if (!session?.activeSubscription){
        return {
            redirect: {
                destination:'/',
                permanent: false,
            }
        }
    }

    return {
        props: {
            post
        }
    }
}