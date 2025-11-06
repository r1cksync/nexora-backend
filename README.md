# 🔧 Nexora - AI-Powered E-Commerce Platform (Backend)

<div align="center">

![Nexora Backend](https://img.shields.io/badge/Nexora-Backend%20API-green?style=for-the-badge)
[![Live Demo](https://img.shields.io/badge/Live-Demo-success?style=for-the-badge&logo=vercel)](https://frontend-six-delta-72.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-Backend-181717?style=for-the-badge&logo=github)](https://github.com/r1cksync/nexora-backend)
[![Frontend](https://img.shields.io/badge/GitHub-Frontend-181717?style=for-the-badge&logo=github)](https://github.com/r1cksync/nexora-frontend)

**RESTful API backend for Nexora e-commerce platform with AI-powered features using Groq LLaMA 3.3 70B.**

[Live Demo](https://frontend-six-delta-72.vercel.app) • [Frontend Repo](https://github.com/r1cksync/nexora-frontend) • [Report Bug](https://github.com/r1cksync/nexora-backend/issues) • [Request Feature](https://github.com/r1cksync/nexora-backend/issues)

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Database Models](#database-models)
- [AI Features](#ai-features)
- [Authentication](#authentication)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Links](#links)

---

## 🌟 Overview

Nexora Backend is a robust, scalable API built with **Next.js 14 API Routes** and **MongoDB**. It powers the Nexora e-commerce platform with features like user authentication, product management, shopping cart, order processing, and AI-powered recommendations using **Groq's LLaMA 3.3 70B** model.

Video Demonstration : https://drive.google.com/file/d/1CKWui76ctZkkfF-FFeE-NraLUEuq3Fqx/view?usp=sharing

### 🎯 Key Highlights

- 🤖 **AI Integration**: Groq LLaMA 3.3 70B for intelligent features
- 🔐 **Secure Authentication**: JWT-based auth with bcrypt password hashing
- 📊 **MongoDB Database**: NoSQL database for flexible data storage
- 🚀 **RESTful API**: Clean, well-documented API endpoints
- ⚡ **High Performance**: Optimized for speed and scalability
- 🛡️ **CORS Enabled**: Secure cross-origin resource sharing
- 📝 **Type Safety**: Full TypeScript implementation

---

## ✨ Features

### 🔐 Authentication & Authorization
- User registration and login
- JWT token generation and validation
- Password hashing with bcrypt
- Protected routes with authentication middleware
- User session management

### 🛍️ Product Management
- CRUD operations for products
- Product search and filtering
- Category-based organization
- Product reviews and ratings
- Stock management
- Mock data initialization

### 🛒 Shopping Cart
- Add/remove products
- Update quantities
- Calculate totals
- Clear cart functionality
- User-specific carts

### 💳 Order Processing
- Checkout functionality
- Order creation and tracking
- Order history
- Order status management
- Detailed order information

### ❤️ Wishlist
- Add/remove products from wishlist
- View wishlist items
- Quick add to cart from wishlist

### 🤖 AI-Powered Features
- **Semantic Search**: Natural language product search
- **Product Recommendations**: Personalized suggestions
- **AI Chatbot**: Intelligent customer support
  - Product information queries
  - Order history access
  - Stock availability checking
  - Product comparisons
  - Shopping assistance

### 📊 Analytics
- Cart analytics
- Order analytics
- User behavior tracking

---

## 🛠️ Tech Stack

### Core Framework
- **[Next.js 14](https://nextjs.org/)** - React framework with API Routes
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety

### Database
- **[MongoDB](https://www.mongodb.com/)** - NoSQL database
- **[Mongoose](https://mongoosejs.com/)** - ODM for MongoDB

### AI & Machine Learning
- **[Groq SDK](https://groq.com/)** - AI inference platform
- **[LLaMA 3.3 70B](https://www.llama.com/)** - Large language model

### Authentication
- **[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)** - JWT implementation
- **[bcryptjs](https://www.npmjs.com/package/bcryptjs)** - Password hashing

### Development Tools
- **[ESLint](https://eslint.org/)** - Code linting
- **CORS** - Cross-origin resource sharing

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account or local MongoDB instance
- Groq API key ([Get it here](https://console.groq.com))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/r1cksync/nexora-backend.git
   cd nexora-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # MongoDB Connection
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?appName=Cluster0

   # Groq AI API Key
   GROQ_API_KEY=gsk_your_groq_api_key_here

   # JWT Secret (generate a random string)
   JWT_SECRET=your_super_secret_jwt_key_here

   # CORS Origin (frontend URL)
   CORS_ORIGIN=*

   # API URL (for local development)
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Server will start on**
   
   [http://localhost:3001](http://localhost:3001)

---

## 🔐 Environment Variables

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `MONGODB_URI` | MongoDB connection string | ✅ Yes | `mongodb+srv://user:pass@cluster.mongodb.net/` |
| `GROQ_API_KEY` | Groq API key for AI features | ✅ Yes | `gsk_xxxxxxxxxxxxx` |
| `JWT_SECRET` | Secret key for JWT signing | ✅ Yes | `your_random_secret_string` |
| `CORS_ORIGIN` | Allowed CORS origins | ✅ Yes | `*` or specific URL |
| `NEXT_PUBLIC_API_URL` | API base URL | No | `http://localhost:3001` |

### How to Get API Keys

1. **MongoDB URI**:
   - Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a cluster
   - Get connection string from "Connect" button

2. **Groq API Key**:
   - Sign up at [Groq Console](https://console.groq.com)
   - Navigate to API Keys section
   - Create a new API key

3. **JWT Secret**:
   - Generate a random string using:
     ```bash
     node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
     ```

---

## 📁 Project Structure

```
nexora-backend/
├── app/
│   └── api/                    # API Routes
│       ├── auth/              # Authentication endpoints
│       │   ├── login/
│       │   ├── signup/
│       │   ├── logout/
│       │   └── me/
│       ├── products/          # Product endpoints
│       │   ├── route.ts
│       │   └── [id]/
│       │       ├── route.ts
│       │       └── reviews/
│       ├── cart/              # Shopping cart endpoints
│       │   ├── route.ts
│       │   ├── clear/
│       │   └── [id]/
│       ├── orders/            # Order endpoints
│       │   ├── route.ts
│       │   └── [id]/
│       ├── wishlist/          # Wishlist endpoints
│       ├── checkout/          # Checkout endpoint
│       ├── ai/                # AI-powered endpoints
│       │   ├── search/
│       │   ├── recommendations/
│       │   └── chat/
│       ├── analytics/         # Analytics endpoint
│       └── users/             # User endpoints
├── lib/                       # Utility libraries
│   ├── mongodb.ts            # MongoDB connection
│   ├── jwt.ts                # JWT utilities
│   ├── auth.ts               # Auth middleware
│   ├── groqService.ts        # Groq AI service
│   ├── utils.ts              # Helper functions
│   └── cors.ts               # CORS configuration
├── models/                    # Mongoose models
│   ├── User.ts
│   ├── Product.ts
│   ├── Cart.ts
│   └── Order.ts
├── data/                      # Mock data
│   └── mockProducts.ts
├── middleware.ts              # Next.js middleware
└── next.config.js            # Next.js configuration
```

---

## 📚 API Documentation

### Base URL
- **Development**: `http://localhost:3001`
- **Production**: Your deployed backend URL

### Authentication

All authenticated endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

### Endpoints Overview

#### 🔐 Authentication
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/signup` | Register new user | ❌ No |
| POST | `/api/auth/login` | Login user | ❌ No |
| POST | `/api/auth/logout` | Logout user | ❌ No |
| GET | `/api/auth/me` | Get current user | ✅ Yes |

#### 🛍️ Products
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/products` | Get all products | ❌ No |
| GET | `/api/products?search=query` | Search products | ❌ No |
| GET | `/api/products?category=Electronics` | Filter by category | ❌ No |
| GET | `/api/products/:id` | Get product by ID | ❌ No |
| POST | `/api/products/:id/reviews` | Add product review | ✅ Yes |

#### 🛒 Shopping Cart
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/cart` | Get user's cart | ✅ Yes |
| POST | `/api/cart` | Add item to cart | ✅ Yes |
| PATCH | `/api/cart/:id` | Update cart item quantity | ✅ Yes |
| DELETE | `/api/cart/:id` | Remove item from cart | ✅ Yes |
| DELETE | `/api/cart/clear` | Clear entire cart | ✅ Yes |

#### 📦 Orders
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/orders` | Get user's orders | ✅ Yes |
| GET | `/api/orders/:id` | Get order by ID | ✅ Yes |
| POST | `/api/checkout` | Create new order | ✅ Yes |

#### ❤️ Wishlist
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/wishlist` | Get user's wishlist | ✅ Yes |
| POST | `/api/wishlist` | Add to wishlist | ✅ Yes |
| DELETE | `/api/wishlist/:productId` | Remove from wishlist | ✅ Yes |

#### 🤖 AI Features
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/ai/search` | AI-powered semantic search | ❌ No |
| POST | `/api/ai/recommendations` | Get AI recommendations | ❌ No |
| POST | `/api/ai/chat` | Chat with AI assistant | ❌ No |

#### 📊 Analytics
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/analytics?userId=xxx` | Get analytics | ❌ No |

---

## 🗄️ Database Models

### User Model
```typescript
{
  userId: string (unique)
  name: string
  email: string (unique)
  password: string (hashed)
  wishlist: string[]
  preferences: object
  createdAt: Date
}
```

### Product Model
```typescript
{
  id: string (unique)
  name: string
  description: string
  price: number
  originalPrice: number
  category: string
  image: string
  rating: number
  reviews: number
  stock: number
  tags: string[]
  customerReviews: Review[]
}
```

### Cart Model
```typescript
{
  userId: string
  items: CartItem[]
  updatedAt: Date
}

CartItem {
  productId: string
  quantity: number
  price: number
}
```

### Order Model
```typescript
{
  orderId: string (unique)
  userId: string
  items: OrderItem[]
  total: number
  status: string
  shippingAddress: Address
  paymentMethod: string
  timestamp: Date
}
```

---

## 🤖 AI Features

### Groq Integration

The backend uses **Groq's LLaMA 3.3 70B Versatile** model for AI features:

1. **Semantic Search** (`/api/ai/search`)
   - Natural language product search
   - Understands context and intent
   - Returns relevant products

2. **Product Recommendations** (`/api/ai/recommendations`)
   - Personalized product suggestions
   - Based on user preferences and browsing history
   - Context-aware recommendations

3. **AI Chatbot** (`/api/ai/chat`)
   - Full product catalog knowledge
   - Order history access (for authenticated users)
   - Stock availability checking
   - Product comparisons
   - Shopping assistance

### Configuration

```typescript
// lib/groqService.ts
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const model = "llama-3.3-70b-versatile";
```

---

## 🔐 Authentication

### JWT Implementation

- **Token Generation**: On successful login/signup
- **Token Validation**: Middleware checks token on protected routes
- **Token Expiry**: 7 days
- **Password Security**: bcrypt with salt rounds

### Protected Routes

Use the `withAuth` middleware wrapper:

```typescript
export const GET = withAuth(async (request: AuthenticatedRequest) => {
  const userId = request.user.userId;
  // Your protected logic here
});
```

---

## 🚀 Deployment

### Deploy to Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Link Project**
   ```bash
   vercel link
   ```

4. **Add Environment Variables**
   ```bash
   vercel env add MONGODB_URI production
   vercel env add GROQ_API_KEY production
   vercel env add JWT_SECRET production
   vercel env add CORS_ORIGIN production
   ```

5. **Deploy to Production**
   ```bash
   vercel --prod
   ```

### Environment Variables on Vercel

Set these in your Vercel project dashboard or via CLI:
- `MONGODB_URI`
- `GROQ_API_KEY`
- `JWT_SECRET`
- `CORS_ORIGIN` (set to `*` for open access or specific frontend URL)

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 3001 |
| `npm run build` | Build production bundle |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint for code quality |

---

## 🧪 Testing

### Test Authentication
```bash
# Register a new user
curl -X POST http://localhost:3001/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Test Products
```bash
# Get all products
curl http://localhost:3001/api/products

# Search products
curl http://localhost:3001/api/products?search=laptop

# Get product by ID
curl http://localhost:3001/api/products/prod-001
```

### Test AI Features
```bash
# AI Search
curl -X POST http://localhost:3001/api/ai/search \
  -H "Content-Type: application/json" \
  -d '{"query":"wireless headphones for running"}'

# AI Chat
curl -X POST http://localhost:3001/api/ai/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"What laptops do you have under $1000?"}'
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

---

## 📝 License

This project is licensed under the MIT License.

---

## 🔗 Links

| Resource | URL |
|----------|-----|
| 🌐 **Live Demo** | [https://frontend-six-delta-72.vercel.app](https://frontend-six-delta-72.vercel.app) |
| 🔧 **Backend Repository** | [https://github.com/r1cksync/nexora-backend](https://github.com/r1cksync/nexora-backend) |
| 💻 **Frontend Repository** | [https://github.com/r1cksync/nexora-frontend](https://github.com/r1cksync/nexora-frontend) |
| 📚 **API Documentation** | See [API Documentation](#api-documentation) section above |
| 🤖 **Groq AI** | [https://groq.com](https://groq.com) |
| 🍃 **MongoDB Atlas** | [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) |

---

## 🙏 Acknowledgments

- **Groq** - For providing the powerful LLaMA 3.3 70B AI model
- **Vercel** - For seamless deployment platform
- **MongoDB** - For flexible and scalable database
- **Next.js Team** - For the amazing framework

---

## 📞 Support

If you have any questions or need help, please:
- Open an [issue](https://github.com/r1cksync/nexora-backend/issues)
- Contact the maintainer: [r1cksync](https://github.com/r1cksync)

---

<div align="center">

**Made with ❤️ by [r1cksync](https://github.com/r1cksync)**

⭐ Star this repo if you found it helpful!

</div>
