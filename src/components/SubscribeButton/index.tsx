import styles from './styles.module.scss'

type Props = {
    priceId: string;
}

export const SubscribeButton = ({priceId}:Props):JSX.Element => {
    return (
        <button 
            type="button"
            className={styles.subscribeButton}
        >
            Subscribe Now
        </button>
    )
}