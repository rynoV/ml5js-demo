import React from 'react'
import { Link } from 'gatsby'

import styles from './layout.module.css'

export function Layout({ children }) {
  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <Link to='/'>Image Recognition</Link>
        {/*<Link to='/Sentiment'>Sentiment Recognition</Link>*/}
      </nav>
      <main className={styles.main}>{children}</main>
    </div>
  )
}
