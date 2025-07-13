"use client"
import React, { useEffect } from 'react'
import Image from 'next/image'
import styles from "./update.module.css"

const url = ({link, updatedItem, setUpdatedItem, index}) => {
  const removeItem = async()=>{
    let data = updatedItem;
    data = data?.links?.filter((item)=> item.Name != link.Name);
    setUpdatedItem((oldVal)=>{
      return {...oldVal, links: data}
    });
  }


  return (
    <div className={styles.link}>
      <h3>{link.Name}</h3>
      <h3>{link.url}</h3>
      <Image onClick={()=>removeItem()}   src={"/icons/close.png"}
      width={30}
      height={30}
      alt="close"
      />
    </div>
  )
}

export default url