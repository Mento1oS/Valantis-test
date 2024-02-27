/** @format */

import { PASSWORD } from "@/constants";
import { FilterProps, RequestProps } from "@/types";
const md5 = require("md5");
const getTodayTimeStamp = () => {
  const date = new Date();
  const timestamp: string = date
    .toLocaleDateString("ru-RU", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "long",
    })
    .split(",")[0]
    .split(".")
    .reverse()
    .join("");
  return timestamp;
};
export async function getDataRequest({ params, action, retry }: RequestProps) {
  const timestamp = getTodayTimeStamp();
  const request = await fetch("https://api.valantis.store:41000/", {
    method: "POST",
    body: JSON.stringify({
      action: action,
      params: params,
    }),
    headers: {
      "X-Auth": md5(`${PASSWORD}_${timestamp}`),
      "content-type": "application/json",
    },
  });
  if (request.ok) {
    const data = await request.json();
    return data.result;
  } else {
    if (retry) {
      console.log("ошибка:", request.status);
      return await getDataRequest({
        params: params,
        action: action,
        retry: false,
      });
    } else {
      return [];
    }
  }
}
export const updateSearchParams = (type: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set(type, value);
  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;
  return newPathname;
};

const capitalizeString = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
export async function getFilteredData({
  searchParams,
}: {
  searchParams: FilterProps;
}) {
  const array: string[] = [];
  for (const key in searchParams) {
    if (key === "page") continue;
    const freshFetched: string[] = await getDataRequest({
      action: "filter",
      params: {
        [key]:
          key === "price"
            ? Number(searchParams[key as keyof FilterProps])
            : capitalizeString(String(searchParams[key as keyof FilterProps])),
      },
      retry: true,
    });
    if (!freshFetched.length) return [];
    if (!array.length) {
      array.push(...freshFetched);
    } else {
      const newArray: string[] = array.filter((value) =>
        freshFetched.includes(value)
      );
      array.splice(0, array.length, ...newArray);
    }
  }
  if (array.length > 50) {
    if (searchParams.page) {
      const page = Number(searchParams.page);
      if (array.length > 50 * page) {
        return array.slice(50 * (page - 1), page * 50);
      } else {
        const newLength = 50 * page - array.length;
        return array.slice(50 * (page - 1), 50 * (page - 1) + newLength);
      }
    } else {
      return array.slice(0, 50);
    }
  } else {
    return array;
  }
}
