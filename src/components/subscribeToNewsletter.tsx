'use client';
import { useState } from "react";
import { integralCF } from "@/styles/fonts";

export default function Newsletter() {
    const [email, setEmail] = useState("");
    const [result, setResult] = useState("");
  
    const sumbitHandler = async (event: any) => {
      setEmail("");
      event.preventDefault();
      setResult("Sending....");
      const formData = new FormData(event.target);
      formData.append("access_key", "06617c84-b326-43c2-bf86-b41cd7efd1a0");
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
  
      const data = await response.json();
  
      if (data.success) {
        setResult("Form Submitted Successfully");
        event.target.reset();
      } else {
        console.log("Error", data);
        setResult(data.message);
      }
    };
    return (
        <section className="relative bg-black text-white py-8 rounded-3xl px-8 mx-[5vw] -mt-52 lg:-mt-40">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6 lg:gap-48 xl:px-12">
                <h2 className={`${integralCF.className} text-2xl md:text-3xl font-bold md:w-1/2`}>
                    STAY UPTO DATE ABOUT OUR LATEST OFFERS
                </h2>
                <form className="flex flex-col gap-4 w-full md:w-1/2 justify-start" onSubmit={sumbitHandler}>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(data) => setEmail(data.target.value)}
                        required
                        placeholder="Enter your email address"
                        className="px-4 py-3 rounded-full text-center text-black text-sm w-full md:w-96 max-w-full"
                    />
                    <input type="hidden" name="subject" value="New Newsletter Subscrioption Request"></input>
                    <button type="submit" className="bg-white text-black px-6 py-3 rounded-full font-semibold text-sm w-full md:w-96 max-w-full">
                        Subscribe to Newsletter
                    </button>
                </form>
            </div>
        </section>
    )
}