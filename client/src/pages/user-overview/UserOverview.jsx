import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import GetUser from "../../components/get-user/GetUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward, faIndianRupee } from "@fortawesome/free-solid-svg-icons";
import GetWishListProducts from "../../components/get-wish-list-products/GetWishListProducts";
import GetCartProducts from "../../components/get-cart-products/GetCartProducts";
import "./UserOverview.css"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function UserOverview() {

    const navigate = useNavigate();
  const params = useParams();
  const [seller, setSeller] = useState({});
  const [wishList, setWishList] = useState([]);
  const [cartList, setCartList] = useState([]);
  const user_id = params.user_id;
  const token = localStorage.getItem(params.auth_id);

  useEffect(() => {
    const fetchSeller = async () => {
      const sellerData = await GetUser(user_id, token);
      setSeller(sellerData);
    };

    fetchSeller();
  }, [token, user_id]);
  console.log("seller : ", seller);

  useEffect(() => {
    const fetchWishListProducts = async () => {
      const wishlistProducts = await GetWishListProducts(user_id);
      setWishList(wishlistProducts);
    };
    fetchWishListProducts();
  }, [user_id]);
  console.log("products : ", wishList);

  useEffect(() => {
    const handleFetchCartProducts = async () => {
      const cartProducts = await GetCartProducts(user_id);
      setCartList(cartProducts);
    };
    handleFetchCartProducts();
  }, [user_id]);
  console.log("product : ", cartList);

  const handleBack = () => {
    navigate(`/admin-dashboard/${params.auth_id}/${params.user_type}`);
  }

  return (
    <div className="bg-slate-200 py-5">
        <div className="w-3/4 mx-auto rounded-full flex justify-between bg-white p-3 px-10">
            <div className="logo-font text-5xl">WW</div>
           <button onClick={handleBack} className="text-slate-600 hover:text-black hover:border-b-black"><FontAwesomeIcon icon={faBackward} /> Back</button>
        </div>
        <div className="grid grid-cols-12 gap-5 p-5">
      <div className="bg-white col-span-4 max-lg:col-span-12 border-2  rounded-2xl p-10 h-screen scroll-container">
        <div className="px-4 sm:px-0">
          <h3 className="text-xl font-semibold text-gray-900">
            {seller.name}
          </h3>
          <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">details</p>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">Full name</dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                {seller.name}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">Address</dt>
              <div>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {seller.house_name ? seller.house_name : "N/A"}
                </dd>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {seller.postal_area ? seller.postal_area : "N/A"}
                </dd>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {seller.state ? seller.state : "N/A"}
                </dd>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {seller.pincode ? seller.pincode : "N/A"}
                </dd>
              </div>
            </div>
            <div
              className={
                (classNames =
                  seller.user_type == "Seller"
                    ? "px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
                    : "hidden")
              }
            >
              <dt className="text-sm/6 font-medium text-gray-900">
                Company Name
              </dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                {seller.company ? seller.company : "name not specified"}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">
                Email address
              </dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                {seller.email}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">
                Phone number
              </dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                {seller.ph_number}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">
                Number of Products in cart
              </dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                {seller.cart_lists ? seller.cart_lists.length : "N/A"}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">
                Number of Products in wish list
              </dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                {seller.wish_lists ? seller.wish_lists.length : "N/A"}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">
                Number of Products bought
              </dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                {seller.products_bought ? seller.products_bought.length : "N/A"}
              </dd>
            </div>
            <div
              className={
                (classNames =
                  seller.user_type == "Seller"
                    ? "px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
                    : "hidden")
              }
            >
              <dt className="text-sm/6 font-medium text-gray-900">
                Total profit got
              </dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                <FontAwesomeIcon icon={faIndianRupee} />{" "}
                {seller.profit ? seller.profit : "0"}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="bg-white col-span-4 max-lg:col-span-6 max-md:col-span-12 border-2  rounded-2xl p-5 h-screen scroll-container">
        <div className="pb-5 text-lg font-semibold">
            Wish List
        </div>
        <div className="grid grid-cols-1 gap-x-6 gap-y-5 xl:gap-x-8">
          {wishList.length == 0 ? (
            <div className="flex flex-col space-y-3 text-xl">
              <span>OOPS!!! CART IS EMPTY</span>
            </div>
          ) : (
            wishList.map((product) => (
              <div
                key={product._id}
                className="group hover:shadow-lg rounded-2xl border bg-slate-50"
              >
                <div className="flex justify-between max-xl:flex-col max-xl:justify-between">
                  <img
                    alt={product.imageAlt || product.name}
                    src={
                      product.imageSrc ||
                      `http://localhost:3000/${product.images[0]}`
                    }
                    className="img-height-cart aspect-square rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-[7/8]"
                  />
                  <div className="px-5 pb-5 max-lg:flex max-lg:flex-col max-lg:items-center justify-between">
                    <div className="max-lg:w-full text-end max-lg:text-start">
                      <h3 className="mt-4 text-md font-semibold text-gray-700 text-wrap">
                        {product.name}
                      </h3>
                      <p className="max-lg:w-full mt-1 text-lg font-medium text-red-500">
                        {product.price_currency ? (
                          product.price_currency
                        ) : (
                          <FontAwesomeIcon icon={faIndianRupee} />
                        )}{" "}
                        {product.price}
                      </p>
                    </div>
                    <div
                      className="max-lg:w-full mt-3"
                      onClick={() => handleProductOverview(`${product._id}`)}
                    >
                      <button className="w-full border px-5 py-3 rounded-2xl hover:border-indigo-600 hover:text-indigo-600">
                        View Product
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="bg-white col-span-4 max-lg:col-span-6 max-md:col-span-12 border-2  rounded-2xl p-5 h-screen scroll-container">
        <div className="pb-5 text-lg font-semibold">
            Cart List
        </div>
        <div className="grid grid-cols-1 gap-x-6 gap-y-5 xl:gap-x-8">
          {cartList.length == 0 ? (
            <div className="flex flex-col space-y-3 text-xl">
              <span>OOPS!!! YOUR CART IS EMPTY</span>
            </div>
          ) : (
            cartList.map((product) => (
              <div
                key={product._id}
                className="group hover:shadow-lg rounded-2xl border bg-slate-50"
              >
                <div className="flex justify-between max-xl:flex-col max-xl:justify-between">
                  <img
                    alt={product.imageAlt || product.name}
                    src={
                      product.imageSrc ||
                      `http://localhost:3000/${product.images[0]}`
                    }
                    className="img-height-cart aspect-square rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-[7/8]"
                  />
                  <div className="px-5 pb-5 max-lg:flex max-lg:flex-col max-lg:items-center justify-between">
                    <div className="max-lg:w-full text-end max-lg:text-start">
                      <h3 className="mt-4 text-md font-semibold text-gray-700 text-wrap">
                        {product.name}
                      </h3>
                      <p className="max-lg:w-full mt-1 text-lg font-medium text-red-500">
                        {product.price_currency ? (
                          product.price_currency
                        ) : (
                          <FontAwesomeIcon icon={faIndianRupee} />
                        )}{" "}
                        {product.price}
                      </p>
                    </div>
                    <div
                      className="max-lg:w-full mt-3"
                      onClick={() => handleProductOverview(`${product._id}`)}
                    >
                      <button className="w-full border px-5 py-3 rounded-2xl hover:border-indigo-600 hover:text-indigo-600">
                        View Product
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
    </div>
  );
}

export default UserOverview;