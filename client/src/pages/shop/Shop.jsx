import React, { useState, useEffect } from "react";
import "./shop.css";
import ShopNav from "../../components/navbar/ShopNav";
import CategoryFilter from "../../components/Category-filter/CategoryFilter";
import GetAllProducts from "../../components/getAllProducts/GetAllProducts";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faHeart } from "@fortawesome/free-solid-svg-icons";
import ProductOverview from "../Overview/ProductOverview";

function Shop() {
  const navigate = useNavigate();
  const params = useParams();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const auth_id = params.auth_id || "null";
        const user_type = params.user_type || "null";

        const result = await GetAllProducts({
          auth_id,
          category: "null",
          user_type,
        });
        setProducts(result);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  console.log("all products : ", products);

  return (
    <div>
      <p className="flex h-10 items-center justify-center bg-white px-4 text-sm font-medium text-slate-600 sm:px-6 lg:px-8">
        Get free delivery on orders over $100
      </p>
      <ShopNav />
      <CategoryFilter />
      <div className="mx-auto max-w-2xl px-4 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
        <div className="text-2xl font-bold tracking-tight text-gray-900 pb-10">
          Explore Wellness Wagon
        </div>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="group p-5"
              onClick={() =>
                params.auth_id
                  ? navigate(
                      `/product-overview/${params.auth_id}/${product._id}/${params.user_type}`
                    )
                  : navigate(`/product-overview/${product._id}/${params.user_type}`)
              }
            >
              <img
                alt={product.imageAlt}
                src={product.images[0]}
                className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-[7/8]"
              />
              <h3 className="mt-4 text-md font-bold text-gray-700">
                {product.name}
              </h3>
              <h4>{product.category}</h4>
              <div className="flex justify-between items-center">
                <p className="mt-1 text-lg font-medium text-gray-900">
                  {product.price}
                </p>
                <div className=" flex gap-3">
                  <button className="hover:border-yellow-600 hover:text-yellow-600 rounded-full border px-4 py-2">
                    <FontAwesomeIcon
                      icon={faCartShopping}
                      className="text-xl"
                    />
                  </button>
                  <button className="hover:border-red-600 hover:text-red-600 rounded-full border px-4 py-2">
                    <FontAwesomeIcon icon={faHeart} className="text-xl" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Shop;
