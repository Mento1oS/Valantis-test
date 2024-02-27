/** @format */
"use client";
import React, { Fragment, useState } from "react";
import SearchFilter from "./SearchFilter";
import style from "../styles/SearchBlock.module.css";
import { useRouter } from "next/navigation";
import { FormProps } from "@/types";

const SearchBlock = () => {
  const [filterSearch, setFilterSearch] = useState({
    price: 0,
    brand: "",
    product: "",
  });
  const router = useRouter();
  const handleUpdateParams = () => {
    const queryArray: string[] = [];
    for (const key in filterSearch) {
      if (filterSearch[key as keyof FormProps]) {
        const elem = `${key}=${filterSearch[key as keyof FormProps]}`;
        queryArray.push(elem);
      }
    }
    if (queryArray.length) {
      const queryString = queryArray.join("&");
      router.push(`${window.location.pathname}?${queryString.toLowerCase()}`, {
        scroll: false,
      });
    } else {
      resetParams();
    }
  };
  const resetParams = () => {
    setFilterSearch({
      price: 0,
      brand: "",
      product: "",
    });
    router.push(window.location.pathname, { scroll: false });
  };
  return (
    <Fragment>
      <div className={style.filter__bar}>
        <SearchFilter
          setFilterSearch={setFilterSearch}
          filterSearch={filterSearch}
          title={"brand"}
          type={"text"}
        />
        <SearchFilter
          setFilterSearch={setFilterSearch}
          filterSearch={filterSearch}
          title={"product"}
          type={"text"}
        />
        <SearchFilter
          setFilterSearch={setFilterSearch}
          filterSearch={filterSearch}
          title={"price"}
          type={"number"}
        />
      </div>
      <div className={style.button_block}>
        <button onClick={handleUpdateParams} className={style.button}>
          Применить фильтры
        </button>

        <button onClick={resetParams} className={style.button}>
          Сбросить фильтры
        </button>
      </div>
    </Fragment>
  );
};

export default SearchBlock;
