import React, { useCallback, useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import "./nav.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import useCheckLogin from "../check-login/useCheckLogin";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Toast from "../toast/Toast";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Nav() {
  const navigate = useNavigate();
  const params = useParams();
  const checkLogin = useCheckLogin();

  let navigation;
  if (checkLogin) {
    navigation = [
      { name: "Home", href: `/${params.auth_id}/${params.user_type}` },
      { name: "Shop", href: `/shop/${params.auth_id}/${params.user_type}` },
      { name: "About", href: `/about/${params.auth_id}/${params.user_type}` },
    ];
  } else {
    navigation = [
      { name: "Home", href: "/" },
      { name: "Shop", href: "/shop" },
      { name: "About", href: "/about" },
    ];
  }

  const handleAuthorization = () => {
    navigate("/login");
  };

  const handleProfile = () => {
    const auth_id = params.auth_id;
    const user_type = params.user_type;
    if (user_type == "Seller") {
      navigate(`/seller-dashboard/${auth_id}/${user_type}`);
    } else if (user_type == "Buyer") {
      navigate(`/Buyer-dashboard/${auth_id}/${user_type}`);
    } else {
      navigate(`/admin-dashboard/${auth_id}/${user_type}`);
    }
  };

  const handleWishListPage = () => {
    if (!checkLogin) {
      alert("you are not able to continue without login/sign-up");
    } else {
      navigate(`/wish-list/${params.auth_id}/${params.user_type}`);
    }
  };

  const handleCartPage = () => {
    if (!checkLogin) {
      alert("you are not able to continue without login/sign-up");
    } else {
      navigate(`/cart/${params.auth_id}/${params.user_type}`);
    }
  };

  const handleSignOut = () => {
    if (!checkLogin) {
      alert("you are not logged in to sign out");
    } else {
      localStorage.removeItem(params.auth_id);
      alert("logged out");
      navigate("/");
    }
  };

  return (
    <div className="bg-img h-screen">
      <Disclosure as="nav" className="bg-transparent">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button*/}
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon
                  aria-hidden="true"
                  className="block size-6 group-data-[open]:hidden"
                />
                <XMarkIcon
                  aria-hidden="true"
                  className="hidden size-6 group-data-[open]:block"
                />
              </DisclosureButton>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-center sm:justify-start max-sm:justify-start max-sm:ms-12 ">
              <div className="flex shrink-0 items-center">
                <div className="text-white logo-font text-5xl">WW</div>
              </div>
              <div className="max-sm:hidden sm:ml-6  sm:block">
                <div className="flex space-x-4">
                  {navigation.map((item, index) => (
                    <Link
                      key={index}
                      to={item.href}
                      aria-current={item.current ? "page" : undefined}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:border-b hover:text-white",
                        "px-3 py-2 text-lg font-medium nav-font"
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center gap-5 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button
                onClick={handleWishListPage}
                type="button"
                className="relative rounded-full p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span className="absolute -inset-1.5" />
                <span className="sr-only">View notifications</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
              </button>
              <button
                onClick={handleCartPage}
                type="button"
                className="relative rounded-full p-1 text-gray-400 hover:text-white"
              >
                <span className="absolute -inset-1.5" />
                <span className="sr-only">View notifications</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
              </button>

              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="relative flex rounded-full focus:outline-none text-xl text-slate-400 hover:text-white">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <FontAwesomeIcon icon={faUser} />
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <MenuItem>
                    <div
                      onClick={handleProfile}
                      className={classNames(
                        !checkLogin
                          ? "hidden"
                          : "block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                      )}
                    >
                      Your Profile
                    </div>
                  </MenuItem>
                  <MenuItem>
                    <div
                      onClick={handleAuthorization}
                      className={classNames(
                        !checkLogin
                          ? "block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                          : "hidden"
                      )}
                    >
                      Sign-up/Login
                    </div>
                  </MenuItem>
                  <MenuItem>
                    <div
                      onClick={handleSignOut}
                      className={
                        !checkLogin
                          ? "hidden"
                          : "block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                      }
                    >
                      Sign out
                    </div>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
          </div>
        </div>

        <DisclosurePanel className="sm:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navigation.map((item) => (
              <DisclosureButton
                key={item.name}
                as="a"
                href={item.href}
                className={classNames(
                  item.current == item.name
                    ? "bg-gray-900 text-white nav-font"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white nav-font",
                  "block rounded-md px-3 py-2 text-base font-medium nav-font"
                )}
              >
                {item.name}
              </DisclosureButton>
            ))}
          </div>
        </DisclosurePanel>
      </Disclosure>
      <div>
        <div className="p-28 moto my-auto text-center space-y-12 text-white gap-8 max-lg:p-14">
          <div className="text-7xl max-lg:text-6xl max-md:text-5xl logo-font">
            NOT ONE DAY
          </div>
          <div className="text-7xl max-lg:text-6xl max-md:text-5xl logo-font">
            SAY DAY ONE
          </div>
          <div>
            <Link to={!checkLogin ? `/shop` : `/shop/${params.auth_id}/${params.user_type}`}><button className="text-2xl border text-m px-3 py-2 hover:bg-white hover:text-black hover:font-bold">
              Shop Now
            </button></Link>
          </div>
        </div>
      </div>
      {/* <Toast message={message} /> */}
    </div>
  );
}

export default Nav;