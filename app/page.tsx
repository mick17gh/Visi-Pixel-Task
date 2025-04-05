import { getProducts } from '@/actions/get-products'
import { CreateProductModal } from '@/components/products/create-product-form'
import { ProductItem } from '@/components/products/product-item'
import { ProductSearchBox } from '@/components/products/products-searchbox'

import React from 'react'

export default async function Home({ searchParams }: { searchParams?: Promise<{ [name: string]: string | undefined }> }) {
  const nameFilter = (await searchParams)?.name || '';
  const data = await getProducts();

 
  const products = data.filter((product) => product.name.toLowerCase().includes(nameFilter.toLowerCase()))  
  
  return (
    <div className="w-full px-[50px] py-[30px]">
      <section className="">
        <div className="flex gap-4  items-center justify-between">
          <div>
          <h3 className="text-2xl font-bold text-sky-800">Product Catalog</h3>
          <p className="text-gray-500 italic">Manage your products</p>
          </div>
        
          <div>
            {/* <Button className="bg-sky-800">Add Product</Button> */}
            <CreateProductModal />
          </div>
        </div>
      </section>

      <section className="mt-4">
        <div className="flex gap-4 bg-white p-4 rounded-xl shadow-md items-center justify-between">
            <ProductSearchBox />
        </div>
      </section>

      <section>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4'>
          {products &&  products.map((product) => (
            <ProductItem key={product.id} item={product} />
          ))}
        </div>

        {products.length === 0 && (
          <div className="flex items-center justify-center">
            <p className="text-gray-500 italic">No products found</p> 
          </div>
        )}
      </section>


    </div>
  )
}
