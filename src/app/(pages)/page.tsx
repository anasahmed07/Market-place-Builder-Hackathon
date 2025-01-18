import HeroSection from "../../components/homepageComponents/hero";
import BrowseByDressStyle from "../../components/homepageComponents/browseByDressStyle";
import BrandLogoBanner from "@/components/homepageComponents/brandLogoBanner";
import ProductCardGroup from "@/components/productCardGroup";
import { TypeProduct } from "@/lib/utils";
import ReviewCarousel from "@/components/reviewCarausel";

let newArrivalProducts:TypeProduct[] = [
  { name: 'T-shirt with Tape Details', price: 120, rating: 5, image: "/images/products/t-shirt-with-taped-details.png", slug: "t-shirt-with-tape-details", category: "t-shirt" },
  { name: 'Skinny Fit Jeans', price: 240, oldPrice: 260, rating: 4.5, image: "/images/products/skinny-fit-jeans.png", slug: "skinny-fit-jeans", category: "jeans" },
  { name: 'Checkered Shirt', price: 180, rating: 4.7, image: "/images/products/checkerd-shirt.png", slug: "checkered-shirt", category: "shirt" },
  { name: 'Sleeve Striped T-shirt', price: 130, oldPrice: 160, rating: 4.8, image: "/images/products/sleeve-striped-t-shirt.png", slug: "sleeve-striped-t-shirt", category: "t-shirt" },
]

let topSellingProducts:TypeProduct[] = [
  { name: 'Vertical Striped Shirt', price: 212, oldPrice: 232, rating: 5, image: "/images/products/vertical-striped.png", slug: "vertical-striped-shirt", category: "t-shirt" },
  { name: 'Courage Graphic T-shirt', price: 145, rating: 4.3, image: "/images/products/courage-graphic.png", slug: "courage-graphic-t-shirt", category: "t-shirt" },
  { name: 'Loose Fit Bermuda Shorts', price: 80, rating: 4, image: "/images/products/loose-fit.png", slug: "loose-fit-bermuda-shorts", category: "shorts" },
  { name: 'Faded Skinny Jeans', price: 210, rating: 4.5, image: "/images/products/faded-skinny-jeans.png", slug: "faded-skinny-jeans", category: "jeans" },
]

const customers = [
  { author: 'Sarah M.', rating: 5, content: "I'm blown away by the quality and style of the clothes I received. From casual to formal, every piece exceeded my expectations!",date:"January 5 2024" },
  { author: 'Alex K.', rating: 5, content: "Finding clothes that align with my personal style used to be a challenge until I discovered Shopco. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.",date:"January 5 2024" },
  { author: 'James L.', rating: 5, content: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shopco. The selection of clothes is not only diverse but also on-point with the latest trends.",date:"January 5 2024" },
  { author: 'Emily R.', rating: 5, content: "I love how easy it is to mix and match different pieces to create unique outfits. The quality is fantastic and the prices are reasonable.",date:"January 5 2024" },
  { author: 'Sophia W.', rating: 5, content: "Shopco has completely transformed my wardrobe! Every piece is stylish, versatile, and made with amazing quality. I'm beyond impressed.",date:"January 5 2024" },
  { author: 'Liam H.', rating: 5, content: "Shopping for clothes online has never been this easy and satisfying. Shopco's collections always hit the mark for style and comfort!",date:"January 5 2024" },
  { author: 'Olivia P.', rating: 5, content: "I get compliments on my outfits all the time, thanks to Shopco! The variety and attention to detail in their clothing is unmatched.",date:"January 5 2024" },
  { author: 'Ethan B.', rating: 5, content: "I was skeptical about shopping online, but Shopco changed my mind. The clothes fit perfectly and look even better in person!",date:"January 5 2024" },
  { author: 'Ava D.', rating: 5, content: "The customer service, the quality, and the style—Shopco nails it every time. I can't imagine shopping anywhere else now.",date:"January 5 2024" },

]


export default function Home() {
  return (
    <main>
      <HeroSection/>
      <BrandLogoBanner/>
      <ProductCardGroup products={newArrivalProducts} url="new-arrivals" title="NeW ARRIVALS"/>
      <ProductCardGroup products={topSellingProducts} url="top-selling" title="TOP SELLING"/>
      <BrowseByDressStyle />
      <ReviewCarousel customers={customers} />
    </main>
  );
}

