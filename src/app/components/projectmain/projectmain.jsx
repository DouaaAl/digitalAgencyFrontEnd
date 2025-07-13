import React from 'react'
import styles from "./style.module.css"
import Image from 'next/image'
import Link from 'next/link'

const projectmain = ({index, sliderIndex, item}) => {

  return (
    <div className={styles.content + " " + `${index == sliderIndex ? styles.appear : ""}`}>
                  <Image
                  src={item.imagesUrls[0]||"/images/benefits.png"}
                  width={700}
                  height={130}
                  alt="content"
                  />
                  <div className={styles.text}>
                    <h1>{item?.title}</h1>
                    <p>{item?.description?.substring(0, 80)}...</p>
                  </div>
                  <Link href={`/projects/${item?.id}`}>
                  <button className={styles.button}>View More</button>
                  </Link>
                </div>
  )
}

export default projectmain