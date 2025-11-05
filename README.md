# 📱 InstaGem - Educational Social Platform for Kids<div align="center">

<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />

<div align="center"></div>



![InstaGem Logo](https://img.shields.io/badge/InstaGem-Educational-purple?style=for-the-badge&logo=youtube&logoColor=white)# Run and deploy your AI Studio app

[![Live Demo](https://img.shields.io/badge/Live-Demo-success?style=for-the-badge&logo=vercel)](https://instagem-pearl.vercel.app)

[![API Status](https://img.shields.io/badge/API-Online-brightgreen?style=for-the-badge&logo=render)](https://instagem.onrender.com)This contains everything you need to run your app locally.



**"Let them watch. They'll learn something new every day!"** 📱✨View your app in AI Studio: https://ai.studio/apps/drive/13GLef0Eks8-x_ZZNujVSBzLF5scL8kUh



</div>## Run Locally



---**Prerequisites:**  Node.js



## 🌟 About InstaGem

1. Install dependencies:

InstaGem transforms screen time into learning time. Unlike traditional social media, InstaGem is a **curated educational platform** designed specifically for children aged 1-17, featuring handpicked educational content from the world's most trusted sources.   `npm install`

2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key

### ✨ Key Features3. Run the app:

   `npm run dev`

- 🎓 **Curated Educational Content** - Handpicked videos from Khan Academy, NASA, National Geographic Kids, PBS Kids, and more
- 🛡️ **Safe Environment** - No user uploads, only pre-approved educational content
- 👶 **Age-Appropriate** - Content tailored for ages 1-17 with parental controls
- 🔒 **COPPA Compliant** - Full parental consent system for children under 13
- 💬 **Moderated Comments** - Safe commenting with clear community guidelines
- 📊 **Parent Dashboard** - Track learning progress and activity (coming soon)

---

## 🚀 Live Demo

**Frontend:** [https://instagem-pearl.vercel.app](https://instagem-pearl.vercel.app)  
**Backend API:** [https://instagem.onrender.com](https://instagem.onrender.com)

### Try It Out:
1. Visit the live demo
2. Click "Register" to create an account
3. Fill in child's information (age 1-17)
4. Start exploring educational content!

---

## 🎨 Screenshots

<div align="center">

### Home Feed - Educational Videos
*Curated educational content from trusted sources*

### Kid-Friendly Registration
*Safe signup with parental email verification*

### Content by Age Group
*Age-appropriate learning for every stage*

</div>

---

## 🏗️ Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=flat&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?style=flat&logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=flat&logo=tailwindcss&logoColor=white)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?style=flat&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.x-000000?style=flat&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=flat&logo=jsonwebtokens&logoColor=white)

### Deployment & Services
![Vercel](https://img.shields.io/badge/Vercel-Frontend-000000?style=flat&logo=vercel&logoColor=white)
![Render](https://img.shields.io/badge/Render-Backend-46E3B7?style=flat&logo=render&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-Media-3448C5?style=flat&logo=cloudinary&logoColor=white)

---

## 📚 Educational Content Sources

InstaGem features content from these trusted educational providers:

<table>
<tr>
<td align="center"><strong>🎓 Khan Academy</strong><br/>Math, Science, History</td>
<td align="center"><strong>🚀 NASA Kids</strong><br/>Space & Astronomy</td>
<td align="center"><strong>🌍 Nat Geo Kids</strong><br/>Nature & Animals</td>
</tr>
<tr>
<td align="center"><strong>🎨 PBS Kids</strong><br/>Art & Creativity</td>
<td align="center"><strong>🧸 Sesame Street</strong><br/>Social-Emotional Learning</td>
<td align="center"><strong>💡 TED-Ed</strong><br/>Critical Thinking</td>
</tr>
<tr>
<td align="center"><strong>🔬 SciShow Kids</strong><br/>Science Experiments</td>
<td align="center"><strong>📖 Crash Course Kids</strong><br/>Educational Series</td>
<td align="center"><strong>🔧 Mark Rober</strong><br/>STEM & Engineering</td>
</tr>
</table>

---

## 🏃 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- MongoDB Atlas account (free tier)
- Cloudinary account (free tier)

### Installation

```bash
# Clone the repository
git clone https://github.com/swostitech-solutions/InstaGem.git
cd InstaGem

# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### Environment Setup

#### Frontend `.env`
```env
VITE_API_URL=http://localhost:5001
```

#### Backend `server/.env`
```env
NODE_ENV=development
PORT=5001

# MongoDB
MONGO_URI=your_mongodb_connection_string

# JWT
JWT_SECRET=your_jwt_secret_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# CORS
CLIENT_URL=http://localhost:5173
```

### Run Development Servers

```bash
# Terminal 1 - Frontend (from root)
npm run dev

# Terminal 2 - Backend (from server folder)
cd server
npm start
```

Visit:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5001`

---

## 📁 Project Structure

```
InstaGem/
├── components/           # React components
│   ├── legal/           # Legal pages (Terms, Privacy, Guidelines)
│   ├── Header.tsx       # Navigation header
│   ├── Footer.tsx       # Footer with legal links
│   ├── Feed.tsx         # Main feed component
│   ├── Post.tsx         # Video post component
│   └── ...
├── context/             # React context (Auth)
├── api/                 # API service layer
├── services/            # Helper services
├── educationalContent.ts # Curated video content
├── server/              # Backend API
│   ├── controllers/     # Route controllers
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── middleware/      # Auth & error handling
│   └── config/          # Database & service config
└── ...
```

---

## 🔐 Security & Compliance

### COPPA Compliance
- ✅ Parental consent required for children under 13
- ✅ Parent email verification
- ✅ Clear privacy policy and data handling
- ✅ Parent rights (access, delete, export data)

### Data Protection
- 🔒 Password hashing with bcrypt
- 🔒 JWT-based authentication
- 🔒 Encrypted MongoDB connections
- 🔒 Secure API endpoints
- 🔒 CORS protection

### Content Safety
- ✅ No user uploads allowed
- ✅ All content pre-moderated
- ✅ Trusted sources only
- ✅ Age-appropriate content filtering
- ✅ Comment moderation system

---

## 🎯 Roadmap

### Phase 1: Core Features ✅
- [x] User authentication with parent controls
- [x] Curated educational video feed
- [x] Commenting system
- [x] Like functionality
- [x] Legal compliance (COPPA)
- [x] Production deployment

### Phase 2: Enhanced Features 🚧
- [ ] Age-based content filtering
- [ ] Watch history tracking
- [ ] Personalized recommendations
- [ ] Parent dashboard
- [ ] Learning progress analytics
- [ ] Daily learning streaks

### Phase 3: Advanced Features 🔮
- [ ] Multi-language support
- [ ] Offline video downloads
- [ ] Learning achievements & badges
- [ ] Subject-based categorization
- [ ] Parent-teacher collaboration tools
- [ ] Mobile apps (iOS & Android)

---

## 🤝 Contributing

We welcome contributions! However, please note:

- All content must be from verified educational sources
- Code must follow our security standards
- Features must be child-safe and educational
- COPPA compliance is mandatory

---

## 📄 License & Legal

### Content Attribution
All educational videos are embedded from YouTube using official embed features. Videos remain property of their respective creators:
- Khan Academy (Educational non-profit)
- National Geographic Kids (Licensed educational content)
- PBS Kids (Public broadcasting)
- NASA (Public domain government content)
- And other trusted educational sources

We do NOT host, download, or modify any video content.

### Legal Pages
- [Terms of Service](https://instagem-pearl.vercel.app/terms-of-service)
- [Privacy Policy](https://instagem-pearl.vercel.app/privacy-policy)
- [Content Guidelines](https://instagem-pearl.vercel.app/content-guidelines)

### Contact
For legal inquiries, content removal requests, or COPPA-related matters:  
📧 **content@instagem.com**

---

## 👨‍💻 Development Team

**Swosti Tech Solutions**  
Building safe, educational technology for the next generation.

---

## 📊 Statistics

<div align="center">

![GitHub repo size](https://img.shields.io/github/repo-size/swostitech-solutions/InstaGem?style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/swostitech-solutions/InstaGem?style=flat-square)
![Lines of code](https://img.shields.io/tokei/lines/github/swostitech-solutions/InstaGem?style=flat-square)

</div>

---

## 🌟 Support

If you find InstaGem helpful, please:
- ⭐ Star this repository
- 🐛 Report bugs via Issues
- 💡 Suggest new educational content sources
- 📢 Share with educators and parents

---

## 🎓 Educational Impact

InstaGem aims to:
- ✅ Transform passive screen time into active learning
- ✅ Provide free, quality education to all children
- ✅ Support parents in managing children's digital consumption
- ✅ Bridge educational gaps through accessible content
- ✅ Foster curiosity and love for learning

---

<div align="center">

**"Let them watch. They'll learn something new every day!"** 📱✨

### [🚀 Try InstaGem Now](https://instagem-pearl.vercel.app)

Made with 💜 by Swosti Tech Solutions

</div>
