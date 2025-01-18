import { Star } from "lucide-react";

export default function Rating(prams: { rating: number, number?: boolean }) {
  return (
    <div className="flex items-center py-2">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < Math.floor(prams.rating) ? "text-yellow-400 fill-current" : "text-gray-300 fill-current"}`}
        />
      ))}
      {(prams.number == true) ? <span className="ml-1 text-xs text-gray-500">{prams.rating}/5</span> : null}
    </div>
  );
};