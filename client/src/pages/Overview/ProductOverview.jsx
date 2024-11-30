import React, { useEffect, useState } from "react";
import GetProduct from "../../components/getProduct/GetProduct";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faHeart } from "@fortawesome/free-solid-svg-icons";
import GetAllProducts from "../../components/getAllProducts/GetAllProducts";
import { useParams, useNavigate } from "react-router-dom";

function ProductOverview() {
  const [similarProducts, setSimilarProducts] = useState([]);
  const navigate = useNavigate();
  const params = useParams();
  
  // Use the custom hook to fetch the product
  const { product } = GetProduct();

  useEffect(() => {
    const fetchSimilarProducts = async () => {
      try {
        const auth_id = params.auth_id || "null";
        const user_type = params.user_type || "null";
        const category = product.category;
        const result = await GetAllProducts({ auth_id, category, user_type });
        setSimilarProducts(result);
        console.log("similar products : ",similarProducts);
      } catch (error) {
        console.error("Error fetching similar products:", error);
      }
    };

    if (product) {
      fetchSimilarProducts(); // Fetch similar products only after the product is fetched
    }
  }, [product, params.auth_id, params.user_type]);

  if (!product) {
    return <div>Loading product...</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-2 max-md:grid-cols-1">
        <div className="grid grid-cols-2">
        <div className="p-5 max-md:p-2">
            <img className="rounded-lg" src={product.images[0]} alt="" />
          </div>
          <div className="p-5 max-md:p-2">
            <img className="rounded-lg" src={product.images[0]} alt="" />
          </div>
          <div className="p-5 max-md:p-2">
            <img className="rounded-lg" src={product.images[0]} alt="" />
          </div>
          <div className="p-5 max-md:p-2">
            <img className="rounded-lg" src={product.images[0]} alt="" />
          </div>
        </div>
        <div>
          <div className="p-5 grid grid-cols-2 max-sm:grid-cols-1 max-md:p-3 border">
            <div className="border py-3">
              <div className="text-2xl font-semibold">{product.name}</div>
              <div>{product.description}</div>
              <div className="text-lg">{product.category}</div>
              <div className="text-xl text-red-500">
                {product.price_currency === "$"
                  ? `${product.price}`
                  : `INR ${product.price}`}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-5 max-sm:flex max-sm:justify-between p-3 ">
              <button className="border w-1/2 mx-auto px-4 py-2 rounded-full">
                <FontAwesomeIcon icon={faHeart} className="text-xl" />
              </button>
              <button className="border w-1/2 mx-auto px-4 py-2 rounded-full">
                <FontAwesomeIcon icon={faCartShopping} className="text-xl" />
              </button>
              <button className="border w-1/2 mx-auto px-4 py-2 rounded-full">BUY</button>
            </div>
          </div>
          <div className="p-5 max-md:p-2 border">
            <div className="text-xl">About {product.name}</div>
            <div className="border py-4">
              {product.special_feature || "No additional details available."}
            </div>
          </div>
        </div>
      </div>
      <div id="similar_products">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
          <div className="text-2xl font-bold tracking-tight text-gray-900 pb-10">
            Similar Products
          </div>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {similarProducts.map((similarProduct) => (
              <div
                key={similarProduct._id}
                className="group p-5"
                onClick={() => navigate( params.auth_id ? `/product-overview/${params.auth_id}/${params.product_id}` : `/product-overview/${params.product_id}` ) } >
                <img
                  alt={similarProduct.imageAlt}
                  src={similarProduct.images[0]}
                  className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-[7/8]"
                />
                <h3 className="mt-4 text-md font-bold text-gray-700">
                  {similarProduct.name}
                </h3>
                <h4>{similarProduct.category}</h4>
                <div className="flex justify-between items-center">
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    {similarProduct.price}
                  </p>
                  <div className="flex gap-3">
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

export default ProductOverview;
