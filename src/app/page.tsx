"use client"
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import Mainproject from "@/app/components/projectmain/projectmain";

export default function Home() {
  const [index, setIndex] = useState(0);
  const [data, setData] = useState([{
    name: "name1",
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, nemo. Lorem ipsum dolor sit amet.",
  }, {
    name: "name2",
    content:`Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, nemo. Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, nemo. Lorem ipsum dolor sit amet.`
  }]);

  const addSlider = () =>{
    if (index >= data?.length -1){
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
    console.log("add slider");
  }

  const minusSlider = () =>{
    if(index <= 0){
      setIndex(data?.length -1);
    } else{
      setIndex(index - 1);
    }
    console.log("remove slider");
  }

  const getData = async()=>{
    try {
      let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`);
      let datares = await res.json();
      setData(datares);      
    } catch (error) {
      console.error(error)
      console.log(error);
    }

  }

  useEffect(()=>{
    getData();
  }, [])


  return (
    <div className={styles.body}>
      <main className={styles.main}>
        <div className={styles.gradient}></div>
        <video className={styles.video} muted autoPlay loop src="/main.mp4"></video>
      </main>
      {/***********  BENEFIT ************/}
      <section className={styles.benefit}>
        <div className={styles.image}>
          <Image
          src={"/images/roses/bigrose.png"}
            height={252}
            width={408}
            alt="rose"
          />
          <Image className={styles.minirose}
          src={"/images/roses/smallrose.png"}
            height={140.62}
            width={74.5}
            alt="small rose"
          />
          <Image className={styles.minirose}
          src={"/images/roses/smallrose.png"}
            height={140.62}
            width={74.5}
            alt="small rose"
          />
          <Image className={styles.minirose}
          src={"/images/roses/midrose.png"}
          width={209.4}
          height={227.13}
          alt="midrose"
          />
        </div>
        <div className={styles.text}>
          <h1>How would we benefit you</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing <br />
            elit, sed do eiusmod tempor incididunt
            ut labore et dolore <br /> magna aliqua. Ut enim 
            ad minim veniam, quis nostrud exercitation <br /> ullamco laboris nisi
            ut aliquip ex ea commodo consequat. 
          </p>
        </div>
      </section>
      {/***********  PROJECTS ************/}
      <section className={styles.projects}>
        <h4><strong>PROJECTS</strong></h4>
        <div className={styles.animation}>
          <p>CREATIVITY POWERED BY LOGIC</p>
          <p>CREATIVITY POWERED BY LOGIC</p>
        </div>
        <article className={styles.slider}>
          <div className={styles.arrows}>
              <Image
              onClick={()=> minusSlider()}
              src={"/icons/left.png"}
              height={50}
              width={70}
              alt="digital agency"/>
                            <Image
                            onClick={()=> addSlider()}
              src={"/icons/right.png"}
              height={50}
              width={70}
              alt="digital agency"/>
          </div>
          <div className={styles.box}>
            {
              data.map((item: any, SlideIndex: number)=>{
                return              <Mainproject key={SlideIndex} index={index} sliderIndex={SlideIndex} item={data[SlideIndex]} />
        
              })
            }
          </div>
        </article>
      </section>
      {/****************** Services *******************/}

      <section className={styles.services}>
        <h4><strong>Services</strong></h4>
        <div className={styles.animation}>
          <p>CREATIVITY POWERED BY LOGIC</p>
          <p>CREATIVITY POWERED BY LOGIC</p>
        </div>
        <article className={styles.servicesGrid}>
          <div>
            <Image
            src={"/images/services/copy.png"}
            width={80}
            height={80}
            alt="copy"
            />
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam totam quisquam eos fugit atque, quibusdam deleniti eaque. Nulla cupiditate adipisci deserunt voluptates minus, odit aliquid. Consequuntur consequatur accusantium aspernatur rem.</p>
          </div>
            <div>
                          <Image
            src={"/images/services/montage.png"}
            width={80}
            height={80}
            alt="montage"
            />
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam totam quisquam eos fugit atque, quibusdam deleniti eaque. Nulla cupiditate adipisci deserunt voluptates minus, odit aliquid. Consequuntur consequatur accusantium aspernatur rem.</p>
            </div>
          <div>
                        <Image
            src={"/images/services/service.png"}
            width={80}
            height={80}
            alt="service"
            />
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam totam quisquam eos fugit atque, quibusdam deleniti eaque. Nulla cupiditate adipisci deserunt voluptates minus, odit aliquid. Consequuntur consequatur accusantium aspernatur rem.</p>
            
          </div>
          <div>
                        <Image
            src={"/images/services/web.png"}
            width={80}
            height={80}
            alt="web"
            />
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam totam quisquam eos fugit atque, quibusdam deleniti eaque. Nulla cupiditate adipisci deserunt voluptates minus, odit aliquid. Consequuntur consequatur accusantium aspernatur rem.</p>
          </div>
        </article>
      </section>

      {/************* CONTACT *************/ }
      <section className={styles.contact}>
        <h1>CAN WE TURN IDEAS INTO IMPACT</h1>
        <button>CONTACT US</button>
      </section>
    </div>
  );
}
