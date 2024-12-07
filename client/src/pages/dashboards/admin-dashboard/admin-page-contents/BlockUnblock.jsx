import React, { useCallback, useEffect, useState } from "react";
import GetUsers from "../../../../components/get-all-users/GetUsers";
import { useParams } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import axios from "axios";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function BlockUnblock() {
  const params = useParams();
  const auth_id = params.auth_id;
  const user_type = params.user_type;
  const token = localStorage.getItem(auth_id);
  const [users, setUsers] = useState([]);

  const fetchUsers = useCallback(async () => {
    try {
      const allUsers = await GetUsers(auth_id, user_type);
      setUsers(allUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, [auth_id, user_type]);

  const handleAction = useCallback(
    async (user_id, action) => {
      try {
        const response = await axios({
          method: "PATCH",
          url: `http://localhost:3000/${action}-user/${user_id}`,
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Response:", response);
        alert(response.data.message);
        if(response.data.statusCode == 200){
            window.location.reload();
        }
      } catch (error) {
        console.error(`Error in ${action} user:`, error);
        alert("Failed to process request.");
      }
    },
    [token]
  );

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div>
      <ul role="list" className="divide-y divide-gray-100">
        {users.map((person) => (
          <li key={person.email} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <img
                alt=""
                src={person.imageUrl || "/placeholder.jpg"}
                className="size-12 flex-none rounded-full bg-gray-50"
              />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold text-gray-900">
                  {person.name}
                </p>
                <p className="mt-1 truncate text-xs text-gray-500">
                  {person.user_type}
                </p>
              </div>
            </div>
            <div className="shrink-0 sm:flex sm:flex-col sm:items-end">
              <Menu as="div" className="relative ml-3">
                <MenuButton className="relative flex rounded-full text-sm px-3 py-2 focus:outline-none">
                  <div className="flex items-center gap-x-1.5">
                    <div
                      className={classNames(
                        person.permission === "blocked"
                          ? "bg-red-500/20"
                          : "bg-emerald-500/20",
                        "flex-none rounded-full p-1"
                      )}
                    >
                      <div
                        className={classNames(
                          person.permission === "blocked"
                            ? "bg-red-500"
                            : "bg-emerald-500",
                          "size-1.5 rounded-full"
                        )}
                      />
                    </div>
                    <p className="text-xs text-gray-500">
                      {person.permission === "blocked" ? "Blocked" : "Unblocked"}
                    </p>
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="size-5 text-gray-500"
                    />
                  </div>
                </MenuButton>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none"
                >
                  {person.permission === "blocked" && (
                    <MenuItem>
                      {({ active }) => (
                        <button
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block w-full px-4 py-2 text-left text-sm text-gray-700"
                          )}
                          onClick={() => handleAction(person._id, "unblock")}
                        >
                          Unblock
                        </button>
                      )}
                    </MenuItem>
                  )}
                  {person.permission === "unblocked" && (
                    <MenuItem>
                      {({ active }) => (
                        <button
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block w-full px-4 py-2 text-left text-sm text-gray-700"
                          )}
                          onClick={() => handleAction(person._id, "block")}
                        >
                          Block
                        </button>
                      )}
                    </MenuItem>
                  )}
                </MenuItems>
              </Menu>
              <p className="text-sm text-gray-900">{person.role}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BlockUnblock;