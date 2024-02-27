/** @format */

import style from "../styles/Footer.module.css";
import React from "react";

const Footer = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.text}>Все права защищены &copy;</div>
        <div className={style.text}>Политика безопасности</div>
      </div>
    </div>
  );
};

export default Footer;
