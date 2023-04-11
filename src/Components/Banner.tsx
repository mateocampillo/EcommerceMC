import React from 'react';
import styles from '@/styles/banner.module.css';

export default function Banner() {
  return (
    <div className={styles.banner}>
        <ul className={styles.bannerUl}>
            <li><strong>Free shipping</strong> for orders over $50</li>
            <li>Same day deliveries before <strong>12 pm</strong></li>
            <li><strong>Warranty</strong> up to <strong>3</strong> months</li>
        </ul>
    </div>
  );
}