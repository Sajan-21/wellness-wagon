import { faIndianRupee } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function OfferNav() {
  return (
    <div>
      <p className="flex h-10 items-center justify-center bg-slate-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
        Get 20% discount on orders over $100 or <span>100 <FontAwesomeIcon icon={faIndianRupee} /></span>
      </p>
    </div>
  )
}

export default OfferNav