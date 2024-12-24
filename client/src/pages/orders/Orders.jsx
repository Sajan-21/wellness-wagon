

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import GetProductsBought from '../../components/get-products-bought/GetProductsBought';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupee, faBackward } from '@fortawesome/free-solid-svg-icons';
import ProductsListing from '../../components/products-listing/ProductsListing';

function Orders() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const params = useParams();
  const auth_id = params.auth_id;
  const user_type = params.user_type;
  const user_id = params.user_id;
  const token = localStorage.getItem(auth_id);

  useEffect(() => {
    const fetchOrders = async () => {
      user_id ? console.log("user_id : ",user_id) : console.log("auth_id : ",auth_id);
      try {
        const response = await GetProductsBought(token, user_id ? user_id : auth_id);
        if (response.error) {
          throw new Error(response.message || 'Failed to fetch orders');
        }
        setProducts(response);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchOrders();
  }, [token, user_id]);

  console.log('products : ', products);

  const handleBack = () => {
    navigate(`/admin-dashboard/${params.auth_id}/${params.user_type}`);
  };

  return (
    <div>
      <div className="w-3/4 mx-auto p-5">
        {error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : (
          <ProductsListing products={products} heading={'Orders'} />
        )}
      </div>
    </div>
  );
}

export default Orders;
