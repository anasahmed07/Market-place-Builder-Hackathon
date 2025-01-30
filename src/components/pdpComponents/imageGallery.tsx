import Image, { StaticImageData } from "next/image";
import { useState } from "react";

export default function ImageGallery({ images }: { images: StaticImageData[] | string[] }) {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="mx-7 grid grid-rows-4 lg:grid-rows-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 aspect-square lg:hidden row-span-3 w-full max-h-[60vh]">
            <Image
              src={mainImage}
              alt="main product image"
              className="w-full h-full object-center object-cover rounded-lg"
              width={1200}
              height={1200}
              priority={true}
            />
          </div>
          <div className="grid grid-cols-4 lg:grid-cols-1 lg:grid-rows-4 w-full max-w-2xl mx-auto row-span-1 gap-2 my-px md:gap-6" aria-orientation="vertical" role="tablist">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setMainImage(image)}
                  className={`aspect-square col-span-1 row-span-1 sm:max-w-48 sm:max-h-48 bg-gray-100 rounded-lg overflow-hidden ${mainImage === image && "ring-2 ring-black"}`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`product image ${index + 1}`}
                    width={1200}
                    height={1200}
                    className="w-full h-full object-cover"
                  />
                </button>
            ))}
          </div>
          <div className="lg:col-span-3 aspect-square hidden lg:block row-span-3 w-full max-h-[60vh]">
            <Image
              src={mainImage}
              alt="main product image"
              className="w-full h-full border border-gray-100 object-center object-cover rounded-lg"
              width={1200}
              height={1200}
              
            />
          </div>
        </div>
  );
}