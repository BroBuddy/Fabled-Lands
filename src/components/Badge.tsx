import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Badge.module.scss'

type BadgeProps = {
    text: string
    link?: string
}

const Badge: React.FC<BadgeProps> = ({ text, link }) => {
    if (!link) return <span className={styles.badge}>{text}</span>

    return (
        <Link to={link} className={styles.badge}>
            {text}
        </Link>
    )
}

export default Badge
