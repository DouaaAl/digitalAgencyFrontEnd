"use client"
import React, {useState} from 'react'
import Image from 'next/image'
import styles from "./contact.module.css"

const page = () => {

    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    services: []
  });

  const changedCheckBox = (e) =>{
    const { checked, value } = e.target;
                if(checked){
                    setFormData((oldVal)=>{
                        return {...oldVal, services: [...oldVal.services, value]};
                    })
                } else{
                    let newServices = formData.services;
                    newServices = newServices.filter((item)=> item != value);
                    setFormData((oldVal)=>{
                        return {...oldVal, services: newServices};
                    })
                }
  }

  const sendMessage = async(e) =>{
    e.preventDefault();
    setSuccess(false);
       try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      console.log("Submitted:", data);
      setSuccess(true);
      setTimeout(()=>{setSuccess(false)}, 5000)
    } catch (error) {
      console.error("Submit error:", error);
    }
  }

  return (
    <>
    <main className={styles.contact}>
        <form onSubmit={sendMessage} action="">
            <div>
                <span>
                    <label htmlFor="">First Name</label>
                    <input onChange={(e)=>{
                        setFormData((oldVal)=>{
                            return {...oldVal, name: e.target.value}
                        })
                    }} value={formData.name} type="text" />
                </span>
                <span>
                    <label htmlFor="">Last Name</label>
                    <input onChange={(e)=>{
                        setFormData((oldVal)=>{
                            return {...oldVal, lastName: e.target.value}
                        })
                    }} value={formData.lastName} type="text" />
                </span>
            </div>
            <span>
                <label htmlFor="">Email</label>
                <input onChange={(e)=>{
                        setFormData((oldVal)=>{
                            return {...oldVal, email: e.target.value}
                        })
                    }} value={formData.email} type="text" />
            </span>
            <span>
                <label htmlFor="">Phone Number</label>
                <input onChange={(e)=>{
                        setFormData((oldVal)=>{
                            return {...oldVal, phone: e.target.value}
                        })
                    }} value={formData.phone} type="text" />
            </span>
            <span>
                <label htmlFor="">Message</label>
                <textarea onChange={(e)=>{
                        setFormData((oldVal)=>{
                            return {...oldVal, message: e.target.value}
                        })
                    }} value={formData.message} name="" id=""></textarea>
            </span>
            <h1>Services</h1>
            <div className={styles.checkboxes}>
            <h4>
                <input onChange={(e)=>{
                    changedCheckBox(e);
                }}   type="checkbox" value={"copy"} name="" id="" />
                CopyWrite
            </h4>
            <h4>
                <input onChange={(e)=>{
                    changedCheckBox(e);
                }} type="checkbox" value={"web"} name="" id="" />
                Web Developement
            </h4>            <h4>
                <input onChange={(e)=>{
                    changedCheckBox(e);
                }} type="checkbox" value={"graphic"} name="" id="" />
                Graphic Design
            </h4> 
            </div>
            <button>Send Message</button>
            {
                success && <h1 className={styles.submitMessage}>Message Submitted</h1>
            }
            
        </form>
        <div></div>
        <article>
            <h1>Call Us</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta atque ipsa neque quaerat, sequi ab.</p>
            <div>
                <Image
                width={45}
                height={45}
                src={"/icons/phone.png"}
                alt='call Us'
                />
                <h3>+212 611211738</h3>
            </div>
            <h1>Chat with Us</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta atque ipsa neque quaerat, sequi ab.</p>
            <div>
                <Image
                width={45}
                height={45}
                src={"/icons/instagram.png"}
                alt='call Us'
                />
                <h3>www.instagram.com</h3>
            </div>
        </article>
    </main>
    </>
  )
}

export default page