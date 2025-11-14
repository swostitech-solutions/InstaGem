# 📱 InstaGem - Educational Social Platform for Kids


<div align="center">

![InstaGem Logo](https://img.shields.io/badge/InstaGem-Educational-purple?style=for-the-badge&logo=youtube&logoColor=white)

[![Live Demo](https://img.shields.io/badge/Live-Demo-success?style=for-the-badge&logo=vercel)](https://instagem-pearl.vercel.app)
[![API Status](https://img.shields.io/badge/API-Online-brightgreen?style=for-the-badge&logo=render)](https://instagem.onrender.com)

**"Let them watch. They'll learn something new every day!"** 📱✨

</div>


## 🚀 Live Demo

**Frontend:** [https://instagem-pearl.vercel.app](https://instagem-pearl.vercel.app)  
**Backend API:** [https://instagem.onrender.com](https://instagem.onrender.com)

### Try It Out:

1. Visit the live demo
2. Click "Register" to create an account
3. Fill in child's information (age 1-17)
4. Start exploring educational content!

---

## 📚 Educational Sources

Our content is carefully selected from trusted educational institutions:

| Source | Focus Area | Age Range |
|--------|------------|-----------|
| Khan Academy | Math, Science, History | 5-17 |
| NASA | Space, Astronomy | 8-17 |
| National Geographic Kids | Nature, Animals | 5-12 |
| PBS Kids | General Education | 1-8 |
| Sesame Street | Early Learning | 1-5 |
| TED-Ed | Science, Philosophy | 10-17 |
| SciShow Kids | Science Experiments | 5-10 |
| Crash Course Kids | Science Fundamentals | 8-12 |
| Mark Rober | Engineering, Science | 10-17 |
| Free School | History, Geography | 5-12 |
| Peekaboo Kidz | Educational Fun | 3-8 |
| Numberblocks | Math Concepts | 1-6 |
| Alphablocks | Phonics, Reading | 2-6 |
| Simple History | World History | 8-15 |

---

## 🛠️ Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-22.16-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white)

### Deployment
![Vercel](https://img.shields.io/badge/Vercel-Frontend-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Render](https://img.shields.io/badge/Render-Backend-46E3B7?style=for-the-badge&logo=render&logoColor=white)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 22.x or higher
- MongoDB Atlas account
- Cloudinary account (for profile images)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/swostitech-solutions/InstaGem.git
cd InstaGem
```

2. **Install dependencies**
```bash
# Frontend
npm install

# Backend
cd server
npm install
```

3. **Environment Setup**

Create `.env` in the `/server` directory:
```env
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLIENT_URL=http://localhost:3000
```

Create `.env` in the root directory:
```env
VITE_API_URL=http://localhost:5000
```

4. **Run the application**
```bash
# Terminal 1: Start backend
cd server
npm start

# Terminal 2: Start frontend
npm run dev
```

5. **Access the application**
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000`

---

## 📁 Project Structure

```
InstaGem/
├── src/
│   ├── components/
│   │   ├── auth/              # Registration & Login
│   │   ├── legal/             # Terms, Privacy, Guidelines
│   │   ├── Posts/             # Educational content display
│   │   ├── Comments/          # Comment system
│   │   └── Header.tsx         # Navigation
│   ├── context/
│   │   └── AuthContext.tsx    # Authentication state
│   ├── data/
│   │   └── educationalContent.ts  # Curated videos
│   └── App.tsx                # Main application
├── server/
│   ├── controllers/           # Request handlers
│   ├── middleware/            # Auth & validation
│   ├── models/                # MongoDB schemas
│   ├── routes/                # API endpoints
│   └── server.js              # Express server
└── public/                    # Static assets
```

---

## 🔒 Security & Compliance

### COPPA Compliance
- ✅ Parental consent required for users under 13
- ✅ Parent email verification system
- ✅ No collection of unnecessary personal data
- ✅ Clear privacy policy and terms of service
- ✅ Content guidelines for safe community

### Data Protection
- 🔐 Password hashing with bcrypt
- 🔑 JWT token authentication
- 🔒 MongoDB Atlas encryption at rest
- 🛡️ CORS protection configured
- 📧 Parent access to child's data

---

## 🗺️ Roadmap

### Phase 1: Core Platform ✅ Complete
- [x] User authentication & registration
- [x] Curated educational content (15 videos)
- [x] Comment system
- [x] Like functionality
- [x] Legal pages (Terms, Privacy, Guidelines)
- [x] Production deployment

### Phase 2: Enhanced Features 🚧 In Progress
- [ ] Age-based content filtering
- [ ] Watch history tracking
- [ ] Parent dashboard
- [ ] Progress reports
- [ ] Playlist creation
- [ ] Favorite videos

### Phase 3: Advanced Features 📅 Planned
- [ ] Parental controls
- [ ] Screen time limits
- [ ] Achievement badges
- [ ] Weekly learning reports
- [ ] Content recommendations
- [ ] Multi-language support

---

## 📜 Legal

### Content Attribution
All embedded video content is used in accordance with YouTube's Terms of Service. InstaGem does not host any video content. All videos remain the property of their respective creators and are embedded via YouTube's official iframe API.

### Copyright
© 2025 InstaGem by Swosti Tech Solutions. All rights reserved.

### Contact
- **Content Issues:** content@instagem.com
- **Support:** support@instagem.com
- **Privacy Concerns:** privacy@instagem.com

---

## 👥 Development Team

**Swosti Tech Solutions**  
Building safe, educational technology for the next generation.

---

<div align="center">

**Made with ❤️ for kids around the world**

[View Live Demo](https://instagem-pearl.vercel.app) • [Report Issue](https://github.com/swostitech-solutions/InstaGem/issues) • [Request Feature](https://github.com/swostitech-solutions/InstaGem/issues)

</div>
