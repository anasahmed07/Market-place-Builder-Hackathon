'use client';

import { useState } from "react";

const ProductDetailPageTabs = () => {
    const [activeTab, setActiveTab] = useState('Product Details');
  return (
   <div className="mt-16">
           <div className="border-b border-gray-200">
             <nav className="-mb-px flex justify-evenly" aria-label="Tabs">
               {["Product Details", "Ratings and Reviews", "FAQ's"].map((tab) => (
                 <button
                   key={tab}
                   onClick={() => setActiveTab(tab)}
                   className={`${
                     activeTab === tab
                       ? 'border-black  text-black'
                       : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                   } whitespace-nowrap w-full py-4 px-1 border-b-2 font-medium text-lg`}
                 >
                   {tab}
                 </button>
               ))}
             </nav>
           </div>
   
           <div className="mt-6">
             {activeTab === 'Product Details' && (
               <div>
                 <h3 className="text-lg font-medium text-gray-900">Product Details</h3>
                 <p className="mt-4 text-gray-500">
                   {/* {product.details} */}
                 </p>
               </div>
             )}
   
             {activeTab === 'Ratings and Reviews' && (
               <div>
                 <h3 className="text-lg font-medium text-gray-900">Customer Reviews</h3>
                 <div className="mt-6 grid sm:grid-cols-2 md:grid-cols-3 gap-2">
                   {/* {product.reviews.map((review:Review) => (
                     <ReviewCard key={review.author} customerReview={review} />
                   ))} */}
                 </div>
               </div>
             )}
   
             {activeTab === "FAQ's" && (
               <div>
                 <h3 className="text-lg font-medium text-gray-900">Frequently Asked Questions</h3>
                 <p className="mt-4 text-gray-500">
                   {/* {product.faqs} */}
                 </p>
               </div>
             )}
           </div>
         </div>
  )
}

export default ProductDetailPageTabs