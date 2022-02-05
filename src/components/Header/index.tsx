import { SignInButton } from '../SignInButton'
import styles from './styles.module.scss'

export const Header = ():JSX.Element => {
    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <img src="/images/logo.svg" alt="ig.news" />
                <nav>
                    <a className={styles.activeButton}>Home</a>
                    <a href="">Posts</a>
                </nav>
                <SignInButton />
            </div>
        </header>
    )
}