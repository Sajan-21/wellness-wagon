import React from "react";
import "./home.css";
import Nav from "../../components/navbar/Nav";
import NewArrivals from "../../components/newArrivals/NewArrivals";
import BudgetFriendly from "../../components/budgetFriendly/BudgetFriendly";
import SpecialOffers from "../../components/specialOffers/SpecialOffers";

function Home() {
  return (
    <div>
      <p className="flex h-10 items-center justify-center bg-slate-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
        Get free delivery on orders over $100
      </p>
      <Nav />
      <NewArrivals />
      <SpecialOffers />
      <BudgetFriendly />
    </div>
  );
}

export default Home;
