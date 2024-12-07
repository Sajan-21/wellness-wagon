import React from "react";
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
import { Link, useNavigate, useParams } from "react-router-dom";
import useCheckLogin from "../../../../components/check-login/useCheckLogin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function AdminNav() {
  const navigate = useNavigate();
  const params = useParams();
  const checkLogin = useCheckLogin();

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
    <div className="w-3/4 mx-auto mt-5">
      <Disclosure as="nav" className="bg-slate-500 rounded-full">
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
              <div className="hidden sm:ml-6 sm:block"></div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center gap-5 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-3 ">
                <div>
                  <MenuButton className="relative flex items-center gap-3 rounded-full focus:outline-none text-xl text-slate-300 max-sm:text-white hover:text-white">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <div className="nav-font text-xl">John Doe</div>
                    <span><FontAwesomeIcon icon={faUser} /></span>
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md max-sm:text-white bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
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

        <DisclosurePanel className="sm:hidden"></DisclosurePanel>
      </Disclosure>
    </div>
  );
}

export default AdminNav;