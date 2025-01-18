'use client';

import { useState, useEffect } from "react";
import ReviewCard from "@/components/review";
import { Review } from "@/lib/utils";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { integralCF, satoshi } from "@/styles/fonts";

export default function ReviewCarousel(prams: { customers: Review[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(1); // Number of cards visible at a time

  // Dynamically calculate visible cards based on screen width
  useEffect(() => {
    const updateVisibleCards = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth >= 768) setVisibleCards(3); // 3 cards for md and above
      else setVisibleCards(1); // 1 card for smaller screens
    };
    updateVisibleCards();

    window.addEventListener("resize", updateVisibleCards);
    return () => window.removeEventListener("resize", updateVisibleCards);
  }, []);

  const totalSlides = Math.ceil(prams.customers.length / visibleCards); // Total number of slides

  const nextSlide = () => { setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides); };
  const prevSlide = () => { setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides); };


  return (
    <section className={`${satoshi.className} mb-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16`}>
      <div className="flex justify-between items-center mb-8">
        <h2 className={`${integralCF.className} text-3xl sm:text-4xl font-extrabold text-black`}>OUR HAPPY CUSTOMERS</h2>
        <div className="flex space-x-2">
          <button onClick={prevSlide} className="p-2 rounded-full bg-white hover:bg-gray-100">
            <ArrowLeft className="h-4 w-4 sm:h-6 sm:w-6" />
          </button>
          <button onClick={nextSlide} className="p-2 rounded-full bg-white hover:bg-gray-100">
            <ArrowRight className="h-4 w-4 sm:h-6 sm:w-6" />
          </button>
        </div>
      </div>
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * (100 / visibleCards)}%)` }}
        >
          {prams.customers.map((review, index) => (
            <ReviewCard key={index} customerReview={review} />
          ))}
        </div>
      </div>
    </section >
  );
};
