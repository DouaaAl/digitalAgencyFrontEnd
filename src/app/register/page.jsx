"use client"
import React, {useState, useEffect} from 'react'
import styles from "./register.module.css"

const page = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

 const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);

    try {
         const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
      method: "POST",
      credentials: "include", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      const user = await res.json();
      window.location.href = '/dashboard/statistics';
      setUsername("");
      setPassword("");
    } else {
      const err = await res.json();
      setError(err.message || "Registration failed");
    }
  

    } catch (error) {
    console.log(error);
    console.error(error);   
    }
  }
  return (
        <>
        <form onSubmit={handleRegister} className={styles.form} action="">
            <label htmlFor="">Email: </label>
            <input value={username} onChange={(e)=> setUsername(e.target.value)} type="text" />
            <label htmlFor="">Password:</label>
            <input value={password} onChange={(e)=> setPassword(e.target.value)} type="password" />
            <button>Register</button>
        </form>
    </>
  )
}

export default page