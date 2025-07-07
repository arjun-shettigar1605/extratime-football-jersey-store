# Football Jersey Store 🚀⚽

A full-stack MERN e-commerce application for football jerseys with Razorpay payment integration.

## Features ✨

- 🔐 User Authentication (JWT)
- 🛍️ Product Catalogue with Categories
- 🛒 Shopping Cart Management
- ❤️ Wishlist Functionality
- 💳 Razorpay Payment Integration
- 📱 Responsive Design
- 👤 User Profile Management
- 📋 Order History
- 🎨 Modern UI with Tailwind CSS

## Tech Stack 🛠️

**Frontend:**
- React 18
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- React Hot Toast

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Razorpay Integration
- bcryptjs

## Installation & Setup 🚀

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (Atlas or Local)
- Razorpay Account (for payments)

### Backend Setup

cd server
npm install
npm run seed  
npm run dev   

### Frontend Setup

cd client
npm install
npm run dev 

### Environment Variables 🔐
Create .env file in server directory:

PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret_key
NODE_ENV=development

### API Endpoints 📡
Authentication

POST /api/auth/register - Register user
POST /api/auth/login - Login user
GET /api/auth/profile - Get user profile

Products

GET /api/products - Get all products
GET /api/products/:id - Get product by ID
GET /api/products/category/:slug - Get products by category

Orders

POST /api/orders/create-payment - Create Razorpay order
POST /api/orders/verify-payment - Verify payment & create order
GET /api/orders/my-orders - Get user orders

### Screenshots 📷

### Contact 📧
Your Name - your.email@example.com
Project Link: https://github.com/yourusername/football-jersey-store