import { React, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './signup.css'
import axios from 'axios';
import Toast from '../../components/toast/Toast';

function SignUp() {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user_role, setUser_role] = useState('');
    const [number, setNumber] = useState();
    const [message, setMessage] = useState('');

    const handleSignUp = async function(event) {
        event.preventDefault();
        try {
            let response = await axios({
                method: 'POST',
                url: 'http://localhost:3000/sign-up',
                headers : {
                    'Content-Type' : 'application/json'
                },
                data : {
                    name,
                    email,
                    password,
                    user_type : user_role,
                    ph_number : number
                }
              });
            console.log("response : ",response);
            let data = response.data.data;
            let user_type = data.user_type;
            let auth_id = data.id;
            let token = data.token;
            localStorage.setItem(auth_id, token);
            navigate(`/${auth_id}/${user_type}`);
            setMessage(response.data.message);

        } catch (error) {
            console.log("error : ",error);
        }
    }

  return (
    <div className='bg-slate-200 signup-body'>
      <div className="flex md:w-1/2 mx-auto flex-col justify-center p-6 lg:px-8 shadow-2xl bg-white">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            create your own account
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSignUp}>
          <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                onChange={(e) => setName(e.target.value)}
                  id="name"
                  name="name"
                  type="name"
                  required=""
                  className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-slate-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                select Role
              </label>
              <div className="mt-2">
                <select id="country" name="country" value={user_role} onChange={(e) => setUser_role(e.target.value)} className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-slate-500 sm:text-sm/6">
                    <option disabled value="">Seller/Buyer</option>
                    <option value="Seller">Seller</option>
                    <option value="Buyer">Buyer</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Mobile number
              </label>
              <div className="mt-2">
                <input
                onChange={(e) => setNumber(e.target.value)}
                  id="number"
                  name="number"
                  type="number"
                  required=""
                  className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-slate-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  name="email"
                  type="email"
                  required=""
                  className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-slate-500 sm:text-sm/6"
                />
              </div>
            </div>
            
            <div>
              <div className="items-center">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  name="password"
                  type="password"
                  required=""
                  className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-slate-500 sm:text-sm/6"
                />
              </div>
            </div>
            
            <div>
              <button
                type="submit"
                className="flex w-1/2 mx-auto justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign Up
              </button>
            </div>
          </form>
          <p className="flex gap-3 mt-10 justify-center text-center text-sm/6 text-gray-500">
            Not a member?
            <p><Link to="/login" className='text-indigo-600'>Login</Link></p>
          </p>
        </div>
      </div>
      <Toast message={message} />
    </div>
  )
}

export default SignUp
