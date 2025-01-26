import { Faqs, Review } from "@/lib/types";

interface TabsPropsData {
  Faqs: Faqs[];
  productDetails: string[];
  reviews: Review[];
}

import { useState } from "react";
import ReviewCard from "../review";

const ProductDetailPageTabs = ( tabsData : TabsPropsData ) => {
    const [activeTab, setActiveTab] = useState('Product Details');
  return (
   <div className="">
           <div className="border-b border-gray-200">
             <nav className="-mb-px flex justify-evenly" aria-label="Tabs">
               {["Product Details", "Ratings and Reviews", "FAQ's"].map((tab) => (
                 <button
                   key={tab}
                   onClick={() => setActiveTab(tab)}
                   className={`${
                     activeTab === tab
                       ? 'border-black pb-5 text-black'
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
                  {tabsData.productDetails.map((detail) => {
                    return (
                      <div className="max-w-7xl">
                      <ul className="list-disc pl-5 space-y-2">
                        {tabsData.productDetails.map((detail) => (
                          <li>{detail}</li>
                        ))}
                      </ul>
                    </div>
                    )
                  })}
               </div>
             )}
   
             {activeTab === 'Ratings and Reviews' && (
               <div>
                 <div className="mt-6 grid sm:grid-cols-2 md:grid-cols-3 gap-2">
                   {tabsData?tabsData.reviews.map((review:Review) => (
                     <ReviewCard key={review.author} customerReview={review} />
                   )):  <div className="text-center py-16 text-gray-500">
                   No product details available.
                 </div>}
                 </div>
               </div>
             )}
   
             {activeTab === "FAQ's" && (
               <div>
                  {tabsData.Faqs.map((faq:Faqs) => {
                    return (
                      <div key={faq.question}>
                        <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
                        <p className="mt-4 text-gray-500">{faq.answer}</p>
                      </div>
                    )
                  })}
               </div>
             )}
           </div>
         </div>
  )
}

export default ProductDetailPageTabs