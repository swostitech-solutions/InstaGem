# InstaGem Backend API

Backend API for InstaGem - An Instagram clone built with MERN stack.

## Tech Stack

- **Node.js** - Runtime
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Cloudinary** - Image storage
- **bcryptjs** - Password hashing

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Posts
- `GET /api/posts` - Get all posts (paginated)
- `POST /api/posts` - Create new post (protected)
- `GET /api/posts/:id` - Get single post
- `DELETE /api/posts/:id` - Delete post (protected)
- `POST /api/posts/:id/like` - Like/unlike post (protected)
- `POST /api/posts/:id/comment` - Add comment (protected)
- `GET /api/posts/user/:userId` - Get user posts

### Users
- `GET /api/users/search?q=query` - Search users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update profile (protected)
- `POST /api/users/:id/follow` - Follow/unfollow user (protected)
- `GET /api/users/:id/followers` - Get followers
- `GET /api/users/:id/following` - Get following

### Upload
- `POST /api/upload` - Upload image to Cloudinary (protected)

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create `.env` file:**
   ```env
   NODE_ENV=development
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   CLIENT_URL=http://localhost:3000
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Run production server:**
   ```bash
   npm start
   ```

## MongoDB Setup

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier available)
3. Get connection string and add to `.env`

## Cloudinary Setup

1. Create account at [Cloudinary](https://cloudinary.com/)
2. Get cloud name, API key, and API secret from dashboard
3. Add credentials to `.env`

## Deployment (Render)

1. Create account at [Render](https://render.com/)
2. Create new Web Service
3. Connect GitHub repository
4. Set build command: `cd server && npm install`
5. Set start command: `cd server && npm start`
6. Add environment variables in Render dashboard
7. Deploy!

## Project Structure

```
server/
├── config/
│   ├── db.js              # MongoDB connection
│   └── cloudinary.js      # Cloudinary config
├── controllers/
│   ├── authController.js  # Auth logic
│   ├── postController.js  # Post logic
│   ├── userController.js  # User logic
│   └── uploadController.js # Upload logic
├── middleware/
│   ├── auth.js            # JWT auth middleware
│   └── errorHandler.js    # Error handling
├── models/
│   ├── User.js            # User model
│   └── Post.js            # Post model
├── routes/
│   ├── authRoutes.js      # Auth routes
│   ├── postRoutes.js      # Post routes
│   ├── userRoutes.js      # User routes
│   └── uploadRoutes.js    # Upload routes
├── .env.example           # Environment template
├── package.json           # Dependencies
└── server.js              # Entry point
```

## License

MIT
