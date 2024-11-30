import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/home/home';
import AdminDashboard from './pages/dashboards/admin-dashboard/AdminDashboard';
import SellerDashboard from './pages/dashboards/sellerDashboard/SellerDashboard';
import BuyerDashboard from './pages/dashboards/buyerDashboard/BuyerDashboard';
import Login from './pages/login/Login';
import SignUp from './pages/signup/SignUp';
import About from './pages/about/About';
import Shop from './pages/shop/Shop';
import ProductOverview from './pages/Overview/ProductOverview';

function App() {
  return (
    <>
      <Router>
            <Routes>
                <Route path='/' exact element={<Home />} />
                <Route path='/:auth_id/:user_type' exact element={<Home/>} />
                <Route path='/admin-dashboard/:auth_id/:user_type' exact element={<AdminDashboard/>} />
                <Route path='/seller-dashboard/:auth_id/:user_type' exact element={<SellerDashboard/>} />
                <Route path='/buyer-dashboard/:auth_id/:user_type' exact element={<BuyerDashboard/>} />
                <Route path='/login' exact element={<Login />} />
                <Route path='/sign-up' exact element={<SignUp />} />
                <Route path='/shop' exact element={<Shop />} />
                <Route path='/shop/:auth_id/:user_type' exact element={<Shop />} />
                <Route path='/About' exact element={<About />} />
                <Route path='/About/:auth_id/:user_type' exact element={<About />} />
                <Route path='/product-overview/:product_id/:user_type' exact element={<ProductOverview />} />
                <Route path='/product-overview/:auth_id/:product_id/:user_type' exact element={<ProductOverview />} />
            </Routes>
        </Router>
    </>
  )
}

export default App
