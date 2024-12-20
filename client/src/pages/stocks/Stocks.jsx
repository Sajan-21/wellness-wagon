import React, { useEffect, useState } from 'react'
import SellerProducts from "../../components/seller-products/SellerProducts"
import { useNavigate, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faIndianRupee } from '@fortawesome/free-solid-svg-icons';

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Stocks() {

  const navigate = useNavigate();
  const params = useParams();
  console.log(params)
  const seller_id = params.user_type == "Seller" ? params.auth_id : params.user_id;
  const token = localStorage.getItem(params.auth_id);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async() => {
      const addedProducts = await SellerProducts(token, seller_id);
      setProducts(addedProducts);
    }
    fetchProducts();
  },[token, seller_id]);
  console.log("products : ",products);

  const handleBack = () => {
    navigate(`/admin-dashboard/${params.auth_id}/${params.user_type}`);
  }

  const handleProductOverview = (product_id) => {
    navigate(`/product-overview/${params.auth_id}/${params.user_type}/${product_id}`);
  }

  const handleUpdatePage = (product_id) => {
    navigate(`/update-product/${params.auth_id}/${params.user_type}/${product_id}`);
  }

  return (
    <div>
    <div className={classNames(params.user_type == "Seller" ? "hidden" : "w-3/4 mx-auto rounded-full flex justify-between bg-slate-500 p-3 px-10 mt-5")}>
        <div className="logo-font text-5xl text-white">WW</div>
       <button onClick={handleBack} className="text-slate-200 hover:text-white hover:border-b-white"><FontAwesomeIcon icon={faBackward} /> Back</button>
    </div>
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
        <div className="pb-10 text-4xl font-semibold nav-font">Stocks</div>
        <div className={classNames(params.user_type == "Seller" ? "grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xl:gap-x-8" : "grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8")}>
          {products.map((product) => (
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
                    <p className="mt-1 text-lg font-medium ">
                      {product.price_currency ? product.price_currency : <FontAwesomeIcon icon={faIndianRupee} />} {product.price}
                    </p>
                    <p className='text-red-500'>
                      {product.stock_count} Stocks left
                    </p>
                  </div>
                  <div className='py-3'><button onClick={() => handleUpdatePage(`${product._id}`)} className={classNames( params.user_type == "Admin" ? "hidden" : 'border-indigo-600 border px-3 py-2 rounded text-indigo-600 hover:bg-indigo-600 hover:text-white')}>Update product</button></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Stocks
