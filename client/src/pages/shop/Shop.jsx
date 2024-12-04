import React, { useState, useEffect, useCallback } from "react";
import CommonNav from "../../components/nav/common-nav/CommonNav";
import { useNavigate, useParams } from "react-router-dom";
import OfferNav from "../../components/offer-component/OfferNav";
import GetAllProducts from "../../components/get-all-products/GetAllProducts";
import CatetgorizedProducts from "./shop-page-content/CategorizedProducts";
import ProductsListing from "../../components/products-listing/ProductsListing";

function Shop() {
  const navigate = useNavigate();
  const params = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async() => {
      try {
        let auth_id = params.auth_id ? params.auth_id : "null";
        let user_type = params.user_type ? params.user_type : "null";
        let category = "null";
        let allProducts = await GetAllProducts(auth_id, category, user_type);
        setProducts(allProducts);
      } catch (error) {
        console.log("error : ",error);
      }
    }
    fetchProducts();
  },[params.auth_id, params.user_type]);

  console.log("products : ",products);

  return (
    <div>
        <OfferNav />
      <CommonNav />
        <CatetgorizedProducts />
      <div className="mx-auto max-w-2xl px-4 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
        <div className="text-2xl font-bold tracking-tight text-gray-900 pb-10">
          Explore Wellness Wagon
        </div>
        <ProductsListing products={products} />
      </div>
    </div>
  );
}

export default Shop;