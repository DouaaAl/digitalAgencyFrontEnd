"use client"
import React, { useEffect, useState } from 'react'
import styles from "./styles.module.css"
import Message from "./message"

const page = () => {
  const [messages, setMessages] = useState([]);
  const getMessages = async() =>{
    let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contacts`);
    let data = await res.json();
    setMessages(data);
  }
  useEffect(()=>{
    getMessages();
  }, [])
  return (
    <section className={styles.messages}>
      <h1 className={styles.title}>Messages</h1>
      <article className={styles.messagesGrid}>
        {
          messages?.map((item, i)=>{
            return <Message key={i} messages={messages} setMessages={setMessages} item={item} />
          })
        }
      </article>
    </section>
  )
}

export default page