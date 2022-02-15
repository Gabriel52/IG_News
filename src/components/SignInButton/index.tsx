import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi' 
import { useSession, signIn, signOut } from "next-auth/react"

import styles from './styles.module.scss'
export const SignInButton = ():JSX.Element => {
    const { data: session, status } = useSession()
    
    return  session ? (
        <button 
            onClick={() => signOut()} 
            className={styles.SignInButton} 
            type="button"
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
            type="button"
            className={styles.SignInButton} 
        >
            <FaGithub color="#EBA417" />
            Sign in with Github
        </button>

    )
}