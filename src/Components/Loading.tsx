import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import styles from '@/styles/loading.module.css';

export default function Loading() {

    return (
        <div className={styles.container}>
            <Box>
                <CircularProgress/>
            </Box>
        </div>

    )

}
