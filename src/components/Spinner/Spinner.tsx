import React from 'react'
import styles from './Spinner.module.scss'


const Spinner: React.FC = () => {
  return (
    <div className={styles["loader-container"]}>
      <span className={styles.loader}></span>
    </div>
  )
}

export default Spinner