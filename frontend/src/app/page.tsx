// src/app/page.tsx
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8">Welcome to DJ Agent</h1>
      <div className="space-y-4">
        <Link 
          href="/artists/dashboard" 
          className="block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Artist Dashboard
        </Link>
        <Link 
          href="/promoters/dashboard" 
          className="block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Promoter Dashboard
        </Link>
      </div>
    </div>
  )
}