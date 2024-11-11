'use client'

import { useSearchParams } from 'next/navigation'
import { dummyApplicants } from '@/api/dummyApplicants'
import { dummyCompanies } from '@/api/dummyCompanies'
import FeedCard from '@/components/FeedCard'

export default function Feed() {
  const searchParams = useSearchParams()
  const type = searchParams.get('type') as 'client' | 'company'
  
  const items = type === 'client' ? dummyCompanies : dummyApplicants
  const displayType = type === 'client' ? 'company' : 'client'

  return (
    <div className="container mx-auto px-4 py-8 mb-16">
      <h1 className="text-2xl font-bold mb-6">
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <FeedCard key={item.id} item={item} type={displayType} />
        ))}
      </div>
    </div>
  );
}
