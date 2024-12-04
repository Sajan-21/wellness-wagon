'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo,faUserTag, faPeopleGroup, faUserLargeSlash } from '@fortawesome/free-solid-svg-icons';
import WWinfo from './admin-page-contents/WWinfo';
import BlockUnblock from './admin-page-contents/BlockUnblock';


const subCategories = [
  { name: 'Wellness Wagon', href: '#', icon:<FontAwesomeIcon className='text-xl' icon={faCircleInfo} /> },
  { name: 'Sellers', href: '#', icon:<FontAwesomeIcon className='text-xl' icon={faUserTag} /> },
  { name: 'Buyers', href: '#', icon:<FontAwesomeIcon className='text-xl' icon={faPeopleGroup} /> },
  { name: 'Bocked/Unblocked users', href: '#', icon:<FontAwesomeIcon className='text-xl' icon={faUserLargeSlash} /> },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function AdminDashboard() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [activeContent, setActiveContent] = useState("Wellness Wagon");

  const updateContent = (key) => {
    setActiveContent(key);
  };

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
                <ul role="list" className="flex flex-col gap-10 px-2 py-3 font-medium text-gray-900">
                  {subCategories.map((category) => (
                    <li key={category.name}>
                      <a href={category.href} className='flex gap-2'>{category.icon}{category.name}</a>
                    </li>
                  ))}
                </ul>
              </form>
            </DialogPanel>
          </div>
        </Dialog>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 py-5">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">Dashboard</h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
              </Menu>

              <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                <span className="sr-only">View grid</span>
                <Squares2X2Icon aria-hidden="true" className="size-5" />
              </button>
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

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>
                <ul role="list" className="space-y-10 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                  {subCategories.map((category) => (
                    <li  key={category.name}>
                      <div className='flex gap-2' onClick={() => updateContent(`${category.name}`)}>{category.icon}{category.name}</div>
                    </li>
                  ))}
                </ul>
              </form>

              {/* Product grid */}
              <div className="col-span-3">
                <div className='p-5 rounded-xl border'>
                  {activeContent === "Wellness Wagon" && <WWinfo />}
                  {activeContent === "Bocked/Unblocked users" && <BlockUnblock />}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
