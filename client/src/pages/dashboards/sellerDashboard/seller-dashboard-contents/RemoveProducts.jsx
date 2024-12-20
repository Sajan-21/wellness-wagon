import React, { useCallback, useEffect, useState } from "react";
import SellerProducts from "../../../../components/seller-products/SellerProducts";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupee, faTrash } from "@fortawesome/free-solid-svg-icons";
import DeleteProducts from "../../../../components/delete-products/DeleteProducts";
// import Toast from "../../../../components/toast/Toast";

function RemoveProducts() {
  const navigate = useNavigate()
  const params = useParams();
  const auth_id = params.auth_id;
  const token = localStorage.getItem(auth_id);
  const [products, setProducts] = useState([]);
  // const [message, alert] = useState('');

  useEffect(() => {
    const fetchSellerProducts = async () => {
      try {
        const seller_products = await SellerProducts(token, auth_id);
        setProducts(seller_products);
      } catch (error) {
        console.error("Error fetching seller products: ", error);
      }
    };

    fetchSellerProducts();
  }, [token, auth_id]);
  console.log("products from remove page: ", products);

  const handleDeleteProduct = useCallback(async(product_id) => {
    console.log("button clicked")
    let response = await DeleteProducts(token, auth_id, product_id);
    console.log("response : ",response);
    if(response.statusCode == 200){
        alert(response.message);
        window.location.reload();
    }
  },[token, auth_id]);

  const handleProductOverview = (product_id) => {
    navigate(`/product-overview/${params.auth_id}/${params.user_type}/${product_id}`);
  }

  return (
    <div>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-14 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-3 gap-x-6 gap-y-10 max-sm:grid-cols-1 max-lg:grid-cols-2 max-xl:grid-cols-3 xl:gap-x-8">
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
                      {product.price_currency == "$" ? product.price_currency : <FontAwesomeIcon icon={faIndianRupee} />} {product.price}
                    </p>
                  </div>
                  <div className="text-end space-x-5">
                    <button className="hover:text-xl hover:text-red-500" onClick={() => handleDeleteProduct(`${product._id}`)}><FontAwesomeIcon icon={faTrash} /> Remove</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
      {/* <Toast message={message} /> */}
    </div>
  );
}

export default RemoveProducts;