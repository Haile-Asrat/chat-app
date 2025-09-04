import { z } from 'zod'

export const registerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

export const messageSchema = z.object({
  text: z.string().min(1, 'Message cannot be empty'),
  receiverId: z.string().min(1, 'Receiver ID is required'),
})
