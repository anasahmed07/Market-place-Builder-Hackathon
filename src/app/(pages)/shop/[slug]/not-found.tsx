export default function NotFound(){
  console.log('Product not found')

  return(
      <div className="h-[70vh] mb-20 w-[100vw] flex flex-col justify-center items-center bg-white">
          <h1 className="text-6xl font-bold">404</h1>
          <p className="text-3xl font-semibold">Product not found</p>
      </div>
  )
}