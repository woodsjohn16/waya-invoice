'use client'

import { useEffect, useState } from "react";
import { ArrowPathIcon } from '@heroicons/react/24/solid'
import Invoices from "./ui/invoices/invoices";

async function getInvoices(page: number | 1) {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL;
  const res = await fetch(`${url}/api/invoices?page=${page}`, {
    cache: 'no-store',
    headers: {
      Authorization: `${process.env.NEXT_PUBLIC_API_KEY}`,
    },
  })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  const data = await res.json()

  return data;
}

export default function Home() {
  const [isFetching, setFetching] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [invoices, setInvoices] = useState<null | { data: any, pagination: any }>(null)

  const fetchInvoices = async (currentPage: number) => {
    const data = await getInvoices(currentPage)
    setInvoices(data)
    setFetching(false)
  }

  useEffect(() => {
    if (isFetching) {
      fetchInvoices(currentPage)
    }
  }, [currentPage, isFetching])


  return (
    <main className="flex min-h-screen flex-col items-center p-10">
      <div className="text-center text-5xl pb-10">
        Invoices
      </div>
      <div className="text-[1em] w-full lg:w-9/12">
        {isFetching && (
          <ArrowPathIcon className="w-5 animate-spin absolute top-2/4 left-2/4" />
        )}

        {
          !isFetching && invoices && invoices.data
          && <Invoices
            setFetching={setFetching}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={invoices.pagination.pages}
            data={invoices.data} />
        }
      </div>
    </main>
  );
}
