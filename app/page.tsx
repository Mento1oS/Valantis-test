/** @format */

import styles from "./page.module.css";
import { getDataRequest, getFilteredData } from "@/utils";
import { FilterProps, Product } from "@/types";
import { NavBar, ProductComponent, SearchBlock } from "@/components";

export default async function Home({
  searchParams,
}: {
  searchParams: FilterProps;
}) {
  const idsArray: string[] =
    Object.keys(searchParams).length === 0 ||
    (!searchParams.price && !searchParams.product && !searchParams.brand)
      ? await getDataRequest({
          action: "get_ids",
          params: {
            offset: searchParams.page
              ? 50 * (Number(searchParams.page) - 1)
              : 0,
            limit: 50,
          },
          retry: true,
        })
      : await getFilteredData({ searchParams });
  const productsArray: Product[] = await getDataRequest({
    action: "get_items",
    params: {
      ids: idsArray,
    },
    retry: true,
  });
  const isBackNavDisabled =
    !searchParams.page || String(searchParams.page) === "1";
  const isForwardNavDisabled = productsArray.length < 50;
  const isDataEmpty =
    !Array.isArray(productsArray) || productsArray.length < 1 || !productsArray;
  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <SearchBlock />
        <NavBar
          isBackNavDisabled={isBackNavDisabled}
          isForwardNavDisabled={isForwardNavDisabled}
        />
        <div className={styles.content__bar}>
          {!isDataEmpty
            ? productsArray
                .filter((value, index, self) => {
                  return self.findIndex((v) => v.id === value.id) === index;
                })
                .map((product) => {
                  return (
                    <ProductComponent
                      key={product.id}
                      id={product.id}
                      brand={product.brand}
                      price={product.price}
                      product={product.product}
                    />
                  );
                })
            : ""}
        </div>
      </div>
    </main>
  );
}
