import React,{ useState,useEffect } from 'react'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import FetchCategory from '../../../../components/fetch-category/FetchCategory';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function AddProduct() {

    const params = useParams();
    const navigate = useNavigate();
    const auth_id = params.auth_id;

    const [categories, setCategories] = useState([]);
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [category, setCategory] = useState("");
    const [base64Images, setBase64Images] = useState([]);
    const [price, setPrice] = useState();
    const [stock_count, setStock_count] = useState();
    const [price_currency, setPrice_currency] = useState();

    useEffect(() => {
        const fetchCategories = async () => {
          try {
            const response = await FetchCategory();
            console.log("Fetched Categories:", response);
            setCategories(response);

          } catch (error) {
            console.error("Error fetching categories:", error);
          }
        };
    
        fetchCategories();
      }, []);

      useEffect(() => {
        console.log("Selected category:", category);
      }, [category]);
      

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const promises = files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve({ name: file.name, data: reader.result });
        reader.onerror = (error) => reject(error);
      });
    });

    Promise.all(promises)
      .then((results) => setBase64Images(results))
      .catch((error) => console.error("Error converting files to Base64:", error));
  };

  const handleAddProduct = async(event) => {
    event.preventDefault();
    let token = localStorage.getItem(auth_id);
    try {
      console.log(`${name},${category},`)
        let response = await axios({
            method: 'POST',
            url: `http://localhost:3000/product/${auth_id}`,
            headers : {'Authorization' : `Bearer ${token}`},
            data: {
              name,
              category,
              description,
              images : base64Images,
              price,
              stock_count,
              price_currency
            }
          });
          console.log("response after post product : ",response);
          alert(response.data.message);
          window.location.reload();

    } catch (error) {
        console.log("error : ",error);
    }

  }

  return (
    <div>
      <form onSubmit={handleAddProduct}>
      <div className="space-y-10">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold text-gray-900">Add new product</h2>
          <p className="mt-1 text-sm/6 text-gray-600">
            This Product will be displayed publicly so be careful what you share.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                Product Name
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                  <input
                  onChange={(e) => setName(e.target.value)}
                    id="username"
                    name="username"
                    type="text"
                    className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                  />
                </div>
              </div>
            </div>

            {/* <div className="sm:col-span-4">
              <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                Product Category
              </label>
              <div className="mt-2 grid grid-cols-1">
                <select
                onChange={(e) => setCategory(e.target.value)}
                  id="country"
                  name="country"
                  className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                >
                  {categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                  ))}
                </select>
                <ChevronDownIcon
                  aria-hidden="true"
                  className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                />
              </div>
            </div> */}
            <div className="sm:col-span-4">
  <label htmlFor="category" className="block text-sm/6 font-medium text-gray-900">
    Product Category
  </label>
  <div className="mt-2 grid grid-cols-1">
    <select
      id="category"
      name="category"
      value={category || ""} // Ensure a controlled component
      onChange={(e) => setCategory(e.target.value)}
      className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
    >
      <option value="" disabled>
        Select a category
      </option> {/* Placeholder */}
      {categories.length > 0 ? (
        categories.map((cat, index) => (
          <option key={index} value={cat}>
            {cat}
          </option>
        ))
      ) : (
        <option value="" disabled>
          No categories available
        </option>
      )}
    </select>
    <ChevronDownIcon
      aria-hidden="true"
      className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
    />
  </div>
</div>



            <div className="col-span-full">
              <label htmlFor="about" className="block text-sm/6 font-medium text-gray-900">
                Product Description
              </label>
              <div className="mt-2">
                <textarea
                onChange={(e) => setDescription(e.target.value)}
                  id="about"
                  name="about"
                  rows={3}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  defaultValue={''}
                />
              </div>
              <p className="mt-3 text-sm/6 text-gray-600">Write a few sentences about your Product.</p>
            </div>

            <div className="col-span-full">
              <label htmlFor="cover-photo" className="block text-sm/6 font-medium text-gray-900">
                Product Images
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon aria-hidden="true" className="mx-auto size-12 text-gray-300" />
                  <div className="mt-4 flex text-sm/6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload image files</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple onChange={handleFileChange} />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs/5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
              <p className="mt-3 text-sm/6 text-gray-600">You nedd to add 4 images of your product</p>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                product Rate
              </label>
              <div className="mt-2">
                <input
                    onChange={(e) => setPrice(e.target.value)}
                  id="first-name"
                  name="first-name"
                  type="number"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-900">
                Number of Stocks
              </label>
              <div className="mt-2">
                <input
                onChange={(e) => setStock_count(e.target.value)}
                  id="last-name"
                  name="last-name"
                  type="number"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="country" className="block text-sm/6 font-medium text-gray-900">
                Price Currency
              </label>
              <div className="mt-2 grid grid-cols-1">
                <select
                onChange={(e) => setPrice_currency(e.target.value)}
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                >
                  <option>INR</option>
                  <option>$</option>
                </select>
                <ChevronDownIcon
                  aria-hidden="true"
                  className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
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
          Add
        </button>
      </div>
    </form>
    </div>
  )
}

export default AddProduct
