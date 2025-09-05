'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import MessageList from '@/components/MessageList'
import MessageInput from '@/components/MessageInput'

interface User {
  id: string
  name: string
  email: string
}

interface Message {
  id: string
  text: string
  createdAt: string
  sender: {
    id: string
    name: string
  }
  receiver: {
    id: string
    name: string
  }
}

export default function ChatPage() {
  const [user, setUser] = useState<User | null>(null)
  const [users, setUsers] = useState<User[]>([])
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')

    if (!token || !userData) {
      router.push('/login')
      return
    }

    setUser(JSON.parse(userData))
    fetchUsers()
  }, [router])

  useEffect(() => {
    if (selectedUserId) {
      fetchMessages(selectedUserId)
      // Set up polling for new messages
      const interval = setInterval(() => {
        fetchMessages(selectedUserId)
      }, 2000) // Poll every 2 seconds

      return () => clearInterval(interval)
    }
  }, [selectedUserId])

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/users', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setUsers(data.users)
      }
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchMessages = async (userId: string) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/messages?userId=${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setMessages(data.messages)
      }
    } catch (error) {
      console.error('Error fetching messages:', error)
    }
  }

  const sendMessage = async (text: string) => {
    if (!selectedUserId) return

    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          text,
          receiverId: selectedUserId,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setMessages(prev => [...prev, data.message])
      }
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header user={user} />
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} />
      <div className="max-w-6xl mx-auto h-[calc(100vh-80px)] flex">
        {/* Users List */}
        <div className="w-1/3 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Users</h2>
          </div>
          <div className="flex-1 overflow-y-auto">
            {users.map((u) => (
              <button
                key={u.id}
                onClick={() => setSelectedUserId(u.id)}
                className={`w-full text-left p-4 hover:bg-gray-50 border-b border-gray-100 ${
                  selectedUserId === u.id ? 'bg-blue-50 border-blue-200' : ''
                }`}
              >
                <div className="font-medium">{u.name}</div>
                <div className="text-sm text-blue-500">{u.email}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedUserId ? (
            <>
              <div className="p-4 border-b border-gray-200 bg-white">
                <h3 className="font-semibold">
                  {users.find(u => u.id === selectedUserId)?.name}
                </h3>
              </div>
              <MessageList
                messages={messages}
                currentUserId={user?.id || ''}
              />
              <MessageInput onSendMessage={sendMessage} />
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center text-blue-500">
                <div className="text-lg mb-2">Select a user to start chatting</div>
                <div className="text-sm">Choose someone from the list on the left</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
