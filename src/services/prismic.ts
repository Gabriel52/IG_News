import * as Prismic from '@prismicio/client'

export const getPrismicClient = () => {
    const prismic = Prismic.createClient(
        process.env.PRISMIC_ENDPOINT, {
            accessToken: process.env.PRISMIC_ACCESS_TOKEN
        }
    )

    return prismic
}