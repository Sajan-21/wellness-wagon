import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import GetUser from '../../../../components/get-user/GetUser';

function BuyerProfile() {

    const params = useParams();
    const [seller, setSeller] = useState({});
    const auth_id = params.auth_id;
    let token = localStorage.getItem(auth_id);

    useEffect(() => {
      const fetchSeller = async () => {
        const sellerData = await GetUser(auth_id, token);
        setSeller(sellerData);
      };
    
      fetchSeller();
    }, [auth_id]);

    console.log("seller : ",seller);

  return (
    <div>
      <div className="px-4 sm:px-0">
        <h3 className="text-base/7 font-semibold text-gray-900">{seller.name}</h3>
        <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">Your details</p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Full name</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{seller.name}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Address</dt>
            <div>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{seller.house_name ? seller.house_name : "N/A"}</dd>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{seller.postal_area ? seller.postal_area : "N/A"}</dd>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{seller.state ? seller.state : "N/A"}</dd>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{seller.pincode ? seller.pincode : "N/A"}</dd>
            </div>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Email address</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{seller.email}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Phone number</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{seller.ph_number}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Number of Products in your cart</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{seller.cart_lists ? (seller.cart_lists).length : "N/A"}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Number of Products in your wish list</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{seller.wish_lists ? (seller.wish_lists).length : "N/A"}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Number of Products you bought</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{seller.products_bought ? (seller.products_bought).length : "N/A"}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}

export default BuyerProfile
