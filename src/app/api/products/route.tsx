import { fetchproducts } from "@/lib/utils";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const products = await fetchproducts();
    return new Response(JSON.stringify(products), {
      headers: { "Content-Type": "application/json" },
    });
    
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: "Failed to fetch products" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}