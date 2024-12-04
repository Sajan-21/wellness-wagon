import { useEffect, useState, useCallback } from "react";
import GetUser from "../../../../components/get-user/GetUser";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function EditSellerProfile() {
  const [seller, setSeller] = useState({
    name: "",
    email: "",
    ph_number: "",
    house_name : "",
    postal_area : "",
    pincode : "",
    state : "",
    company : ""
  });
  const params = useParams();
  const auth_id = params.auth_id;
  let token = localStorage.getItem(auth_id);

  const handleUpdateUser = useCallback(async() => {
    let response = await axios({
        method : "PATCH",
        url : `http://localhost:3000/user/${auth_id}`,
        headers : { Authorization : `Bearer ${token}` },
        data : seller,
    });
    console.log("seller : ",seller);
  }, [auth_id, seller, token]);


  useEffect(() => {
    const fetchUser = async () => {
      try {
        let response = await GetUser(auth_id);
        console.log("response from edit getuser : ", response);
        setSeller({
          ...seller,
          name: response.name,
          email: response.email,
          ph_number: response.ph_number,
          house_name : response.house_name ? response.house_name : "N/A",
          postal_area : response.postal_area ? response.postal_area : "N/A",
          pincode : response.pincode ? response.pincode : "000000",
          state : response.state ? response.state : "N/A",
          company : response.company ? response.company : "N/A",
        }); // Set initial seller data
      } catch (error) {
        console.log("error : ", error);
      }
    };
    fetchUser();
  }, [auth_id]);
  console.log("seller : ",seller);

  return (
    <form onSubmit={handleUpdateUser}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold text-gray-900">
            Edit or Update your details
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
                Username
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={seller.name}
                    onChange={(e) =>
                      setSeller({ ...seller, name: e.target.value })
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
                Company Name
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                  <input
                    type="text"
                    value={seller.company}
                    onChange={(e) =>
                      setSeller({ ...seller, company: e.target.value })
                    }
                    className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  value={seller.email}
                  onChange={(e) =>
                    setSeller({ ...seller, email: e.target.value })
                  }
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Phone number
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  value={seller.ph_number}
                  onChange={(e) =>
                    setSeller({ ...seller, ph_number: e.target.value })
                  }
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
          </div>

          
          <h4 className="mt-10 mb-3 font-semibold ">Address</h4>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm/6 font-medium text-gray-900"
              >
                House name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  value={seller.house_name}
                  onChange={(e) =>
                    setSeller({ ...seller, house_name : e.target.value })
                  }
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Postal area
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  value={seller.postal_area}
                  onChange={(e) =>
                    setSeller({ ...seller, postal_area: e.target.value })
                  }
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm/6 font-medium text-gray-900"
              >
                pincode
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  value={seller.pincode}
                  onChange={(e) =>
                    setSeller({ ...seller, pincode: e.target.value })
                  }
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm/6 font-medium text-gray-900"
              >
                State
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  value={seller.state}
                  onChange={(e) =>
                    setSeller({ ...seller, state: e.target.value })
                  }
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
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
  );
}