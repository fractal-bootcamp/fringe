import Link from 'next/link'
import { UserCircleIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline'

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col md:flex-row md:space-x-8 space-y-6 md:space-y-0">
        <Link 
          href="/clients" 
          className="group flex flex-col items-center justify-center px-12 py-8 bg-white border-2 border-black rounded-lg hover:bg-black hover:text-white transition-all duration-300"
        >
          <UserCircleIcon className="w-16 h-16 mb-4" />
          <span className="text-xl font-semibold">Clients</span>
        </Link>
        
        <Link 
          href="/companies" 
          className="group flex flex-col items-center justify-center px-12 py-8 bg-white border-2 border-black rounded-lg hover:bg-black hover:text-white transition-all duration-300"
        >
          <ComputerDesktopIcon className="w-16 h-16 mb-4" />
          <span className="text-xl font-semibold">Companies</span>
        </Link>
      </div>
    </div>
  )
}