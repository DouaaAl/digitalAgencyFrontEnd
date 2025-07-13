"use client"
import React, {useState} from 'react'
import styles from "./styles.module.css"
import Image from 'next/image'

const ProjectImage = ({link}) => {
  const [appear, setAppear] = useState(false);
  return (
    <div>
        <Image onClick={()=>setAppear(true)} src={link} width={50} height={50} alt="image" />
          {
            appear && <article className={styles.article}>
          <Image
          src={link}
          height={800}
          width={900}
          alt="bigger image" /> 
          <button onClick={()=>setAppear(false)}>Hide</button>
        </article>
          }
          
        
        
    </div>
  )
}

export default ProjectImage