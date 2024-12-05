"use client";

import { useState, useEffect,useCallback } from "react";
import "./categorizedProducts.css"
import { useNavigate, useParams } from "react-router-dom";
import {
  Dialog,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faCartShopping, faIndianRupee } from "@fortawesome/free-solid-svg-icons";
import GetAllProducts from "../../../components/get-all-products/GetAllProducts";
import FetchCategory from "../../../components/fetch-category/FetchCategory";
import useCheckLogin from "../../../components/check-login/useCheckLogin";

export default function CatetgorizedProducts() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filters, setFilters] = useState([
    {
      id: "category",
      name: "Category",
      options: [],
    },
  ]);
  const [products, setProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const isLoggedIn = useCheckLogin();


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await FetchCategory();
        console.log("Fetched Categories:", response);

        const fetchedOptions = response.map((category) => ({
          value: category,
          label: category,
          checked: false,
        }));

        setFilters((prevFilters) => [
          {
            ...prevFilters[0],
            options: fetchedOptions,
          },
        ]);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [])

  const toggleCategorySelection = (category) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(category)
        ? prevSelected.filter((cat) => cat !== category)
        : [...prevSelected, category]
    );
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let auth_id = params.auth_id ? params.auth_id : "null";
        let user_type = params.user_type ? params.user_type : "null";
        let category = selectedCategories[0];
        const result = await GetAllProducts( auth_id, category, user_type );
        console.log("result : ",result);
        setProducts(result);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [selectedCategories, params.auth_id, params.user_type]);

  const handleProductOverview = (product_id) => {
    !isLoggedIn ? navigate(`/product-overview/${product_id}`) : navigate(`/product-overview/${params.auth_id}/${params.user_type}/${product_id}`);
  }

  const handleCart = useCallback(async (product_id) => {
      if (!isLoggedIn) {
        alert("You are not allowed to continue without login/sign-up");
        return;
      }

      try {
        const response = await AddToCart(params.auth_id, product_id);
        console.log("Response from AddToCart function:", response);
        alert(response);
      } catch (error) {
        console.error("Error adding to cart:", error);
        alert("Failed to add the product to the cart.");
      }
    },
    [isLoggedIn, params.auth_id]
  );

  const handleWishList = useCallback(async (product_id) => {
    if (!isLoggedIn) {
      alert("You are not allowed to continue without login/sign-up");
      return;
    }
    try {
      const response = await AddToWishList({ auth_id : params.auth_id, product_id });
      console.log("Response from wishlist function:", response);
      alert(response);
    } catch (error) {
      console.error("Error wishlist :", error);
      alert("Failed to add the product to the wishlist.");
    }
  }, [isLoggedIn, params.auth_id]);

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-40 lg:hidden">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
            >
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="-mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                <h3 className="sr-only">Categories</h3>

                {filters.map((section) => (
                  <Disclosure key={section.id} as="div" className="border-t border-gray-200 px-4 py-6">
                    <h3 className="-mx-2 -my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">{section.name}</span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon aria-hidden="true" className="size-5 group-data-[open]:hidden" />
                          <MinusIcon aria-hidden="true" className="size-5 [.group:not([data-open])_&]:hidden" />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-6">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex gap-3">
                            <div className="flex h-5 shrink-0 items-center">
                              <div className="group grid size-4 grid-cols-1">
                                <input
                                  defaultValue={option.value}
                                  id={`filter-mobile-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  checked={selectedCategories.includes(option.value)}
                                  onChange={() => toggleCategorySelection(option.value)}
                                  type="checkbox"
                                  className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                />
                                <svg
                                  fill="none"
                                  viewBox="0 0 14 14"
                                  className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                                >
                                  <path
                                    d="M3 8L6 11L11 3.5"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-[:checked]:opacity-100"
                                  />
                                  <path
                                    d="M3 7H11"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                  />
                                </svg>
                              </div>
                            </div>
                            <label
                              htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                              className="min-w-0 flex-1 text-gray-500"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>
            </DialogPanel>
          </div>
        </Dialog>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-10">
            <div className="text-2xl font-bold tracking-tight text-gray-900">Shop by Your Wish</div>

            <div className="flex items-center">
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon aria-hidden="true" className="size-5" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="py-10">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>

                {filters.map((section) => (
                  <Disclosure key={section.id} as="div" className="border-b border-gray-200 py-6">
                    <h3 className="-my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">{section.name}</span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon aria-hidden="true" className="size-5 group-data-[open]:hidden" />
                          <MinusIcon aria-hidden="true" className="size-5 [.group:not([data-open])_&]:hidden" />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-4">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex gap-3">
                            <div className="flex h-5 shrink-0 items-center">
                              <div className="group grid size-4 grid-cols-1">
                                <input
                                  defaultValue={option.value}
                                  defaultChecked={option.checked}
                                  id={`filter-${section.id}-${optionIdx}`}
                                  checked={selectedCategories.includes(option.value)}
                                  onChange={() => toggleCategorySelection(option.value)}
                                  name={`${section.id}[]`}
                                  type="checkbox"
                                  className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                />
                                <svg
                                  fill="none"
                                  viewBox="0 0 14 14"
                                  className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                                >
                                  <path
                                    d="M3 8L6 11L11 3.5"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-[:checked]:opacity-100"
                                  />
                                  <path
                                    d="M3 7H11"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                  />
                                </svg>
                              </div>
                            </div>
                            <label htmlFor={`filter-${section.id}-${optionIdx}`} className="text-sm text-gray-600">
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>
              <div className="lg:col-span-3">
              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 xl:gap-x-8">
          {products.map((product) => (
            <div
              key={product._id}
              href={`/product-overview/${product._id}`}
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
                    <p className="mt-1 text-lg font-medium text-red-500">
                      {product.price_currency ? product.price_currency : <FontAwesomeIcon icon={faIndianRupee} />} {product.price}
                    </p>
                  </div>
                  <div className="text-end space-x-5">
                    <button onClick={() => handleCart(`${product._id}`)}>
                      <FontAwesomeIcon
                        icon={faCartShopping}
                        className="border px-5 py-3 rounded-full hover:border-yellow-500 hover:text-yellow-500"
                      />
                    </button>
                    <button onClick={() => handleWishList(`${product._id}`)}>
                      <FontAwesomeIcon
                        icon={faHeart}
                        className="border px-5 py-3 rounded-full hover:border-red-500 hover:text-red-500"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}