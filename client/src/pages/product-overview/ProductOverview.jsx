import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faHeart } from "@fortawesome/free-solid-svg-icons";
import { useParams, useNavigate } from "react-router-dom";
import GetProduct from "../../components/get-product/GetProduct";
import GetAllProducts from "../../components/get-all-products/GetAllProducts";
import ProductsListing from "../../components/products-listing/ProductsListing";

function ProductOverview() {
  const [similarProducts, setSimilarProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const params = useParams();
  const product_id = params.product_id;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await GetProduct(product_id);
        setProduct(productData);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [product_id]);

  useEffect(() => {
    const fetchSimilarProducts = async () => {
      if (!product) return;
      try {
        const auth_id = params.auth_id || "null";
        const user_type = params.user_type || "null";
        const category = product.category;
        console.log("category for similar Products : ", category);

        const result = await GetAllProducts(auth_id, category, user_type);
        setSimilarProducts(result);
        console.log("similar products : ", result);
      } catch (error) {
        console.error("Error fetching similar products:", error);
      }
    };

    fetchSimilarProducts();
  }, [product, params.auth_id, params.user_type]);

  if (!product) {
    return <div>Loading product...</div>;
  }

  return (
    <div>
      <div className="p-10 py-5 grid grid-cols-2 max-lg:grid-cols-1">
        <div className="grid grid-cols-2 max-xl:grid-cols-1 max-lg:grid-cols-2">
          <div className="p-2 max-md:p-2 max-lg:p-2">
            <img
              className="rounded-3xl shadow-lg"
              src={`http://localhost:3000/${product.images[0]}`}
              alt=""
            />
          </div>
          <div className="p-2 max-md:p-2 max-lg:p-2">
            <img
              className="rounded-3xl shadow-lg"
              src={`http://localhost:3000/${product.images[1]}`}
              alt=""
            />
          </div>
          <div className="p-2 max-md:p-2 max-lg:p-2">
            <img
              className="rounded-3xl shadow-lg"
              src={`http://localhost:3000/${product.images[2]}`}
              alt=""
            />
          </div>
          <div className="p-2 max-md:p-2 max-lg:p-2">
            <img
              className="rounded-3xl shadow-lg"
              src={`http://localhost:3000/${product.images[3]}`}
              alt=""
            />
          </div>
        </div>
        <div>
          <div className="p-5 grid grid-cols-2 max-sm:grid-cols-1 max-md:p-3">
            <div className="py-3 space-y-5">
              <div className="text-2xl font-semibold">
                <p>{product.name}</p>
              </div>
              <div className="text-lg">{product.category}</div>
              <div className="text-xl text-red-600">
                {product.price_currency === "$"
                  ? `${product.price}`
                  : `INR ${product.price}`}
              </div>
              <div>
                Product by <span className="text-xl">{product.brand}</span>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-5 max-sm:flex max-sm:justify-evnely p-3">
              <button className=" border max-sm:px-3 max-md:text-xs border-red-600 text-red-600 hover:bg-red-600 hover:text-white rounded-xl flex justify-center items-center gap-3">
                <FontAwesomeIcon
                  icon={faHeart}
                  className="text-md max-sm:px-3 py-2 "
                />
                <p className="max-sm:hidden">ADD TO WISH LIST</p>
              </button>
              <button className=" border max-sm:px-3 border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white rounded-xl flex justify-center items-center gap-3">
                <FontAwesomeIcon
                  icon={faCartShopping}
                  className="text-md max-sm:px-3 py-2"
                />
                <p className="max-sm:hidden">ADD TO CART</p>
              </button>
              <button className="py-1 border max-sm:px-3 border-green-600 text-green-600 hover:bg-green-600 hover:text-white rounded-xl flex justify-center items-center gap-3">
                BUY NOW
              </button>
            </div>
          </div>
          <div className="p-5 max-md:p-2">
            <div className="text-xl">About {product.name}</div>
            <div className="py-4">
              {product.description || "No additional details available."}
            </div>
          </div>
        </div>
      </div>
      <div id="similar_products" className="">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
          <div className="text-2xl font-bold tracking-tight text-gray-900 pb-10">
            Similar Products
          </div>
          <ProductsListing products={similarProducts} />
        </div>
      </div>
    </div>
  );
}

export default ProductOverview;
