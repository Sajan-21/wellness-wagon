import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faUser, faHeart, faCartShopping, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import './nav.css'
import CheckLogin from './CheckLogin'
import { useParams,Link, useNavigate } from 'react-router-dom'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Nav() {

  const params = useParams();
  const navigate = useNavigate();
  let navigation;

  if(params.auth_id){
    navigation = [
      { name: 'Home', href: `/${params.auth_id}/${params.user_type}`},
      { name: 'Shop', href: `/shop/${params.auth_id}/${params.user_type}`},
      { name: 'About', href: `/about/${params.auth_id}/${params.user_type}`}
    ]
  }else{
    navigation = [
      { name: 'Home', href: '/'},
      { name: 'Shop', href: '/shop'},
      { name: 'About', href: '/about'}
    ]
  }

  const checkLogin = CheckLogin();

  const handleDashboardClick = () => {
    checkLogin('dashboard');
  };
  const handleWishListClick = () => {
    checkLogin('wish_list');
  }
  const handleCartClick = () => {
    checkLogin('cart');
  }

  return (
    <div>
      <div className='header-bg-img'>
      <Disclosure as="nav" className="bg-transparent">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <span className='ww-logo text-5xl text-white'>WW</span>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item, index) => (
                  <Link
                  key={index}
                  to={item.href}
                  aria-current={item.current ? 'page' : undefined}
                  className={classNames(
                    item.current
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:border-b hover:text-white',
                    'rounded-md px-3 py-2 text-xl font-medium',
                  )}
                >
                  {item.name}
                </Link>
                ))}
                
              </div>
            </div>
          </div>
          <div className="shrink absolute inset-y-0 right-0 flex items-center pr-2 gap-10 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <FontAwesomeIcon icon={faUser} className='text-white text-xl'/>
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <MenuItem onClick={handleDashboardClick}>
                <div className='block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none'><FontAwesomeIcon icon={faUser} /> Your Profile</div> 
                </MenuItem>
                <MenuItem>
                  <div className='block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none sm:hidden'><FontAwesomeIcon icon={faHeart} /> Wish List</div>
                </MenuItem>
                <MenuItem>
                  <div className='block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none sm:hidden'><FontAwesomeIcon icon={faCartShopping}/> Cart</div>
                </MenuItem>
                <MenuItem>
                  <div className='block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none'><FontAwesomeIcon icon={faArrowRightFromBracket} /> Sign Out</div>
                </MenuItem>
              </MenuItems>
            </Menu>
            <button
            onClick={handleWishListClick}
              type="button"
              className="max-sm:hidden relative p-1 text-gray-400 hover:text-white focus:outline-none"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              <FontAwesomeIcon icon={faHeart} className='text-white text-xl' />
            </button>
            <button
            onClick={handleCartClick}
              type="button"
              className="max-sm:hidden relative p-1 text-gray-400 hover:text-white focus:outline-none"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              <FontAwesomeIcon icon={faCartShopping} className='text-white text-xl' />
            </button>
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
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium',
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
    <div>
    <div className="p-28 moto my-auto text-center text-white gap-8 max-lg:p-14">
        <div className="moto-texts text-m">NOT ONE DAY</div>
        <div className="moto-texts text-m">SAY DAY ONE</div>
        <div>
          <button
          onClick={()=>params.auth_id ? navigate(`/shop/${params.auth_id}/${params.user_type}`) : navigate(`/shop/${params.auth_id}/${params.user_type}`)}
           className="text-2xl border text-m px-3 py-2 hover:bg-white hover:text-black hover:font-bold">
            Shop Now
          </button>
        </div>
      </div>
    </div>
      </div>
    </div>
  )
}
