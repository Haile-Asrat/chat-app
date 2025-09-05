# Chat App

A real-time chat application built with Next.js, Prisma, and PostgreSQL.

## Features

- User registration and authentication (JWT)
- 1-to-1 messaging between users
- Real-time message updates (polling)
- Responsive design with TailwindCSS
- Protected routes with JWT middleware

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, TailwindCSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT tokens
- **Validation**: Zod

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd chat-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your database URL and JWT secret:
```
DATABASE_URL="postgresql://username:password@localhost:5432/chat_app"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
```

4. Set up the database:
```bash
npx prisma migrate dev
npx prisma generate
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users` - Get all users (protected)

### Messages
- `GET /api/messages?userId=X` - Get messages between users (protected)
- `POST /api/messages` - Send a message (protected)

## Database Schema

### User
- id: String (Primary Key)
- name: String
- email: String (Unique)
- password: String (Hashed)
- createdAt: DateTime
- updatedAt: DateTime

### Message
- id: String (Primary Key)
- text: String
- senderId: String (Foreign Key)
- receiverId: String (Foreign Key)
- createdAt: DateTime

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Environment Variables for Production

- `DATABASE_URL`: Your PostgreSQL connection string
- `JWT_SECRET`: A secure random string for JWT signing

## Development

### Project Structure

```
src/
├── app/
│   ├── api/           # API routes
│   ├── chat/          # Chat page
│   ├── login/         # Login page
│   ├── register/      # Register page
│   └── layout.tsx     # Root layout
├── components/        # React components
└── lib/              # Utilities and configurations
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License

A demo video is included in the repository
