import "./productListing.css"
import { faCartShopping, faHeart, faIndianRupee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback } from "react";
import { useNavigate,useParams } from "react-router-dom";
import AddToCart from "../add-to-cart/AddToCart";
import useCheckLogin from "../check-login/useCheckLogin";
import AddToWishList from "../add-to-wish-list/AddToWishList";

export default function ProductsListing({ products, heading }) {
  const navigate = useNavigate();

  const params = useParams();
  const isLoggedIn = useCheckLogin();

  const handleProductOverview = (product_id) => {
    !isLoggedIn ? navigate(`/product-overview/${product_id}`) : navigate(`/product-overview/${params.auth_id}/${params.user_type}/${product_id}`);
  }

  const handleCart = useCallback(async (product_id) => {
      if (!isLoggedIn) {
        alert("You are not allowed to continue without login/sign-up");
        return;
      }

      try {
        const response = await AddToCart(params.auth_id, product_id);
        console.log("Response from AddToCart function:", response);
        alert(response);
      } catch (error) {
        console.error("Error adding to cart:", error);
        alert("Failed to add the product to the cart.");
      }
    },
    [isLoggedIn, params.auth_id]
  );

  const handleWishList = useCallback(async (product_id) => {
    if (!isLoggedIn) {
      alert("You are not allowed to continue without login/sign-up");
      return;
    }
    try {
      const response = await AddToWishList({ auth_id : params.auth_id, product_id });
      console.log("Response from wishlist function:", response);
      alert(response);
    } catch (error) {
      console.error("Error wishlist :", error);
      alert("Failed to add the product to the wishlist.");
    }
  }, [isLoggedIn, params.auth_id]);


  return (
    <div className="">
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
        <div className="pb-10 text-4xl font-semibold nav-font">{heading}</div>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="group hover:shadow-lg rounded-2xl border bg-slate-50"
            >
              <div className="">
                <img
                 onClick={() => handleProductOverview(`${product._id}`)}
                  alt={product.imageAlt || product.name}
                  src={
                    product.imageSrc ||
                    `http://localhost:3000/${product.images[0]}`
                  }
                  className="img-height aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-[7/8]"
                />
                <div className="px-5 pb-5">
                  <div onClick={() => handleProductOverview(`${product._id}`)}>
                    <h3 className="mt-4 text-md font-semibold text-gray-700">
                      {product.name}
                    </h3>
                    <p className="mt-1 text-lg font-medium text-red-500">
                      {product.price_currency ? product.price_currency : <FontAwesomeIcon icon={faIndianRupee} />} {product.price}
                    </p>
                  </div>
                  <div className="text-end space-x-5">
                    <button onClick={() => handleCart(`${product._id}`)}>
                      <FontAwesomeIcon
                        icon={faCartShopping}
                        className="border px-5 py-3 rounded-full hover:border-yellow-500 hover:text-yellow-500"
                      />
                    </button>
                    <button onClick={() => handleWishList(`${product._id}`)}>
                      <FontAwesomeIcon
                        icon={faHeart}
                        className="border px-5 py-3 rounded-full hover:border-red-500 hover:text-red-500"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}