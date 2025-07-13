"use client"
import React from 'react'
import styles from "./styles.module.css"

const message = ({item, messages, setMessages}) => {
    const deleteItem = async() =>{
   try {
       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contacts`, {
 method: 'DELETE',
    });
    
   } catch (error) {
    console.log(error);
    console.error(error); 
   }
    let newArray = messages.filter((messageItem)=> messageItem !=item);
    setMessages(newArray);
    }
  return (
    <div className={styles.message}>
            <h1>{item.name} {item.lastName}</h1>
            <h2>Email: {item.email}</h2>
            <h2>Phone Number: {item.phone}</h2>
            <h2>Message:</h2>
            <p>{item.message}</p>
            <div className={styles.messageServices}>
                {
                    item?.services.map((service, i)=>{
                        return <span key={i}>{service}</span>
                    })
                }
            </div>
            <h2>Date: {(new Date(item?.updatedAt).getMonth() + 1).toString().padStart(2, '0') + '/' +
 new Date(item?.updatedAt).getDate().toString().padStart(2, '0') + '/' +
 new Date(item?.updatedAt).getFullYear() + ' ' +
 new Date(item?.updatedAt).getHours().toString().padStart(2, '0') + ':' +
 new Date(item?.updatedAt).getMinutes().toString().padStart(2, '0') + ':' +
 new Date(item?.updatedAt).getSeconds().toString().padStart(2, '0')}</h2>
<button onClick={()=>deleteItem()} className={styles.delete}>Delete</button>
        </div>
  )
}

export default message