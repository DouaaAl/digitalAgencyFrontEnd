"use client"
import React, { useEffect, useState } from 'react'
import Project from "./project.jsx"
import Image from 'next/image'
import styles from "./styles.module.css"


const page = () => {
    const [projects, setProjects] = useState([]);
    
    const getProjects = async() =>{
        const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`);
        const res = await data.json();
        setProjects(res);
    }


  const createProject = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: 'My Awesome Project',
          description: 'This is a demo description for the dummy project.',
          category: 'web',
          imagesUrls: ['https://example.com/image.jpg'],
          links: [{"Name": 'react', url: "www.test.com"}]
        })
      });

      const newPost = await res.json();
       window.location.href = `/projects/update/${newPost.id}`;
    } catch (err) {
      console.error('Error:', err);
    }
  };

    useEffect(()=>{
        getProjects();
    }, [])
  return (
    <section className={styles.projects}>
        <h1 className={styles.title}>Projects</h1>
        <div>
            <article className={styles.buttonWrap}>
                <button className={styles.addButton} onClick={()=>createProject()}>Add Project</button>
            </article>
            <article className={styles.projectsGrid}>
                {
                    projects.map((item, i)=>{
                        return <Project key={i} projects={projects} setProjects={setProjects} item={item} />
                    })
                }
            </article>
        </div>
    </section>
  )
}

export default page