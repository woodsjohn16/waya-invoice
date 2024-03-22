'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  console.log(currentPage);
  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    console.log(params)
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };
  return (
    <div className='flex gap-5'>
      <button type="button">{'<'}</button>
      <button type="button" onClick={() => createPageURL}>{'>'}</button>
      {currentPage}
      {' '}
      total of {totalPages}
    </div>
  )
}