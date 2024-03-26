'use client'

import { useState } from "react";
import { PencilIcon, ChevronDoubleDownIcon, CheckIcon, ArrowPathIcon, XMarkIcon } from '@heroicons/react/24/solid'
import InvoiceInfo from "./invoiceInfo";

interface InvoiceRowProps {
  id: number
  price: string
  quantity: number
  text: string
}

interface InvoicesProps {
  item: {
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
    invoice_rows?: InvoiceRowProps[] | undefined;
  }
}

function Invoice({ item }: InvoicesProps) {
  const [previewInvoice, setPreviewInvoice] = useState(false);
  const [edit, setEdit] = useState(false);
  const [invoice, setInvoice] = useState(item);
  const [isFetching, setIsFetching] = useState(false);
  const [fetchingInvoice, setFetchingInvoice] = useState(false);
  const hideField = ['id', 'ocr', 'created_at', 'invoice_date', 'customer_name', 'invoice_rows'];

  const handleOnChange = (e: any, target: string) => {
    const currentInvoice = invoice;
    currentInvoice[target] = e.target.value
    setInvoice({ ...currentInvoice })
  }

  const handleSave: any = async () => {
    const url = process.env.NEXT_PUBLIC_API_BASE_URL;
    setIsFetching(true)
    await fetch(`${url}/api/invoices/${invoice.id}`, {
      headers: {
        Authorization: `${process.env.NEXT_PUBLIC_API_KEY}`,
      },
      method: 'PUT',
      body: JSON.stringify(invoice),
    });
    setEdit(false)
    setIsFetching(false)
  }

  const getInvoiceData: any = async (id: number) => {
    setFetchingInvoice(true)
    const url = process.env.NEXT_PUBLIC_API_BASE_URL;
    const res = await fetch(`${url}/api/invoices/${id}`, {
      cache: 'no-store',
      headers: {
        Authorization: `${process.env.NEXT_PUBLIC_API_KEY}`,
      },
    })

    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }

    const { data } = await res.json()

    setInvoice(data)
    setFetchingInvoice(false)
  }

  return (
    <div className={`p-5 border-[#ebebeb] rounded-md w-full min-h-[150px] flex justify-center items-center flex-col hover:border-[#afafaf] cursor-pointer bg-white transition-all`}>
      <strong>{invoice.ocr}</strong>
      <div className="flex gap-3 relative text-center">
        {edit ? <input type="text" className="border-b-[1px] text-center" value={invoice.customer_name} onChange={(e) => handleOnChange(e, 'customer_name')} /> : invoice.customer_name}
        {previewInvoice && !edit &&
          <PencilIcon className="w-3 absolute -right-4 top-2" onClick={() => {
            setEdit(!edit)
          }} />
        }
      </div>

      <ChevronDoubleDownIcon className="mt-4 bg-slate-900 flex items-center justify-center w-[30px] h-[30px] p-1 text-slate-100 rounded-full "
        onClick={() => {
          setPreviewInvoice(!previewInvoice)
          getInvoiceData(invoice.id)
          setEdit(false)
        }} />
      {previewInvoice && (
        <div className="py-2 text-center border-t-[1px] border-[#f5f5f5] mt-4 flex flex-col gap-2">
          {edit ?
            <>
              {Object.keys(invoice).filter(item => !hideField.includes(item)).map((invoiceKey, idx) => (
                <div key={idx}>
                  <div className="text-xs text-center capitalize font-bold">{invoiceKey.replace('_', ' ')}</div>
                  <input type="text" placeholder={invoiceKey.replace('_', ' ')} className="border-b-[1px] text-xs text-center capitalize" value={invoice[invoiceKey]} onChange={(e) => handleOnChange(e, invoiceKey)} />
                </div>
              ))}
            </>
            : (
              <InvoiceInfo invoice={invoice} isLoading={fetchingInvoice} />
            )}
        </div>
      )}

      {edit
        ? isFetching
          ? <ArrowPathIcon className="w-5 animate-spin" />
          : (
            <div className="flex gap-3">
              <CheckIcon className="w-5" onClick={() => handleSave()} />
              <XMarkIcon className="w-5" onClick={() => setEdit(!edit)} />
            </div>
          )
        : ''
      }
    </div>
  )
}

export default Invoice
