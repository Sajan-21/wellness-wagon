import React, { useEffect, useState, useCallback } from "react";
import GetProduct from "../../components/get-product/GetProduct";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function UpdateProduct() {
    const navigate = useNavigate()
  const params = useParams();
  const auth_id = params.auth_id;
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [stock_count, setStock_count] = useState();
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    stock_count: "",
    description: "",
    brand: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        let response = await GetProduct(params.product_id);
        console.log("response from getProduct edit product : ", response);
        setProduct({
          ...product,
          name: response.name,
          price: response.price,
          stock_count: response.stock_count,
          description: response.description,
          brand: response.brand,
        });
      } catch (error) {
        console.log("error : ", error);
      }
    };
    fetchProduct();
  }, [params.product_id]);
  console.log("product : ", product);


  const token = localStorage.getItem(auth_id);
  const handleUpdateProduct = useCallback(async() => {
    console.log("product from inside update function : ",product);
    let response = await axios({
        method : "PATCH",
        url : `http://localhost:3000/product/${auth_id}/${params.product_id}`,
        headers : { Authorization : `Bearer ${token}` },
        data : product,
    });
    console.log("response update : ",response);
    if(response.data.statusCode == 200) {
      alert(response.data.message);
      window.location.reload();
    }
  }, [auth_id, product, token]);

  const handleBack = () => {
    navigate(`/seller-dashboard/${params.auth_id}/${params.user_type}`);
  }

  return (
    <div className="bg-slate-200 py-5">
        <div className="w-3/4 mx-auto rounded-full flex justify-between bg-white p-3 px-10">
            <div className="logo-font text-5xl">WW</div>
           <button onClick={handleBack} className="text-slate-600 hover:text-black hover:border-b-black"><FontAwesomeIcon icon={faBackward} /> Back</button>
        </div>
      <form onSubmit={handleUpdateProduct} className="w-3/4 mx-auto p-10 m-10 border-2 rounded-xl bg-white shadow-2xl">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-2xl font-semibold text-gray-900">
              Update your product details
            </h2>
            <p className="mt-1 text-sm/6 text-gray-600">
              Some of this information will be displayed publicly so be careful
              what you share.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Product name
                </label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <input
                      id="username"
                      name="username"
                      type="text"
                      value={product.name}
                      onChange={(e) =>
                        setProduct({ ...product, name: e.target.value })
                      }
                      className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  brand
                </label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <input
                      type="text"
                      value={product.brand}
                      onChange={(e) =>
                        setProduct({ ...product, brand: e.target.value })
                      }
                      className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-1/2 space-y-10 mt-10 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  price
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    value={product.price}
                    onChange={(e) =>
                      setProduct({ ...product, price: e.target.value })
                    }
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  stock_count
                </label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <input
                      type="number"
                      value={product.stock_count}
                      onChange={(e) =>
                        setProduct({ ...product, stock_count: e.target.value })
                      }
                      className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  description
                </label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <textarea
                      type="text"
                      value={product.description}
                      onChange={(e) =>
                        setProduct({ ...product, description: e.target.value })
                      }
                      className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UpdateProduct;