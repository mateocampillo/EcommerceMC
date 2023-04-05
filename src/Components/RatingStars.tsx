import React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import styles from '@/styles/ratingStars.module.css';

interface propList{
    rating: number;
    count: number;
  }

export default function HalfRating(props:propList) {
  return (
    <Stack className={styles.container}>
      <Rating className={styles.starsContainer} name="half-rating-read" defaultValue={props.rating} precision={0.5} readOnly />
      <p className={styles.count}>&#40;{props.count}&#41;</p>
    </Stack>
  );
}