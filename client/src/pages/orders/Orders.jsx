import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import GetProductsBought from '../../components/get-products-bought/GetProductsBought';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupee, faBackward } from '@fortawesome/free-solid-svg-icons';
import ProductsListing from '../../components/products-listing/ProductsListing';

function Orders() {

  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const params = useParams();
  const auth_id = params.auth_id;
  const user_type = params.user_type;
  const user_id = params.user_id;
  const token = localStorage.getItem(auth_id);

  useEffect(() => {
    const fetchOrders = async() => {
      const response = await GetProductsBought(token, user_id);
      setProducts(response);
    }
    fetchOrders();
  },[token, user_id]);

  console.log("products : ",products);

  const handleBack = () => {
    navigate(`/admin-dashboard/${params.auth_id}/${params.user_type}`);
  }

  return (
    <div>
    <div className="w-3/4 mx-auto rounded-full flex justify-between bg-slate-500 p-3 px-10 mt-5">
        <div className="logo-font text-5xl text-white">WW</div>
       <button onClick={handleBack} className="text-slate-200 hover:text-white hover:border-b-white"><FontAwesomeIcon icon={faBackward} /> Back</button>
    </div>
      <div className='w-3/4 mx-auto p-5'>
            <ProductsListing products={products} heading={"Orders"} />
      </div>
    </div>
  )
}

export default Orders
