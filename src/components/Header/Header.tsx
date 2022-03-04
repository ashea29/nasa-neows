import React from 'react'
import styles from './Header.module.scss'


const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <h1>NASA - Near Earth Object Tracker</h1>
    </div>
  )
}

export default Header