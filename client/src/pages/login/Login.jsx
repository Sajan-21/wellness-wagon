import {React,useState} from "react";
import "./login.css";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async function(event) {
        event.preventDefault();
        try {
            let response = await axios({
                method: 'POST',
                url: 'http://localhost:3000/login',
                headers : {
                    'Content-Type' : 'application/json'
                },
                data : {
                    email,
                    password
                }
              });
            console.log("response : ",response);
            let data = response.data.data;
            let user_type = data.user_type;
            let auth_id = data.id;
            let token = data.token;
            localStorage.setItem(auth_id, token);
            if(user_type == "Admin"){
                navigate(`/admin-dashboard/${auth_id}/${user_type}`);
            }else{
                navigate(`/${auth_id}/${user_type}`);
            }

        } catch (error) {
            console.log("error : ",error);
        }
    }
    


  return (
    <div className="">
        <div className="ww-login-signup text-center my-5">WW</div>
      <div className="flex min-h-full md:w-1/2 mx-auto my-auto flex-col justify-center px-6 py-12 lg:px-8 shadow-2xl">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Log in to your account
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleLogin}>
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
                  autoComplete="email"
                  required=""
                  className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-slate-300 sm:text-sm/6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required=""
                  className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-slate-300 sm:text-sm/6"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-1/2 mx-auto justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-none focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Log in
              </button>
            </div>
          </form>
          <p className="mt-10 flex gap-3 justify-center text-center text-sm/6 text-gray-500">
            Not a member ?
            <Link to="/sign-up" className="text-indigo-600">create account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
