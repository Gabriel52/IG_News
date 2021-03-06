import styles from './styles.module.scss'
import { useSession, signIn } from "next-auth/react"

import { api } from '../../services/api'
import { getStripeJs } from '../../services/stripe-public'
import { useRouter } from 'next/router'


type Props = {
    priceId: string;
}

export const SubscribeButton = ({ priceId }:Props):JSX.Element => {
    const { data: session, status } = useSession()
    const { push } = useRouter()
    const handleSubscribe = async () => {
        if(!session){
            signIn('github')
            return
        }
        if(session?.activeSubscription){
            push('/posts')
            return
        }
        try{
            const response = await api.post('/subscribe');
            const { sessionId } = response.data
            const stripe = await getStripeJs()

            await stripe.redirectToCheckout({sessionId: sessionId})
        }catch(error){
            alert(error.message)
        }
    }
    return (
        <button 
            type="button"
            className={styles.subscribeButton}
            onClick={handleSubscribe}
        >
            Subscribe Now
        </button>
    )
}