import HeroSection from "../../components/homepageComponents/hero";
import BrowseByDressStyle from "../../components/homepageComponents/browseByDressStyle";
import BrandLogoBanner from "@/components/homepageComponents/brandLogoBanner";
import ProductCardGroup from "@/components/productCardGroup";
import { TypeProduct } from "@/lib/types";
import ReviewCarousel from "@/components/reviewCarausel";
import { fetchproducts } from "@/lib/utils";

const reviews = [
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

export default async function Home() {
  const newArrivalProducts:TypeProduct[] = await fetchproducts("newarrival")
  const topSellingProducts:TypeProduct[] = await fetchproducts("topselling")
  return (
    <main>
      <HeroSection/>
      <BrandLogoBanner/>
      <ProductCardGroup products={newArrivalProducts} url="new-arrivals" title="NeW ARRIVALS"/>
      <ProductCardGroup products={topSellingProducts} url="top-selling" title="TOP SELLING"/>
      <BrowseByDressStyle />
      <ReviewCarousel reviews={reviews} />
    </main>
  );
}

