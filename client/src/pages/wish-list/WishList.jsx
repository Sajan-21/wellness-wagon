import React, { useEffect, useState, useCallback } from "react";
import GetWishListProducts from "../../components/get-wish-list-products/GetWishListProducts";
import { useParams, useNavigate } from "react-router-dom";
import useCheckLogin from "../../components/check-login/useCheckLogin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faHeart, faIndianRupee } from "@fortawesome/free-solid-svg-icons";
import AddToCart from "../../components/add-to-cart/AddToCart";
import CommonNav from "../../components/nav/common-nav/CommonNav";
import RemoveFromWishList from "../../components/remove-from-wish-list/RemoveFromWishList";
import { Link } from "react-router-dom";
import Footer from "../../components/footer/Footer"

function WishList() {
  const [products, setProducts] = useState([]);
  const params = useParams();
  const auth_id = params.auth_id;
  const navigate = useNavigate();
  const isLoggedIn = useCheckLogin();

  const handleProductOverview = (product_id) => {
    !isLoggedIn ? navigate(`/product-overview/${product_id}`) : navigate(`/product-overview/${params.auth_id}/${params.user_type}/${product_id}`);
  }

  useEffect(() => {
    const fetchWishListProducts = async () => {
      const wishlistProducts = await GetWishListProducts(auth_id);
      setProducts(wishlistProducts);
    };
    fetchWishListProducts();
  }, [auth_id]);
  console.log("products : ", products);

  const handleCart = useCallback(
    async (product_id) => {
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

  const handleRemoveFromWishList = useCallback(async(product_id) => {
    const response = await RemoveFromWishList(params.auth_id, product_id);
    if(response.statusCode == 200){
      alert(response.message);
      window.location.reload();
    }
  },[params.auth_id]);

  const handleOrder = useCallback(async (product_id) => {
    if (!isLoggedIn) {
      alert("You are not allowed to continue without login/sign-up");
      return;
    }else{
      navigate(`/billing/${params.auth_id}/${params.user_type}/${product_id}`);
    }
  }, [isLoggedIn, params.auth_id, params.user_type]);

  return (
    <div className=" bg-slate-200">
      <CommonNav />
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-14 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.length == 0 ? <div className="w-full flex flex-col space-y-3 text-xl">
              <span>OOPS!!! YOUR WISH LIST IS EMPTY</span>
              <span>WISH PRODUCTS AND ACHIEVE IT</span>
              <span><Link to={params.auth_id ? `/shop/${params.auth_id}/${params.user_type}` : `/shop`}><button className="border border-black px-5 py-2 font-semibold hover:bg-slate-800 hover:border-0 hover:text-white">SHOP NOW</button></Link></span>
            </div> : products.map((product) => (
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
                      {product.price_currency ? product.price_currency : <FontAwesomeIcon icon={faIndianRupee} />}{" "}
                      {product.price}
                    </p>
                  </div>
                  <div className="text-end space-x-5 mt-2 flex items-center">
                    <button onClick={() => handleCart(`${product._id}`)}>
                      <FontAwesomeIcon
                        icon={faCartShopping}
                        className="bg-white border px-5 py-4 rounded-2xl hover:border-yellow-500 hover:text-yellow-500"
                      />
                    </button>
                    <button className="bg-white border px-5 py-3 rounded-2xl hover:border-red-500 hover:text-red-500"
                    onClick={() => handleRemoveFromWishList(`${product._id}`)} >
                      Remove from{" "}
                      <FontAwesomeIcon icon={faHeart} className="text-sm" />
                    </button>
                  </div>
                  <div className="mt-3">
                    <button onClick={() => handleOrder(`${product._id}`)} className="bg-white w-full border px-5 py-3 rounded-2xl hover:border-green-500 hover:text-green-500">
                      BUY NOW
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default WishList;