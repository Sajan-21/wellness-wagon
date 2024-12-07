import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import GetUsers from "../../../../components/get-all-users/GetUsers";

function Buyers() {
    const params = useParams();
    const [buyers, setBuyers] = useState([]);
    const navigate = useNavigate();

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

const handleView = (user_id) => {
    navigate(`/user-overview/${params.auth_id}/${params.user_type}/${user_id}`);
}
const handleOrders = (user_id) => {
  navigate(`/orders/${params.auth_id}/${params.user_type}/${user_id}`);
}

  return (
    <div>
        <div className='text-xl border-b pb-3'>
            Buyers
        </div>
      <ul role="list" className="divide-y divide-gray-100 mt-5">
        {buyers.map((person) => (
          <li key={person.email} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold text-gray-900">
                  {person.name}
                </p>
                <p className="mt-1 truncate text-xs text-gray-500">
                  {person.email}
                </p>
              </div>
            </div>
            <div className="shrink-0 sm:flex sm:flex-col sm:items-end">
                <div className='flex'>
                    <div><button onClick={() => handleView(`${person._id}`)} className="px-5 border-indigo-700 text-indigo-700 hover:bg-indigo-700 hover:text-white">view</button></div>
                    <div><button onClick={() => handleOrders(`${person._id}`)} className="px-5 border-s border-yellow-700 text-yellow-700 hover:bg-yellow-700 hover:text-white">Orders</button></div>
                </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Buyers