import { Product } from "@/types"
import { ShoppingBasket } from "lucide-react"
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  item: Product
}

export const ProductItem = ({ item }: Props) => {
    return (
        <div className='bg-white p-3 rounded-2xl shadow-xl hover:shadow-2xl'>
            <Link href={`/products/${item.slug}`}>
            <div>
              <Image src={item.url} alt="Product Image" width={300} height={300} className="w-full h-[180px] object-cover rounded-xl" />
            </div>
            <div className='p-2 flex items-center justify-between'>
              <div>
              <h3 className="text-md text-sky-700 font-semibold">{item.name}</h3>
              <p className="text-slate-500 text-sm">£{item.price}</p>
              </div>
              <div>
                  <ShoppingBasket className='w-8 h-8 text-slate-300' />
              </div>
            </div>
            </Link>
          </div>
    )
}