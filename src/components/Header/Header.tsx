import React from 'react'
import styles from './Header.module.scss'


const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <h1>NASA</h1>
      <h3>Near Earth Objects</h3>
    </div>
  )
}

export default Header