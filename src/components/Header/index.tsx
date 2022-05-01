import { ActiveLink } from '../ActiveLink'
import { SignInButton } from '../SignInButton'
import styles from './styles.module.scss'

export const Header = ():JSX.Element => {
    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <img src="/images/logo.svg" alt="ig.news" />
                <nav>
                    <ActiveLink activeClassName={styles.activeButton} href="/">
                        <a>Home</a>
                    </ActiveLink>
                    <ActiveLink activeClassName={styles.activeButton} href="/posts">
                        <a >Posts</a>
                    </ActiveLink>
                </nav>
                <SignInButton />
            </div>
        </header>
    )
}