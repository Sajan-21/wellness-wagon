import React, { useState, useEffect, useCallback, useMemo } from "react";
import CommonNav from "../../components/nav/common-nav/CommonNav";
import { useParams } from "react-router-dom";
import OfferNav from "../../components/offer-component/OfferNav";
import GetAllProducts from "../../components/get-all-products/GetAllProducts";
import CatetgorizedProducts from "./shop-page-content/CategorizedProducts";
import ProductsListing from "../../components/products-listing/ProductsListing";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Footer from "../../components/footer/Footer"

function Shop() {
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let auth_id = params.auth_id ? params.auth_id : "null";
        let user_type = params.user_type ? params.user_type : "null";
        let category = "null";
        let allProducts = await GetAllProducts(auth_id, category, user_type);
        setProducts(allProducts);
      } catch (error) {
        console.log("error : ", error);
      }
    };
    fetchProducts();
  }, [params.auth_id, params.user_type]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch = product.category?.toLowerCase().includes(searchTerm.toLowerCase());
      const nameMatch = product.name?.toLowerCase().includes(searchTerm.toLowerCase());
      return categoryMatch || nameMatch; // Match either category or name
    });
  }, [searchTerm, products]);
  
  console.log("filteredProducts : ",filteredProducts);

  return (
    <div className="bg-slate-200">
      <OfferNav />
      <CommonNav />
      <div className="bg-white py-2 px-5 flex gap-2 items-center justify-end w-1/2 mx-auto rounded-full my-5">
        <FontAwesomeIcon icon={faSearch} />
        <input type="search" placeholder="search products" className="outline-none w-full px-3 py-2" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>
      <CatetgorizedProducts />
      <ProductsListing products={filteredProducts} heading={"Explore Wellness Wagon"} />
      <Footer />
    </div>
  );
}

export default Shop;