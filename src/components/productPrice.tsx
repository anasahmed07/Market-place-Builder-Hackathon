
interface ProductPriceProps {
    price: number;
    discount?: number;
    pdp?:boolean;
}

export default function (props: ProductPriceProps) {
    if (!props.discount) {
        return (
            <span className={props.pdp?`my-9 text-2xl font-bold text-gray-900`:`text-lg font-bold text-gray-900`}>${ props.price }</span>
        )
    }
    else {
        return (
            <div className={props.pdp?`my-4 inline-flex items-center space-x-2`:`inline-flex items-center space-x-2`}>
                <span className={props.pdp?`text-2xl font-bold text-gray-900`:`text-lg font-bold text-gray-900`}>${ props.price - props.price*props.discount/100 }</span>
                <span className={props.pdp?`ml-4 text-2xl font-bold text-gray-400 line-through`:`ml-2 text-lg font-bold text-gray-400 line-through`}>${ props.price }</span>
                <span className={props.pdp?`ml-4 py-1 px-4 text-lg  text-red-400 bg-red-100 rounded-full`:`ml-2 py-1 px-2 text-xs  text-red-400 bg-red-100 rounded-full`}>-{ props.discount }%</span>
            </div>
     )
    }
}