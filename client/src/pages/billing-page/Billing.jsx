import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GetProduct from "../../components/get-product/GetProduct";
import GetUser from "../../components/get-user/GetUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupee } from "@fortawesome/free-solid-svg-icons";
import CommonNav from "../../components/nav/common-nav/CommonNav";
import OrderProduct from "../../components/order-product/OrderProduct";

function Billing() {
  const params = useParams();
  const product_id = params.product_id;
  const [product, setProduct] = useState({});
  const auth_id = params.auth_id;
  const [user, setUser] = useState({});

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
    const fetchUser = async () => {
      try {
        const userData = await GetUser(auth_id);
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [auth_id]);

  console.log("Product:", product);
  console.log("User:", user);

  const handlePlaceOrder = useCallback(async() => {
    const response = await OrderProduct(auth_id, product_id);
    console.log("response from billing page : ",response);
    alert(response.message);
  },[auth_id, product_id]);

  return (
    <div className="bg-slate-200">
        <CommonNav />
        <div className="border-2 w-4/5 mx-auto p-10 py-5 grid grid-cols-2 max-lg:grid-cols-1 bg-white">
      <div className="grid grid-cols-1">
        {/* Ensure product.images exists */}
        {product.images && product.images.length > 0 ? (
          <>
            <div className="p-2 max-md:p-2 max-lg:p-2 flex justify-center">
              <img
                className="rounded-3xl shadow-lg"
                src={`http://localhost:3000/${product.images[0]}`}
                alt="Product Image 1"
              />
            </div>
          </>
        ) : (
          <p>Loading images...</p> // Placeholder while images are loading
        )}
      </div>
      <div>
        <div className="p-5 grid grid-cols-2 max-sm:grid-cols-1 max-md:p-3 border-b-2">
          <div className="py-3 space-y-5">
            <div className="text-2xl font-semibold">
              <p>{product.name || "Loading product name..."}</p>
            </div>
            <div className="text-lg">
              {product.category || "Loading category..."}
            </div>
            <div className="text-xl">
              {product.price_currency === "$" ? (
                price_currency
              ) : (
                <FontAwesomeIcon icon={faIndianRupee} />
              )}
              {product.price}
            </div>
          </div>
        </div>
        <div className="p-5 max-md:p-2 border-b-2">
          <div className="py-4 flex justify-between items-start">
            {/* {product.description || "No additional details available."} */}
            <div className="">
              <ul className="space-y-2">
                <div className="text-lg font-semibold">
                  delivery address details
                </div>
                <li>
                  {user.house_name
                    ? user.house_name
                    : "please update your house name !!!"}
                </li>
                <li>
                  {user.postal_area
                    ? user.postal_area
                    : "please update your postal area !!!"}
                </li>
                <li>
                  {user.pincode
                    ? user.pincode
                    : "please update your pincode !!!"}
                </li>
              </ul>
            </div>
            <div>
              <div className="">
                <div className="text-lg font-semibold pb-3">Payment Method</div>
                <select className="p-3 border-2">
                  <option className="py-2" value="" disabled>
                    --select payment method
                  </option>
                  <option className="py-2" value="">
                    Credit or Debit card
                  </option>
                  <option className="py-2" value="">
                    Net Banking
                  </option>
                  <option className="py-2" value="">
                    Cash on delivery
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="py-5">
        <ul className="bg-white rounded-2xl p-2">
            <li className="flex gap-10 justify-between items-center w-3/4 mx-auto border-b pt-5 pb-2">
              <span>Total products Price</span>
              <span><FontAwesomeIcon icon={faIndianRupee} /> {product.price} </span>
            </li>
            <li className="flex gap-10 justify-between items-center w-3/4 mx-auto border-b pt-5 pb-2">
              <span>You are saving (20% off)</span>
              <span><FontAwesomeIcon icon={faIndianRupee} /> {product.price-(Math.round((80/100)*product.price))} </span>
            </li>
            <li className="flex gap-10 justify-between items-center w-3/4 mx-auto border-b pt-5 pb-2">
              <span>Shipping</span>
              <span><FontAwesomeIcon icon={faIndianRupee}  /> 10 </span>
            </li>
            <li className="flex gap-10 justify-between items-center w-3/4 mx-auto pt-5 pb-2">
              <span>Total price</span>
              <span><FontAwesomeIcon icon={faIndianRupee} /> {Math.round((80/100)*product.price) + 10} </span>
            </li>
            <li className="flex justify-center items-center  pt-5">
            <button className="border p-4 hover:bg-indigo-600 bg-slate-600 text-white font-semibold rounded-sm" onClick={handlePlaceOrder}>
              Place Order
            </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Billing;