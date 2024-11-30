import React, { useState, useEffect } from "react";
import GetAllProducts from "../getAllProducts/GetAllProducts";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping,faHeart } from "@fortawesome/free-solid-svg-icons";

function NewArrivals() {
  const params = useParams();
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      if(params.auth_id){
        const auth_id = params.auth_id;
        const user_type = params.user_type;
        const result = await GetAllProducts({auth_id : auth_id, category: "null", user_type: user_type });
        setAllProducts(result);
      }else{
        const result = await GetAllProducts({auth_id : "null", category: "null", user_type: "null" });
        setAllProducts(result);
      }
    };

    fetchProducts();
  }, []);
  const products = allProducts.slice(-4);

  return (
    <div>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              New Arrivals
            </h2>
            <Link to={params.auth_id ? `/shop/${params.auth_id}/${params.user_type}` : `/shop/${params.auth_id}/${params.user_type}` } >see more</Link>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((item) => (
              <div className="group relative p-5" key={item._id} onClick={() => params.auth_id ? navigate(`/product-overview/${params.auth_id}/${item._id}/${params.user_type}`) : navigate(`/product-overview/${item._id}/${params.user_type}`) }>
                <img
                  src={item.images?.[1] || "placeholder.jpg"}
                  alt={item.name || "Product image"}
                  className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                />
                <h3 className="mt-4 text-md font-bold text-gray-700">
                {item.name}
              </h3>
              <h4>{item.category}</h4>
              <div className="flex justify-between items-center">
                <p className="mt-1 text-lg font-medium text-gray-900">
                  {item.price}
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
    </div>
  );
}

export default NewArrivals;
