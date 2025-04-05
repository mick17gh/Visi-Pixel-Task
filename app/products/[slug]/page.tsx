import { getProductBySlug } from '@/actions/get-products';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export default async function ProductDetailsPage({
    params
}: {
    params: Promise<{ [slug: string]: string }>
}) {
    const { slug } = await params;
    const product = await getProductBySlug(slug);
    if (!product) {
        return (<div className="w-full px-[50px] py-[30px] text-center">Product does not exist go back to <Link href="/" className='text-sky-700'>products</Link></div>);
    }
  return (
    <div className="w-full px-[50px] py-[30px]">
        <section className="">
                <div className="flex gap-4  items-center">
                <div>
                    <Link href="/" className='text-sky-700'><Button variant="secondary" className='bg-gray-200'><ArrowLeft className="size-4" /></Button></Link>
                  </div>
                  <div>
                    <h3 className="text-md font-bold text-sky-800">Product details: {product.name}</h3>
                  </div>
                 
                </div>
              </section>

        <section className="mt-8">
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 items-center'>
                <div>
                    <Image src={product.url} alt="Product Image" width={500} height={500} className="w-full h-[380px] object-cover rounded-xl shadow-2xl" />
                </div>
                <div>
                    <h3 className="text-2xl md:text-4xl font-bold text-sky-800">{product.name}</h3>
                    <p className="text-gray-500 italic">{product.description}</p>
                    <p className="text-sky-500 text-xl italic mt-4">Best Price: £{product.price}</p>
                </div>
            </div>
        </section>
    </div>
  )
}
