"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import styles from "./navbar.module.css"
import Link from 'next/link'

const navbar = () => {
  const [openNav, setOpenNav] = useState(false);

  return (
    <>
    <nav className={styles.navbar + " " + `${openNav ? styles.appear : ""}`}>
      <Image
      onClick={()=> setOpenNav(false)}
      className={styles.close}
      src={"/icons/close.png"}
        height={50}
        width={50}
        alt='close'
      />
      <Link href="/">
        Home
      </Link>
        <Link href="/copy">
        CopyWrite
      </Link>
      <Link href="/web">
        Web Design
      </Link>
            <Link href="/graphic">
        Graphic Design
      </Link>
        <Link href="/contact">
        Contact
      </Link>
    </nav>
    <header className={styles.header}>
      <a className={styles.logo} href="/">Digital Agency Logo</a>
      <Image
      className={styles.menu}
      onClick={()=> setOpenNav(true)}
        src={"/icons/menu.png"}
      width={61.25}
      height={32.55}
      alt='menu'
      />
    </header>
    </>
  )
}

export default navbar