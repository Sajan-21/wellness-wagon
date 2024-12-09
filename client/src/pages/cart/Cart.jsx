import React, { useEffect, useCallback, useState } from "react";
import "./cart.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import GetCartProducts from "../../components/get-cart-products/GetCartProducts";
import OfferNav from "../../components/offer-component/OfferNav"
import CommonNav from "../../components/nav/common-nav/CommonNav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faHeart, faIndianRupee } from "@fortawesome/free-solid-svg-icons";
import useCheckLogin from "../../components/check-login/useCheckLogin";
import RemoveFromCart from "../../components/remove-from-cart/RemoveFromCart";
import AddToWishList from "../../components/add-to-wish-list/AddToWishList";
import Footer from "../../components/footer/Footer"

function Cart() {
  const navigate = useNavigate();
  const params = useParams();
  const auth_id = params.auth_id;
  const [products, setProducts] = useState([]);
  const [totalProductsPrice, setTotalProductsPrice] = useState(0);
  const isLoggedIn = useCheckLogin();

  useEffect(() => {
    const handleFetchCartProducts = async () => {
      const cartProducts = await GetCartProducts(auth_id);
      setProducts(cartProducts);
    };
    handleFetchCartProducts();
  }, [auth_id]);
  console.log("product : ", products);

  useEffect(() => {
    const calculateTotalProductsPrice = () => {
      const total = products.reduce((sum, product) => sum + product.price, 0 );
      setTotalProductsPrice(total);
    };
    calculateTotalProductsPrice();
  }, [products]);
  console.log("total_price : ", totalProductsPrice);

  const handleProductOverview = (product_id) => {
    !isLoggedIn ? navigate(`/product-overview/${product_id}`) : navigate(`/product-overview/${params.auth_id}/${params.user_type}/${product_id}`);
  }

  const handleWishList = useCallback(
    async (product_id) => {
      if (!isLoggedIn) {
        alert("You are not allowed to continue without login/sign-up");
        return;
      }
      try {
        const response = await AddToWishList({
          auth_id: params.auth_id,
          product_id,
        });
        console.log("Response from wishlist function:", response);
        alert(response);
      } catch (error) {
        console.error("Error wishlist :", error);
        alert("Failed to add the product to the wishlist.");
      }
    },
    [isLoggedIn, params.auth_id]
  );

  const handleRemoveFromCart = useCallback(async (product_id) => {
    const response = await RemoveFromCart(params.auth_id, product_id);
    console.log("response from cart page : ",response);
    alert(response);
    window.location.reload();
  },[params.auth_id]);

  // const handleOrder = useCallback(async (product_id) => {
  //   if (!isLoggedIn) {
  //     alert("You are not allowed to continue without login/sign-up");
  //     return;
  //   }else{
  //     navigate(`/billing/${params.auth_id}/${params.user_type}/${product_id}`);
  //   }
  // }, [isLoggedIn, params.auth_id, params.user_type]);

  return (
    <div className="bg-slate-200">
      <OfferNav />
      <CommonNav />
      <div className="grid grid-cols-6 gap-5 w-3/4 mx-auto py-10">
        <div className="col-span-4 max-lg:col-span-6">
          <div className="grid grid-cols-1 gap-x-6 gap-y-5 xl:gap-x-8">
            {products.length == 0 ? <div className="flex flex-col space-y-3 text-xl">
              <span>OOPS!!! YOUR CART IS EMPTY</span>
              <span>ADD PRODUCTS TO CART AND BE READY FOR BUY</span>
              <span><Link to={params.auth_id ? `/shop/${params.auth_id}/${params.user_type}` : `/shop`}><button className="border border-black px-5 py-2 font-semibold hover:bg-slate-800 hover:border-0 hover:text-white">SHOP NOW</button></Link></span>
            </div> : products.map((product) => (
              <div
                key={product._id}
                className="group hover:shadow-lg rounded-2xl border bg-slate-50"
              >
                <div className="flex justify-between max-sm:flex-col max-sm:justify-between">
                  <img
                    
                    alt={product.imageAlt || product.name}
                    src={
                      product.imageSrc ||
                      `http://localhost:3000/${product.images[0]}`
                    }
                    className="img-height-cart aspect-square rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-[7/8]"
                  />
                  <div className="px-5 pb-5 max-lg:flex max-lg:flex-col max-lg:items-center justify-between">
                    <div
                    className="max-lg:w-full text-end max-lg:text-start"
                      
                    >
                      <h3 className="mt-4 text-md font-semibold text-gray-700 text-wrap">
                        {product.name}
                      </h3>
                      <p className="max-lg:w-full mt-1 text-lg font-medium text-red-500">
                        {product.price_currency
                          ? product.price_currency
                          : <FontAwesomeIcon icon={faIndianRupee} />}{" "}
                        {product.price}
                      </p>
                    </div>
                    <div className="max-lg:w-full text-end space-x-5 mt-2 flex items-center justify-between">
                      <button onClick={() => handleWishList(`${product._id}`)}>
                        <FontAwesomeIcon
                          icon={faHeart}
                          className="border px-5 py-4 rounded-2xl hover:border-yellow-500 hover:text-yellow-500"
                        />
                      </button>
                      <button className="border px-5 py-3 rounded-2xl hover:border-red-500 hover:text-red-500"
                      onClick={() => handleRemoveFromCart(`${product._id}`)} >
                        Remove from{" "}
                        <FontAwesomeIcon icon={faCartShopping} className="text-sm" />
                      </button>
                    </div>
                    <div className="max-lg:w-full mt-3" onClick={() => handleProductOverview(`${product._id}`)}>
                      <button className="w-full border px-5 py-3 rounded-2xl hover:border-indigo-600 hover:text-indigo-600">
                        View Product
                      </button>
                    </div>
                    <div className="max-lg:w-full mt-3">
                      <button onClick={() => handleOrder(`${product._id}`)} className="w-full border px-5 py-3 rounded-2xl hover:border-green-600 hover:text-green-600">
                        BUY NOW
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-2 max-lg:col-span-6">
          <ul className="bg-white rounded-2xl p-2">
            <li className="flex gap-10 justify-between items-center w-3/4 mx-auto border-b pt-5 pb-2">
              <span>Total products Price</span>
              <span><FontAwesomeIcon icon={faIndianRupee} /> {totalProductsPrice} </span>
            </li>
            <li className="flex gap-10 justify-between items-center w-3/4 mx-auto border-b pt-5 pb-2">
              <span>You are saving (20% off)</span>
              <span><FontAwesomeIcon icon={faIndianRupee} /> {totalProductsPrice-(Math.round((80/100)*totalProductsPrice))} </span>
            </li>
            <li className="flex gap-10 justify-between items-center w-3/4 mx-auto border-b pt-5 pb-2">
              <span>Shipping</span>
              <span><FontAwesomeIcon icon={faIndianRupee}  /> {products.length*10} </span>
            </li>
            <li className="flex gap-10 justify-between items-center w-3/4 mx-auto pt-5 pb-2">
              <span>Total price</span>
              <span><FontAwesomeIcon icon={faIndianRupee} /> {Math.round((80/100)*totalProductsPrice) + products.length*10} </span>
            </li>
            <li className="flex justify-center items-center  pt-5">
            <button
    className="border rounded-b-2xl w-full p-4 hover:bg-indigo-600 bg-slate-600 text-white font-semibold rounded-sm"
    onClick={() => {
      if (!isLoggedIn) {
        alert("You are not allowed to continue without login/sign-up");
        return;
      }
      // Pass all product IDs to the billing page
      const productIds = products.map((product) => product._id);
      navigate(`/billing/${params.auth_id}/${params.user_type}`, {
        state: { product_ids: productIds },
      });
    }}
  >
    BUY ALL NOW
  </button>
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Cart;