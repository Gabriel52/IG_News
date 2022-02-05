import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi' 
import { useSession, signIn } from "next-auth/react"

import styles from './styles.module.scss'
export const SignInButton = ():JSX.Element => {
    const isUserLoggedIn = false;
    const { data: session, status } = useSession()
    return  session ? (
        <button 
            onClick={() => signIn('github')} 
            className={styles.SignInButton} 
        >
            <FaGithub color="#04D361" />
            Gabriel Brune
            <FiX color="#737380" className={styles.closeIcon}/>
        </button>
    ) : (
        <button 
            onClick={(e) => {
                e.preventDefault()
                signIn('github')
            }}
            className={styles.SignInButton} 
        >
            <FaGithub color="#EBA417" />
            Sign in with Github
        </button>

    )
}