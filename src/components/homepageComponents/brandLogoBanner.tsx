import Image from 'next/image'


export default function BrandLogoBanner() {
  const brands = [
    { name: 'Versace', logo: '/icons/brandLogos/versace-logo.svg' },
    { name: 'Zara', logo: '/icons/brandLogos/zara-logo.svg' },
    { name: 'Gucci', logo: '/icons/brandLogos/gucci-logo.svg' },
    { name: 'Prada', logo: '/icons/brandLogos/prada-logo.svg' },
    { name: 'Calvin Klein', logo: '/icons/brandLogos/calvin-klein-logo.svg' },
  ]
  
  return (
    <div className="bg-black">
      <div className="max-w-frame mx-auto flex flex-wrap items-center justify-center md:justify-around py-2 sm:py-5 md:py-0 sm:px-4 xl:px-0 space-x-7">
        {brands.map((brand) => (
          <Image
            key={brand.name}
            priority
            src={brand.logo}
            height={0}
            width={0}
            alt={brand.name}
            className="h-auto w-auto max-w-32 lg:max-w-48 max-h-6 my-5 md:my-11"
          />
        ))}
      </div>
    </div>
  )
}