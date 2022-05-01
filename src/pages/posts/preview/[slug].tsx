import {  GetStaticPaths, GetStaticProps } from "next"
import { RichText } from "prismic-dom";
import Head from 'next/head';

import { getPrismicClient } from "../../../services/prismic";
import styles from '../post.module.scss'
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { TIME_FOR_REVALIDATE } from "../../../const";

type Post = {
    slug: string;
    title: string;
    content: string;
    updatedAt: string
}

type Props = {
    post: Post
}

export default function PostPreview({post}: Props){
    const { data: session } = useSession()
    const { push } = useRouter()

    useEffect(() =>{
        if(session?.activeSubscription){
            push(`/posts/${post.slug}`)
        }
    },[session])

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
                        className={`${styles.postContent} ${styles.previewContent}`}
                    />
                    <div className={styles.continueReading}>
                        Wanna continue reading?
                        <Link href="/">
                            <a>Subscribe now 😉</a>
                        </Link>
                    </div>
                </article>
            </main>
        </>
    )
} 

export const getStaticPaths: GetStaticPaths = () => {
    return {
        paths: [],
        fallback: 'blocking',
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const client = getPrismicClient()
    const { slug } = params
    const document = await client.getByUID('publication-custom-type', String(slug), {})
    const post = {
        slug,
        title: RichText.asText(document.data.Title),
        content: RichText.asHtml(document.data.Content.splice(0, 3)),
        updatedAt: new Date(document.last_publication_date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        })
    }

    return {
        props: {
            post
        },
        redirect: TIME_FOR_REVALIDATE
    }
}