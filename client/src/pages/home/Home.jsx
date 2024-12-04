import React from 'react'
import Nav from '../../components/nav/Nav'
import OfferNav from '../../components/offer-component/OfferNav'
import NewArrivals from './page-contents/NewArrivals'
import SpecialOffers from './page-contents/SpecialOffers'

function Home() {
  return (
    <div>
        <OfferNav />
        <Nav />
        <NewArrivals />
        <SpecialOffers />
    </div>
  )
}

export default Home