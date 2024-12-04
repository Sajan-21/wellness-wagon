import React, { useCallback, useEffect, useState } from "react";
import SellerProducts from "../../../../components/seller-products/SellerProducts";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import DeleteProducts from "../../../../components/delete-products/DeleteProducts";

function RemoveProducts() {
  const params = useParams();
  const auth_id = params.auth_id;
  const token = localStorage.getItem(auth_id);
  const [products, setProducts] = useState([]);

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
    let response = await DeleteProducts(token, auth_id, product_id);
    console.log("response : ",response);
    if(response.statusCode == 200){
        alert(response.message);
        window.location.reload();
    }
  },[token, auth_id]);

  return (
    <div>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-14 lg:max-w-7xl lg:px-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 xl:gap-x-8">
            {products.map((product) => (
              <div
                key={product._id}
                href={`/product-overview/${product._id}`}
                className="group hover:shadow-lg rounded-2xl"
              >
                <div className="">
                  <img
                    alt={product.imageAlt || product.name}
                    src={
                      product.imageSrc ||
                      `http://localhost:3000/${product.images[0]}`
                    }
                    className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-[7/8]"
                  />
                  <div className="px-5 pb-5">
                    <div>
                      <h3 className="mt-4 text-md font-semibold text-gray-700">
                        {product.name}
                      </h3>
                      <p className="mt-1 text-lg font-medium text-red-500">
                        {product.price_currency
                          ? product.price_currency
                          : "INR"}{" "}
                        {product.price}
                      </p>
                    </div>
                    <div className="text-end space-x-5">
                      <button onClick={() => handleDeleteProduct(product._id)} className="text-2xl hover:border hover:border-red-500 hover:rounded-full hover:px-8 hover:py-3 hover:text-red-500"><FontAwesomeIcon icon={faTrash} /></button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RemoveProducts;