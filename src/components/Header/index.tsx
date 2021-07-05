import React from 'react';
import styles from './Header.css';

function Header({ headerText = 'Bench Test' }: { headerText?: string }) {
  return (
    <div className={styles.header}>
      <h1 className={styles.headerText}>{headerText}</h1>
    </div>
  );
}

export default Header;
