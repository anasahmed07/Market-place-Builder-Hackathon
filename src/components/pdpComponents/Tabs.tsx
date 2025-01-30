import { detailsTabData, Faqs, Review } from "@/lib/types";
import { useState } from "react";
import ReviewCard from "../review";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const ProductDetailPageTabs = (tabsData: detailsTabData) => {
  const [activeTab, setActiveTab] = useState('Product Details');
  return (
    <div className="">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex justify-evenly" aria-label="Tabs">
          {["Product Details", "Ratings and Reviews", "FAQ's"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`${activeTab === tab
                  ? 'border-black pb-5 text-black'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap w-full py-4 px-1 border-b-2 font-medium text-sm sm:text-lg`}
              aria-current={activeTab === tab ? 'page' : undefined}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      <div className="m-6">
        {activeTab === 'Product Details' && (
          <div className="max-w-7xl">
            <ul className="list-disc pl-5 space-y-2">
              {tabsData.productDetails.map((detail) => {
                return (
                  <li key={detail}>{detail}</li>
                )
              })}
            </ul>
          </div>
        )}

        {activeTab === 'Ratings and Reviews' && (
          <div>
            <div className="mt-6 grid sm:grid-cols-2 md:grid-cols-3 gap-2">
              {tabsData ? tabsData.reviews.map((review: Review) => (
                <ReviewCard key={review.author} customerReview={review} />
              )) : <div className="text-center py-16 text-gray-500">
                No product details available.
              </div>}
            </div>
          </div>
        )}

        {activeTab === "FAQ's" && (
          <div>
            {tabsData.faqs.map((faq: Faqs,index) => {
              return (
                <Accordion type="single" key={faq.question} collapsible className="w-full">
                  <AccordionItem value={`question ${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductDetailPageTabs