"use client"
import React, { useEffect, useState } from 'react'
import styles from "./styles.module.css"

const page = () => {

  const [messages, setMessages] = useState([]);
    const [stats, setStats] = useState({ visits: 0, pageViews: 0 });
  

  const getMessages = async() =>{
    let data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contacts`);
    let res = await data.json();
    setMessages(res);
  }

  useEffect(()=>{
    getMessages();
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/analytics/track`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: window.location.pathname }),
    });

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/analytics/stats`)
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Failed to load stats:", err));
  }, [])


  return (
        <div className={styles.statistics}>
        <h1 className={styles.title}>Statistics</h1>
        <section className={styles.statisticsGrid}>
            <article>
                <h1>Messages</h1>
                <p>{messages.length}</p>
            </article>
            <article>
                <h1>Visits</h1>
                <p>{stats.visits}</p>
            </article>
            <article>
                <h1>Page views</h1>
                <p>{stats.pageViews}</p>
            </article>
        </section>
    </div>
  )
}

export default page