import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from './pages/login/Login';
import SignUp from "./pages/signup/SignUp";
import Home from "./pages/home/Home";
import Shop from "./pages/shop/Shop";
import SellerDashboard from './pages/dashboards/sellerDashboard/SellerDashboard'
import AdminDashboard from "./pages/dashboards/admin-dashboard/AdminDashboard";
import ProductOverview from './pages/product-overview/ProductOverview'
import WishList from "./pages/wish-list/WishList";
import Cart from "./pages/cart/Cart";
import Billing from "./pages/billing-page/Billing";
import BuyerDashboard from "./pages/dashboards/buyerDashboard/BuyerDashboard";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" exact element={<Login />} />
          <Route path="/sign-up" exact element={<SignUp />} />
          <Route path="/" exact element={<Home />} />
          <Route path="/:auth_id/:user_type" exact element={<Home />} />
          <Route path="/shop" exact element={<Shop />} />
          <Route path="/shop/:auth_id/:user_type" exact element={<Shop />} />
          <Route path="/buyer-dashboard/:auth_id/:user_type" exact element={<BuyerDashboard />} />
          <Route path="/seller-dashboard/:auth_id/:user_type" exact element={<SellerDashboard />} />
          <Route path="/admin-dashboard/:auth_id/:user_type" exact element={<AdminDashboard />} />
          <Route path="/product-overview/:product_id" exact element={<ProductOverview />} />
          <Route path="/product-overview/:auth_id/:user_type/:product_id" exact element={<ProductOverview />} />
          <Route path="/wish-list/:auth_id/:user_type" exact element={<WishList />} />
          <Route path="/cart/:auth_id/:user_type" exact element={<Cart />} />
          <Route path="/billing/:auth_id/:user_type/:product_id" exact element={<Billing />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;