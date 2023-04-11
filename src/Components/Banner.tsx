import React from 'react';
import styles from '@/styles/banner.module.css';
import { Source_Sans_Pro } from 'next/font/google'

const ssp = Source_Sans_Pro({weight: ['400'], style: ['normal'], subsets: ['latin']})

export default function Banner() {
  return (
    <div className={[styles.banner, ssp.className].join(" ")}>
        <ul className={styles.bannerUl}>
            <li>🚀<strong>Free shipping</strong> for orders over $50🚀</li>
            <li>🛵Same day deliveries before <strong>12 pm🛵</strong></li>
            <li>🔓<strong>Warranty</strong> up to <strong>3</strong> months🔓</li>
        </ul>
    </div>
  );
}