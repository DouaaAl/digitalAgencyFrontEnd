import React from 'react'
import Image from 'next/image'
import styles from "./footer.module.css"

const footer = () => {
  return (
    <>
    <footer className={styles.footer}>
      <article className={styles.footerTop}>
        <h1>LOGO</h1>
        <nav>
          <li><a href="#">Contact Us</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">Portfolio</a></li>
          <li><a href="#">FAQs</a></li>
        </nav>
      </article>
      <article className={styles.footerBottom}>
        <div>
          <h1>About Us</h1>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione, velit. Minima, ipsum. Nisi, cumque magnam. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa accusamus tempora optio?</p>
        </div>
        <div className={styles.contact}>
          <h1>Contact Us</h1>
          <ul>
            <li>
              <Image
              src={"/icons/phone.png"}
              height={30}
              width={30}
              alt="phone"
              ></Image>
              <p>+212 611211738</p>
            </li>
            <li>
              <Image
              src={"/icons/email.png"}
              height={30}
              width={30}
              alt="email"
              ></Image>              <p>douaa@gmail.com</p>
            </li>
          </ul>
        </div>
      </article>
    </footer>
    </>
  )
}

export default footer