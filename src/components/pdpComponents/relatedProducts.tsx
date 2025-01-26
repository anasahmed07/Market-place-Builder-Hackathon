import { TypeProduct } from "@/lib/types";
import { fetchproducts } from "@/lib/utils";
import { useEffect, useState } from "react";
import ProductCardGroup from "../productCardGroup";

export default function RelatedProducts() {

    const [relatedProducts, setRelatedProducts] = useState<TypeProduct[]>([]);
    useEffect(() => {
      const getRelatedProducts = async () => {
        const relatedProducts: TypeProduct[] = await fetchproducts();
        setRelatedProducts(
          relatedProducts.sort(() => 0.5 - Math.random()).slice(0, 4)
        );
      };
      getRelatedProducts();
    }, []);

  return (
    <ProductCardGroup products={relatedProducts} title="You Might Also Like" />
  );
}
