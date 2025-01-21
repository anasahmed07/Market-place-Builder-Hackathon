import { Skeleton } from '@/components/ui/skeleton'; // Assuming you're using a Skeleton component

export default function ProductDetailSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mb-10">
      {/* Breadcrumb Skeleton */}
      <div className="flex mb-8 text-sm">
        <Skeleton className="h-5 w-14" />
        <Skeleton className="h-5 w-2 mx-2" />
        <Skeleton className="h-5 w-12" />
        <Skeleton className="h-5 w-2 mx-2" />
        <Skeleton className="h-5 w-36" />
        {/* <Skeleton className="h-4 w-2 mx-1" />
        <Skeleton className="h-4 w-24" /> */}
      </div>

      {/* Product Grid Skeleton */}
      <div className="grid  md:grid-cols-2 md:gap-x-8 md:items-start">
        {/* Image Gallery Skeleton */}
        <div className="grid grid-rows-4 sm:grid-rows-none sm:grid-cols-4 gap-6">
          <div className="col-span-1 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
            <div className="grid md:grid-rows-4 gap-6">
              {[...Array(4)].map((_, index) => (
                <Skeleton key={index} className="h-24 max-w-28 rounded-md" />
              ))}
            </div>
          </div>
          <div className="col-span-3 w-full bg aspect-w-1 aspect-h-1">
            <Skeleton className="w-full h-full rounded-lg" />
          </div>
        </div>

        {/* Product Info Skeleton */}
        <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
          <Skeleton className="h-12 w-full mb-4" /> {/* Title */}
          <div className="flex items-center space-x-2">
            <Skeleton className="h-5 w-16" /> {/* Rating */}
            <Skeleton className="h-4 w-10" /> {/* Reviews */}
          </div>
          <Skeleton className="h-4 w-full mt-6" /> {/* Description */}
          <Skeleton className="h-4 w-3/4 mt-2" />
          <div className='flex space-x-4 mt-6'>
            <Skeleton className="h-8 w-12" /> {/* Price */}
            <Skeleton className="h-8 w-12" />
            <Skeleton className="h-10 w-16 ml-8 rounded-full" />
          </div>
          {/* Color Selector Skeleton */}
          <div className="mt-6">
            <Skeleton className="h-4 w-16 mb-2" /> {/* Color Label */}
            <div className="flex space-x-3">
              {[...Array(3)].map((_, index) => (
                <Skeleton key={index} className="h-8 w-8 rounded-full" />
              ))}
            </div>
          </div>

          {/* Size Selector Skeleton */}
          <div className="mt-6">
            <Skeleton className="h-4 w-16 mb-2" /> {/* Size Label */}
            <div className="flex space-x-3">
              {[...Array(4)].map((_, index) => (
                <Skeleton key={index} className="h-10 w-16 rounded-full" />
              ))}
            </div>
          </div>

          {/* Quantity and Add to Cart Skeleton */}
          <div className="mt-10 flex gap-4 sm:flex-col1">
            <Skeleton className="h-10 w-32 rounded-full" /> {/* Quantity Selector */}
            <Skeleton className="h-10 w-full rounded-full" /> {/* Add to Cart Button */}
          </div>
        </div>
      </div>

      {/* Tabs Skeleton */}
      <div className="mt-16">
        <div className="border-b border-gray-200">
          <div className="flex justify-evenly">
            {[...Array(3)].map((index) => (
              <Skeleton key={index} className="h-10 w-36 mb-5" />
            ))}
          </div>
        </div>
        <div className="mt-6">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4 mt-2" />
          <Skeleton className="h-4 w-1/2 mt-2" />
        </div>
      </div>

      {/* Related Products Skeleton */}
      <div className="mt-16 pt-16 border-t">
        <Skeleton className="mx-auto h-10 w-3/6 mb-10" /> {/* Related Products Title */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="space-y-4">
              <Skeleton className="h-48 w-full rounded-lg" /> {/* Product Image */}
              <Skeleton className="h-4 w-3/4" /> {/* Product Name */}
              <Skeleton className="h-4 w-1/2" /> {/* Product Price */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}