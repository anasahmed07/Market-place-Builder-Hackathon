import Image from 'next/image'


export default function BrandLogoBanner() {
  const brands = [
    { name: 'Versace', logo: '/images/brandLogos/versace-logo.svg' },
    { name: 'Zara', logo: '/images/brandLogos/zara-logo.svg' },
    { name: 'Gucci', logo: '/images/brandLogos/gucci-logo.svg' },
    { name: 'Prada', logo: '/images/brandLogos/prada-logo.svg' },
    { name: 'Calvin Klein', logo: '/images/brandLogos/calvin-klein-logo.svg' },
  ]
  
  return (
    <div className="bg-black">
      <div className="max-w-frame mx-auto flex flex-wrap items-center justify-center md:justify-between py-2 sm:py-5 md:py-0 sm:px-4 xl:px-0 space-x-7">
        {brands.map((brand) => (
          <Image
            key={brand.name}
            priority
            src={brand.logo}
            height={0}
            width={0}
            alt={brand.name}
            className="h-auto w-auto max-w-[116px] lg:max-w-48 max-h-[26px] my-5 md:my-11"
          />
        ))}
      </div>
    </div>
  )
}