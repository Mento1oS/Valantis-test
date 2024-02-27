/** @format */
"use client";
import React from "react";
import style from "../styles/SearchFilter.module.css";
import { FormProps } from "@/types";

const SearchFilter = ({
  title,
  type,
  filterSearch,
  setFilterSearch,
}: {
  title: string;
  type: string;
  filterSearch: FormProps;
  setFilterSearch: React.Dispatch<
    React.SetStateAction<{
      price: number;
      brand: string;
      product: string;
    }>
  >;
}) => {
  return (
    <div className={style.container}>
      <div className={style.title}>{title}</div>
      <input
        className={style.input}
        value={filterSearch[title as keyof FormProps]}
        onChange={(e) =>
          setFilterSearch({ ...filterSearch, [title]: e.target.value })
        }
        type={type}
      />
    </div>
  );
};

export default SearchFilter;
