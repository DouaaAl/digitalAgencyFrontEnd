"use client"
import React, { useEffect, useState } from 'react'
import styles from "./styles.module.css";
import Image from 'next/image';
import Project from "@/app/components/projectcategory/app";

const page = () => {
  const [data, setData] = useState();

  const getData = async() =>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`);
    const datares = await res.json();
    let filter = datares.filter((item)=> item.category == "graphic");
    setData(filter)
  }

  useEffect(()=>{
    getData();
  }, [])


  return (
    <main className={styles.main}>
      <section className={styles.header}>
      </section>
      <section className={styles.benefits}>
        <h4><strong>Benifits</strong></h4>
        <div className={styles.benefitsGrid}>
          <article >
            <Image
            src={"/images/Web.png"}
            height={105}
            width={105}
            alt='benifits'
            />
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit itaque reprehenderit, rerum distinctio provident libero.</p>
          </article>
          <article>
            <Image
            src={"/images/Web.png"}
            height={105}
            width={105}
            alt='benifits'
            />
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit itaque reprehenderit, rerum distinctio provident libero.</p>
          </article>
          <article>
            <Image
            src={"/images/Web.png"}
            height={105}
            width={105}
            alt='benifits'
            />
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit itaque reprehenderit, rerum distinctio provident libero.</p>
          </article>
        </div>
      </section>

      {/*********** Portfolio **********/}
      <section className={styles.portfolio}>
        <h4><strong>Portfolio</strong></h4>
        <div className={styles.portfolioGrid}>
          {
            data?.map((item)=>{
              return <Project key={item.id} item={item} />
            })
          }
        </div>
      </section>

      {/********* SUBSCRIPTIONS  **********/}
      <section className={styles.subscriptions}>
        <article>
          <h1><strong>$</strong>200</h1>
          <div className={styles.features}>
            <span>
              <Image
              src={"/icons/check.png"}
              height={40}
              width={40}
              alt='check'
              />
            <p>Lorem ipsum dolor sit amet.</p>
            </span>
            <span>
              <Image
              src={"/icons/check.png"}
              height={40}
              width={40}
              alt='check'
              />
            <p>Lorem ipsum dolor sit amet.</p>
            </span>
            <span>
              <Image
              src={"/icons/check.png"}
              height={40}
              width={40}
              alt='check'
              />
            <p>Lorem ipsum dolor sit amet.</p>
            </span>
          </div>
          <button>Contact Us</button>
        </article>
                <article>
          <h1><strong>$</strong>200</h1>
          <div className={styles.features}>
            <span>
              <Image
              src={"/icons/check.png"}
              height={40}
              width={40}
              alt='check'
              />
            <p>Lorem ipsum dolor sit amet.</p>
            </span>
            <span>
              <Image
              src={"/icons/check.png"}
              height={40}
              width={40}
              alt='check'
              />
            <p>Lorem ipsum dolor sit amet.</p>
            </span>
            <span>
              <Image
              src={"/icons/check.png"}
              height={40}
              width={40}
              alt='check'
              />
            <p>Lorem ipsum dolor sit amet.</p>
            </span>
          </div>
          <button>Contact Us</button>
        </article>
                <article>
          <h1><strong>$</strong>200</h1>
          <div className={styles.features}>
            <span>
              <Image
              src={"/icons/check.png"}
              height={40}
              width={40}
              alt='check'
              />
            <p>Lorem ipsum dolor sit amet.</p>
            </span>
            <span>
              <Image
              src={"/icons/check.png"}
              height={40}
              width={40}
              alt='check'
              />
            <p>Lorem ipsum dolor sit amet.</p>
            </span>
            <span>
              <Image
              src={"/icons/check.png"}
              height={40}
              width={40}
              alt='check'
              />
            <p>Lorem ipsum dolor sit amet.</p>
            </span>
          </div>
          <button>Contact Us</button>
        </article>
      </section>
    </main>
  )
}

export default page