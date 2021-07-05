// totally not mine
// converted from this person: https://codepen.io/Testosterone/pen/ZEKEWEr
import React from 'react';
import styles from './Spinner.css';

function Spinner() {
  return (
    <div className={styles.spinner}>
      <div className={styles.bounce1}></div>
      <div className={styles.bounce2}></div>
      <div className={styles.bounce3}></div>
    </div>
  );
}

export default Spinner;
