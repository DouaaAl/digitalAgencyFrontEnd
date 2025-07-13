"use client"
import React from 'react'
import styles from "./styles.module.css"
import Link from 'next/link'
import Image from 'next/image'

const Project = ({item, setProjects, projects}) => {
  
  const deleteItem = async() =>{
    let newarray = projects.filter((project)=>{
      return project.id != item.id
    });
    setProjects(newarray);
    let deleteItem = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${item.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }});
  }


  return (
    <div  className={styles.content }>
                  <Image
                  src={ item.imagesUrls[0]|| "/images/benefits.png"}
                  width={700}
                  height={130}
                  alt="content"
                  />
                  <div className={styles.text}>
                    <h1>{item.title}</h1>
                    <p>{item.description.substring(0, 100)}...</p>
                  </div>
                  <Link href={`/projects/${item.id}`}>
                  <button className={styles.button}>Edit</button>
                  </Link>
                  <button onClick={()=> deleteItem()} className={styles.delete}>Delete</button>
                </div>
  )
}

export default Project