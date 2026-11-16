import React from 'react';
import styles from './VeloopLogo.module.css';

export const VeloopLogo = ({ size = 'normal', showSubtitle = true, light = false }) => {
  return (
    <div className={`${styles.logoContainer} ${styles[size]} ${light ? styles.lightMode : ''}`}>
      {/* Official VELOOP Loop Infinity Vortex Logo */}
      <div className={styles.emblemBadge}>
        <img
          src="/veloop-logo.png"
          alt="VELOOP Loop Emblem"
          className={styles.emblemImage}
        />
      </div>

      {/* Brand Typography */}
      <div className={styles.brandTextCol}>
        <span className={styles.brandMain}>VELOOP</span>
        {showSubtitle && <span className={styles.brandSub}>REWARDS</span>}
      </div>
    </div>
  );
};

