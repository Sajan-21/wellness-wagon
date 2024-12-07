import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GetAllProducts from "../../../../components/get-all-products/GetAllProducts";
import GetUsers from "../../../../components/get-all-users/GetUsers";

function WWinfo() {
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [buyers, setBuyers] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let auth_id = params.auth_id ? params.auth_id : "null";
        let user_type = params.user_type ? params.user_type : "null";
        let category = "null";
        let allProducts = await GetAllProducts(auth_id, category, user_type);
        setProducts(allProducts);
      } catch (error) {
        console.log("error : ", error);
      }
    };
    fetchProducts();
  }, [params.auth_id, params.user_type]);

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const getUsers = await GetUsers(params.auth_id, "Seller");
        setSellers(getUsers);
      } catch (error) {
        console.error("Error fetching sellers:", error);
      }
    };

    fetchSellers();
  }, [params.auth_id]);

  useEffect(() => {
    const fetchBuyers = async () => {
      try {
        const getUsers = await GetUsers(params.auth_id, "Buyer");
        setBuyers(getUsers);
      } catch (error) {
        console.error("Error fetching buyers:", error);
      }
    };

    fetchBuyers();
  }, [params.auth_id]);

  return (
    <div className="bg-gradient-to-r from-slate-500 to-black p-10 rounded-xl">
      <div className="text-8xl logo-font text-white">Wellness Wagon</div>
      <div className="py-5">
        <p className="text-white">Wellness Wagon is your ultimate destination for health, fitness, and holistic well-being. Whether you're a gym enthusiast, a beginner looking to embark on a fitness journey, or someone seeking wellness tips, Wellness Wagon has you covered. The platform offers personalized workout plans, nutritional guidance, and a community to keep you motivated. From tracking your fitness progress to exploring expert advice on mental health and lifestyle habits, Wellness Wagon is designed to empower you to achieve your health goals. Hop on the Wellness Wagon and take the first step toward a healthier, happier you!</p>
      </div>
      <div className="grid grid-cols-2 gap-10">
        <div className="mt-10 flex flex-col justify-center items-center gap-5 shadow-2xl p-10 rounded-xl bg-white">
          <div className="text-5xl logo-font">
            {sellers.length + buyers.length} Users
          </div>
          <div className="text-3xl flex gap-10 logo-font">
            <div>{sellers.length} Sellers</div>
            <div>{buyers.length} Buyers</div>
          </div>
        </div>
        <div className="mt-10 flex flex-col justify-center items-center gap-5 shadow-2xl p-10 rounded-xl bg-white">
          <div className="text-5xl logo-font">{products.length} Products</div>
        </div>
        <div className="mt-10 flex flex-col justify-center items-center gap-5 shadow-2xl p-10 rounded-xl bg-white">
          <div className="text-5xl logo-font">100 + Trades</div>
        </div>
      </div>
    </div>
  );
}

export default WWinfo;