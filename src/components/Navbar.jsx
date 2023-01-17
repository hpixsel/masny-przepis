import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faCakeCandles } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import React from 'react'

export default function Navbar() {
  return (
    <nav className='bg-neutral-900/95 sticky top-0 z-50'>
      <div className="container mx-auto p-3 flex items-center justify-between">
        <Link href="/" className='text-xl font-semibold'><FontAwesomeIcon icon={faCakeCandles} className="mr-1" /> Masny Przepis</Link>
        <div className="flex gap-3 text-md">
          <Link href="#!" className='text-neutral-300 hover:text-white'>Wszystkie</Link>
          <Link href="#!" className='text-neutral-300 hover:text-white flex gap-2 items-center'>Dodaj
            <FontAwesomeIcon icon={faPlus} className="bg-neutral-700 p-1 rounded" />
          </Link>
        </div>
      </div>
    </nav>
  )
}
