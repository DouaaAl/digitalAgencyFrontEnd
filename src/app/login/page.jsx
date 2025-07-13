"use client"
import React, {useState} from 'react';
import styles from "./login.module.css";

const page = () => {
    const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: "POST",
        credentials: "include", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const errData = await res.json();
      }

      const user = await res.json();
      indow.location.href = "https://digital-agency-front-end-rosy.vercel.app/dashboard/statistics";
      setUsername("");
      setPassword("");
    } catch (err) {
      console.log(err);
      console.error(err);
    }
  };

  return (
    <>
        <form onSubmit={handleLogin} className={styles.form} action="">
            <label htmlFor="">Email: </label>
            <input value={username} onChange={(e)=>setUsername(e.target.value)} type="text" />
            <label htmlFor="">Password:</label>
            <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" />
            <button type='submit'>Login</button>
        </form>
    </>
  )
}

export default page