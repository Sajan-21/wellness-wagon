import React, { useEffect, useState } from "react";
import GetAllProducts from "../../../components/get-all-products/GetAllProducts";
import { useParams } from "react-router-dom";
import ProductsListing from "../../../components/products-listing/ProductsListing";

function NewArrivals() {
  const params = useParams();
  const [products, setProducts] = useState([]);
  const auth_id = params.auth_id || "null";
  const user_type = params.user_type || "null";
  const category = "null";

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const allProducts = await GetAllProducts(auth_id, category, user_type);
        setProducts(allProducts.slice(-8));
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };
    fetchAllProducts();
  }, [auth_id, category, user_type]);

  console.log("Products:", products);

  return (
    <div>
      <ProductsListing products={products} heading={"New Arrivals"} />
    </div>
  );
}

export default NewArrivals;