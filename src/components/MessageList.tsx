'use client'

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

interface MessageListProps {
  messages: Message[]
  currentUserId: string
}

export default function MessageList({ messages, currentUserId }: MessageListProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.length === 0 ? (
        <div className="text-center text-blue-500 mt-8">
          No messages yet. Start a conversation!
        </div>
      ) : (
        messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender.id === currentUserId ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.sender.id === currentUserId
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-blue-800'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p className="text-xs opacity-75 mt-1">
                {new Date(message.createdAt).toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
