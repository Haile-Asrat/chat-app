'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface HeaderProps {
  user?: {
    id: string
    name: string
    email: string
  } | null
}

export default function Header({ user }: HeaderProps) {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/')
  }

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link href="/">Chat App</Link>
        </h1>
        
        {user ? (
          <div className="flex items-center gap-4">
            <span>Hello, {user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link
              href="/login"
              className="bg-blue-500 hover:bg-blue-700 px-3 py-1 rounded text-sm"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="bg-green-500 hover:bg-green-700 px-3 py-1 rounded text-sm"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
