'use client'

import { useState } from 'react'

interface MessageInputProps {
  onSendMessage: (text: string) => void
  disabled?: boolean
}

export default function MessageInput({ onSendMessage, disabled }: MessageInputProps) {
  const [text, setText] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (text.trim() && !disabled) {
      onSendMessage(text.trim())
      setText('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t bg-white">
      <div className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-blue-500"
          disabled={disabled}
        />
        <button
          type="submit"
          disabled={!text.trim() || disabled}
          className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg font-medium"
        >
          Send
        </button>
      </div>
    </form>
  )
}
