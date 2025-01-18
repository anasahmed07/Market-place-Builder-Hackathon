
interface ProductPriceProps {
    price: number;
    discount?: number;
}

export default function (props: ProductPriceProps) {
    if (!props.discount) {
        return (
            <span className="text-lg font-bold text-gray-900">${ props.price }</span>
        )
    }
    else {
        return (
            <div className="inline-flex items-center space-x-2">
                <span className="text-lg font-bold text-gray-900">${ props.price - props.price*props.discount/100 }</span>
                <span className="ml-2 text-lg font-bold text-gray-400 line-through">${ props.price }</span>
                <span className="ml-2 py-1 px-2 text-xs  text-red-400 bg-red-100 rounded-full">-{ props.discount }%</span>
            </div>
     )
    }
}