import { ArrowPathIcon } from '@heroicons/react/24/solid'

interface InvoiceRowProps {
  id: number
  price: string
  quantity: number
  text: string
}

interface InvoicesProps {
  invoice: {
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
  },
  isLoading?: boolean
}

function InvoiceInfo({ invoice, isLoading }: InvoicesProps) {
  const hideField = ['id', 'ocr', 'created_at', 'customer_name', 'invoice_rows'];
  return (
    <>
      {Object.keys(invoice).filter(item => !hideField.includes(item)).map((invoiceKey, idx) => {
        return (
          <p key={idx} className="text-xs capitalize"><strong>{invoiceKey.replace('_', ' ')}:</strong> {invoice[invoiceKey]}</p>
        )
      })}

      <div className="relative text-center flex items-center flex-col gap-2">
        <div className="mt-5 font-semibold uppercase text-xs leading-3 tracking-wide">Invoices</div>
        {isLoading && <ArrowPathIcon className="w-5 animate-spin py-5" />}
        {!isLoading && invoice?.invoice_rows?.map((invoiceRow: any) => (
          <div key={invoiceRow.id} className="bg-slate-200 p-5 rounded-sm w-full">
            <p className="text-xs">{invoiceRow.text} <strong>{invoiceRow.quantity > 1 ? `x ${invoiceRow.quantity}` : ''}</strong></p>
            <p className="text-xs font-bold">${invoiceRow.price}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default InvoiceInfo
