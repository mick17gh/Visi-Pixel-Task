"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import qs from "query-string"
import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react"

export function ProductSearchBox() {
  const [searchValue, setSearchValue] = useState('')
  const router = useRouter()

  useEffect(() => {
    const timeout = setTimeout(() => {
      const query = qs.stringifyUrl(
        {
          url: '/',
          query: {
            name: searchValue,
          },
        },
        { skipEmptyString: true, skipNull: true }
      )

      router.push(query)
    }, 500) // wait 500ms after typing

    return () => clearTimeout(timeout) // cleanup previous timeout
  }, [searchValue, router])

  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input
        type="search"
        placeholder="Search by name"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <SearchIcon className="w-5 h-5 text-slate-300" />
    </div>
  )
}
