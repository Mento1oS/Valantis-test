/** @format */

import React from "react";
import style from "../styles/Header.module.css";
import Image from "next/image";

const Header = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <Image
          className={style.image}
          src="/ring.png"
          alt="кольцо"
          width={200}
          height={103.2}
        />
        <h1 className={style.title}>Царство колец</h1>
      </div>
    </div>
  );
};

export default Header;
