/** @format */
"use client";
import React from "react";
import style from "../styles/NavBar.module.css";
import { useRouter } from "next/navigation";
import { updateSearchParams } from "@/utils";
const NavBar = ({
  isBackNavDisabled,
  isForwardNavDisabled,
}: {
  isBackNavDisabled: boolean;
  isForwardNavDisabled: boolean;
}) => {
  const router = useRouter();
  const navBack = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const page = Number(searchParams.get("page")) - 1;
    searchParams.set("page", page.toString());
    const newPathname = `${
      window.location.pathname
    }?${searchParams.toString()}`;
    router.push(newPathname, { scroll: false });
  };
  const navForward = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const page = searchParams.get("page")
      ? Number(searchParams.get("page")) + 1
      : 2;
    searchParams.set("page", page.toString());
    const newPathname = `${
      window.location.pathname
    }?${searchParams.toString()}`;
    router.push(newPathname, { scroll: false });
  };
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        {!isBackNavDisabled && (
          <div className={style.button_back_container}>
            <button
              onClick={navBack}
              className={`${style.button_back} ${style.button}`}
            >
              ←
            </button>
          </div>
        )}
        {!isForwardNavDisabled && (
          <div className={style.button_forward_container}>
            <button
              onClick={navForward}
              className={`${style.button_forward} ${style.button}`}
            >
              →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
