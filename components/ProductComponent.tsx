/** @format */

import { Product } from "@/types";
import React from "react";
import style from "../styles/ProductComponent.module.css";
const ProductComponent = ({ id, brand, product, price }: Product) => {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.flex_block}>
          <div className={style.name}>{product}</div>
        </div>
        <div className={style.flex_block}>
          <div className={style.brand}>{brand && `Бренд: ${brand}`}</div>
          <div className={style.price}>Цена: {price}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductComponent;
