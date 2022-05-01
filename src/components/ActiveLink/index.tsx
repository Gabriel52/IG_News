import Link, { LinkProps } from "next/link"
import { useRouter } from "next/router";
import { ReactElement, cloneElement } from "react"

interface Props extends LinkProps  {
    children: ReactElement;
    activeClassName: string;
}

export const ActiveLink = ({children, activeClassName, ...rest}: Props):JSX.Element => {
    const { asPath } = useRouter()

    const className = asPath === rest.href
        ? activeClassName
        : '';

    return (
        <Link { ...rest }>
            {cloneElement(children, {className})}
        </Link>
    )
}