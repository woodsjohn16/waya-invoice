import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/solid'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import Invoice from "./invoice"

interface InvoicesProps {
  data: [
    id: number,
    ocr: number,
    customer_name: string,
    customer_address: string,
    created_at: string,
    due_date: string,
    invoice_date: string,
    customer_zip: string,
    customer_city: string,
    customer_country: string,
    delivery_name: string,
    delivery_address: string,
    delivery_zip: string,
    delivery_city: string,
    delivery_country: string
  ],
  setFetching: (isFetch: boolean) => void,
  setCurrentPage: (currPage: number) => void,
  currentPage: number,
  totalPages: number
}

function Invoices({ data, setFetching, setCurrentPage, currentPage, totalPages }: InvoicesProps) {

  return (
    <>
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
        <Masonry columnsCount={4} gutter="10px">
          {data && data.map((item: any) =>
            <Invoice item={item} key={item.id} />)}
        </Masonry>
      </ResponsiveMasonry>

      <div className='flex justify-center items-center pt-5 gap-2'>
        <div className='cursor-pointer border-[1px] border-[#616161] rounded-sm p-2' onClick={() => {
          if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
            setFetching(true)
          }
        }}>
          <ChevronLeftIcon className='w-5' />
        </div>
        <div className='min-w-5 text-center'>
          {currentPage}
        </div>
        <div className='cursor-pointer border-[1px] border-[#616161] rounded-sm p-2' onClick={() => {
          if (totalPages > currentPage) {
            setCurrentPage(currentPage + 1)
            setFetching(true)
          }
        }}>
          <ChevronRightIcon className='w-5' />
        </div>
      </div>
    </>
  )
}

export default Invoices
