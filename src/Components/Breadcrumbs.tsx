import React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from 'next/link';
import styles from '@/styles/breadcrumb.module.css';

interface bcObject{
    key: string,
    text: string,
    href: string,
}

interface propList{
    arr: Array<bcObject>
}

export default function BasicBreadcrumbs(props: propList) {
  return (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb" className={styles.container}>
          {props.arr.map((item) => {
            item.key === 'item' ? item.text = item.text.substring(0,15)+'...' : null;
            return (
                <Link href={item.href} key={item.text}>
                    <p>{item.text}</p>
                </Link>
            )
          })}
      </Breadcrumbs>
    </div>
  );
}