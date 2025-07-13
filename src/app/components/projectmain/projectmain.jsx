"use client"
import React, {useState} from 'react'
import styles from "./style.module.css"
import Image from 'next/image'
import Link from 'next/link'

const projectmain = ({ index, sliderIndex, item }) => {
  const [image, setImage] = useState(
    Array.isArray(item?.imagesUrls) &&
    item.imagesUrls.length > 0 &&
    item.imagesUrls[0] !== "" &&
    isNaN(item.imagesUrls)
      ? item.imagesUrls[0]
      : "/images/benifits.png"
  );

  return (
    <div className={styles.content + " " + (index === sliderIndex ? styles.appear : "")}>
      <Image src={image} width={700} height={130} alt="content" />
      <div className={styles.text}>
        <h1>{item?.title}</h1>
        <p>{item?.description?.substring(0, 80)}...</p>
      </div>
      <Link href={`/projects/${item?.id}`}>
        <button className={styles.button}>View More</button>
      </Link>
    </div>
  );
};

export default projectmain;