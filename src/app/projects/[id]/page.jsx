"use client"
import React, { useEffect, useState } from 'react'
import styles from "./styles.module.css"
import Image from 'next/image'
import { useParams } from 'next/navigation';
import ProjectImage from '@/app/components/projectImage/ProjectImage';

const page = () => {

  const params = useParams();
  const [id, setId] = useState(params?.id);
  const [item, setItem] = useState();

  const getItem = async() =>{
    if(id){
      const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`)
      const res = await data.json();
      setItem(res);
    }
  }

  useEffect(()=>{
    getItem();
  },[id])

  return (
    <section className={styles.project}>
      <Image className={styles.mainImage} width={2000} height={500} alt='half' src={item?.imagesUrls[0]|| '/images/header1.png'} />
      <h1>{item?.title}</h1>
      <p>{item?.description}</p>
      <h3>Links:</h3>
      <div className={styles.linkDiv}>
      {
        item?.links?.map((link)=>{
          return <a key={link.url} href={link.url}>{link.Name}</a>
        })
      }

      </div>
      <h3>Images</h3>
      <div className={styles.imageFlex}>
        {
          item?.imagesUrls?.map((image, i)=>{
            if(i > 0){
              
              return <ProjectImage key={image} link={image} />
            }
            else{
              return ""
            }
          })
        }
      </div>
    </section>
  )
}

export default page