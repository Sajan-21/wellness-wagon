import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import GetProduct from "../../components/get-product/GetProduct";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupee } from "@fortawesome/free-solid-svg-icons";
import CommonNav from "../../components/nav/common-nav/CommonNav";
import Footer from "../../components/footer/Footer";

function Billing() {
  const { state } = useLocation();
  const { auth_id } = useParams();
  const [cartItems, setCartItems] = useState([]);
console.log("state : ",state);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productIds = Array.isArray(state?.product_ids)
          ? state.product_ids
          : [state?.product_ids];
        const products = await Promise.all(
          productIds.map(async (id) => {
            const productData = await GetProduct(id);
            console.log("product : ",productData);
            return {
              product_id: productData._id,
              name: productData.name,
              price: productData.price,
              images : productData.images,
              category : productData.category,
              quantity: 1,
            };
          })
        );
        setCartItems(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, [state]);

  const handleQuantityChange = (product_id, change) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product_id === product_id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const calculateDiscount = (total) => total * 0.2;

  const calculateFinalTotal = () => {
    const subtotal = calculateTotal();
    const discount = calculateDiscount(subtotal);
    const shipping = 10;
    return subtotal + shipping - discount;
  };

  const handlePlaceOrder = async () => {
    try {
      const orderData = cartItems.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity,
      }));

      const response = await axios({
        method: "PATCH",
        url: `http://localhost:3000/order-products/${auth_id}`,
        headers: { Authorization: `Bearer ${localStorage.getItem(auth_id)}` },
        data: orderData,
      });
      console.log("Order placed successfully:", response.data);
      alert("Order placed successfully!");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  console.log("cartItems : ",cartItems);
  return (
    <div className="bg-slate-200">
      <CommonNav />
      <div className="w-4/5 mx-auto p-10 bg-white">
        <h1 className="text-3xl font-bold mb-5">Billing Details</h1>
        <div className="grid grid-cols-2 gap-5">
          <div>
            {cartItems.map((item) => (
              <div key={item._id} className="p-4 border-b">
                <div >
                  {item.images && item.images.length > 0 ? (
                    <>
                      <div className="p-2 max-md:p-2 max-lg:p-2">
                        <img
                          className="size-32 shadow-lg billing-product-img"
                          src={`http://localhost:3000/${item.images[0]}`}
                          alt="Product Image 1"
                        />
                      </div>
                    </>
                  ) : (
                    <p>Loading images...</p>
                  )}
                </div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p>
                  <FontAwesomeIcon icon={faIndianRupee} /> {item.price} x{" "}
                  <button
                    className="border px-3 rounded"
                    onClick={() => handleQuantityChange(item.product_id, -1)}
                    disabled={item.quantity === 1}
                  >
                    -
                  </button>
                  <span className="mx-3">{item.quantity}</span>
                  <button
                    className="border px-3 rounded"
                    onClick={() => handleQuantityChange(item.product_id, 1)}
                  >
                    +
                  </button>
                </p>
              </div>
            ))}
          </div>
          <div>
            <ul className="bg-gray-100 p-5 rounded">
              <li className="flex justify-between border-b pb-2">
                <span>Subtotal</span>
                <span>
                  <FontAwesomeIcon icon={faIndianRupee} /> {calculateTotal()}
                </span>
              </li>
              <li className="flex justify-between border-b pb-2">
                <span>Shipping</span>
                <span>
                  <FontAwesomeIcon icon={faIndianRupee} /> 10
                </span>
              </li>
              <li className="flex justify-between border-b pb-2">
                <span>Discount (20%)</span>
                <span className="text-red-500">
                  -<FontAwesomeIcon icon={faIndianRupee} />{" "}
                  {Math.round(calculateDiscount(calculateTotal()))}
                </span>
              </li>
              <li className="flex justify-between border-b pb-2 font-bold">
                <span>Total</span>
                <span>
                  <FontAwesomeIcon icon={faIndianRupee} />{" "}
                  {calculateFinalTotal()}
                </span>
              </li>
              <li className="mt-4">
                <button
                  className="w-full bg-indigo-600 text-white py-3 rounded"
                  onClick={handlePlaceOrder}
                >
                  Place Order
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Billing;