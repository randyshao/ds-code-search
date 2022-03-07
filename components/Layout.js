import Link from 'next/link';
import Head from 'next/head';
import { useState } from 'react';
import styles from '../styles/Layout.module.css';

const Layout = ({ children }) => {
  return (
    <div className={styles.Container}>
      <Head>
        <title>EQ Works</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {children}
    </div>
  );
};

export default Layout;
