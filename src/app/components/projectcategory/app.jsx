"use client"
import React, { useEffect } from 'react'
import Image from 'next/image'
import styles from "./styles.module.css"
import Link from 'next/link'

const app = ({item}) => {


  return (
   <article className={styles.article}>
            <Image
              src={ item.imagesUrls[0] || "/images/portfolio.png"}
              width={250}
              height={100}
              alt='image'
            />
            <div className={styles.content}>
              <p>{item.description.substring(0, 80)}...</p>
            <Link href={`/projects/${item?.id}`}>
              <button>View More</button>
              </Link>
            </div>
          </article>
  )
}

export default app