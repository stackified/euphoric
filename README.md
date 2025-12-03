# EUPHORIC LIVE - Professional Event Management Website

A professional, bold, responsive, and animated event management website built with modern web technologies. The design is inspired by the sleek, minimalistic dark theme of Enrique Iglesias' website, featuring smooth animations, clean layouts, and consistent typography.

## 🚀 Features

- **Modern Frontend**: React.js with Vite for fast development and optimized builds
- **Full-Stack Architecture**: Express.js backend with MySQL database
- **Beautiful UI**: TailwindCSS with custom animations matching Enrique Iglesias design
- **Smooth Animations**: Framer Motion for fluid page transitions and interactions
- **State Management**: Redux Toolkit for global state management
- **RESTful API**: Complete backend API for events, reviews, and enquiries
- **Database Integration**: MySQL database with automatic table initialization
- **Email Integration**:
  - **EmailJS** (frontend-only option) for contact forms and feedback submissions
  - **Nodemailer** (backend option) for server-side email sending
- **Data Management**:
  - Static JSON files (current frontend implementation)
  - Database-driven (backend API available)
- **Responsive Design**: Mobile-first approach with perfect responsiveness
- **Cookie Management**: GDPR-compliant cookie consent banner
- **Image Gallery**: Modal image viewer with smooth zoom animations
- **Advanced Video Gallery**:
  - YouTube-style hover previews with sound
  - Playback position continuity (resumes from where you left off)
  - Zoom animations and smooth transitions
  - Mobile tap-to-play support
  - Keyboard navigation (Arrow keys, Space, Escape)
  - Blurred previews of next/previous videos
  - Full accessibility support (ARIA labels, focus trap)
- **Professional Video Player**: Custom video player with full controls, timeline seeking, volume control, and fullscreen support
- **Event Management**: Full CRUD API for events management
- **Reviews System**: API endpoints for reviews with rate limiting
- **Security**: Helmet.js, CORS, rate limiting, input validation
- **Caching**: Redis caching support (optional, graceful fallback)
- **CI/CD**: Automated deployment to GitHub Pages

## 📁 Project Structure

```
euphoric/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions CI/CD workflow
├── backend/                     # Express.js backend API
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js     # MySQL connection pool
│   │   ├── controllers/
│   │   │   ├── enquiryController.js
│   │   │   ├── eventsController.js
│   │   │   └── reviewsController.js
│   │   ├── middleware/
│   │   │   └── errorHandler.js # Error handling middleware
│   │   ├── models/
│   │   │   └── initDatabase.js # Database table initialization
│   │   ├── routes/
│   │   │   ├── enquiry.js
│   │   │   ├── events.js
│   │   │   └── reviews.js
│   │   ├── utils/
│   │   │   └── cache.js         # Redis caching utilities
│   │   └── server.js           # Express server entry point
│   └── package.json
├── frontend/                    # React frontend application
│   ├── public/                 # Static assets (favicon, etc.)
│   ├── src/
│   │   ├── assets/            # Images, videos, logos, gallery
│   │   ├── components/         # Reusable React components
│   │   │   ├── AboutEuphoric.jsx
│   │   │   ├── Alert.jsx
│   │   │   ├── CookieBanner.jsx
│   │   │   ├── EventsPreview.jsx
│   │   │   ├── FeaturedVideos.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── GalleryPreview.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Loader.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── QuickActionBox.jsx
│   │   │   ├── ServicesPreview.jsx
│   │   │   └── videos/
│   │   │       ├── VideoGallery.jsx
│   │   │       └── VideoPlayer.jsx
│   │   ├── pages/             # Page components
│   │   │   ├── About.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Enquiry.jsx
│   │   │   ├── Events.jsx
│   │   │   ├── Feedbacks.jsx
│   │   │   ├── Gallery.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Links.jsx
│   │   │   ├── Services.jsx
│   │   │   └── Videos.jsx
│   │   ├── data/              # JSON files for events and reviews (static fallback)
│   │   │   ├── events.json
│   │   │   └── reviews.json
│   │   ├── store/             # Redux store and slices
│   │   │   ├── slices/
│   │   │   │   ├── cookieSlice.js
│   │   │   │   ├── eventsSlice.js
│   │   │   │   └── reviewsSlice.js
│   │   │   └── store.js
│   │   ├── utils/             # Utility functions
│   │   │   ├── imageImports.js
│   │   │   └── videoImports.js
│   │   ├── context/           # React Context providers
│   │   │   └── AlertContext.jsx
│   │   ├── hooks/             # Custom React hooks
│   │   │   ├── useAlert.js
│   │   │   └── useEmailJS.js
│   │   ├── App.jsx            # Main app component
│   │   └── main.jsx           # Entry point
│   ├── package.json
│   └── vite.config.js
├── package.json               # Monorepo root package.json
└── README.md
```

## 🛠️ Tech Stack

### Frontend

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Framer Motion** - Animation library
- **EmailJS** - Email service integration (frontend-only option)
- **React Icons** - Icon library
- **Three.js** - 3D graphics library (via @react-three/fiber)

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MySQL2** - MySQL database driver
- **Nodemailer** - Email sending service
- **Helmet.js** - Security middleware
- **CORS** - Cross-origin resource sharing
- **express-rate-limit** - Rate limiting middleware
- **express-validator** - Input validation
- **dotenv** - Environment variable management
- **redis** - Caching layer (optional)

## 📦 Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MySQL Server (for backend database)

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/euphoric.git
cd euphoric
```

### Step 2: Install Dependencies

**Option A: Install all dependencies (recommended for monorepo)**

```bash
npm run install:all
```

**Option B: Install separately**

```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### Step 3: Set Up Environment Variables

#### Frontend Environment Variables

Create `frontend/.env`:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_API_URL=http://localhost:5000/api
```

**Note**: EmailJS credentials are optional if using backend API. Get them from [EmailJS](https://www.emailjs.com/) - it's free!

#### Backend Environment Variables

Create `backend/.env`:

```env
# Server Configuration
PORT=5000
FRONTEND_URL=http://localhost:3000

# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=euphoric_db

# Email Configuration (optional - for Nodemailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

**Note**:

- Create a MySQL database named `euphoric_db` (or update `DB_NAME` in `.env`)
- The database tables will be automatically created on server start
- For Gmail, use an [App Password](https://support.google.com/accounts/answer/185833) instead of your regular password

### Step 4: Database Setup

1. **Create MySQL Database:**

```sql
CREATE DATABASE euphoric_db;
```

2. **Start the backend server** - Tables will be automatically created:

```bash
cd backend
npm run dev
```

The server will automatically create the following tables:

- `reviews` - Stores customer reviews/feedback
- `events` - Stores event information
- `enquiries` - Stores contact form submissions

## 🚀 Running the Application

### Development Mode

#### Option 1: Run Both Frontend and Backend Together (Recommended)

From the root directory:

```bash
npm run dev
```

This runs both servers concurrently:

- Backend API: `http://localhost:5000`
- Frontend: `http://localhost:3000`

#### Option 2: Run Separately

**Backend (runs on http://localhost:5000):**

```bash
cd backend
npm run dev
```

**Frontend (runs on http://localhost:3000):**

```bash
cd frontend
npm run dev
```

### Production Build

**Build Frontend:**

```bash
cd frontend
npm run build
```

The `dist/` folder contains your production-ready website!

**Build Backend:**

```bash
cd backend
npm run build
```

**Start Backend in Production:**

```bash
cd backend
npm start
```

## 📡 API Endpoints

The backend provides the following RESTful API endpoints:

### Reviews

- `GET /api/reviews` - Get all reviews (ordered by date, newest first)
- `POST /api/reviews` - Create a new review
  - Body: `{ name: string, message: string, rating: number (1-5) }`
  - Rate limited: 5 requests per 15 minutes per IP

### Events

- `GET /api/events` - Get all upcoming events (date >= today)
- `GET /api/events/:id` - Get a specific event by ID
- `POST /api/events` - Create a new event
  - Body: `{ title: string, date: string (YYYY-MM-DD), location: string, image?: string, description?: string }`
- `PUT /api/events/:id` - Update an event
- `DELETE /api/events/:id` - Delete an event

### Enquiries

- `POST /api/enquiry` - Submit an enquiry
  - Body: `{ name: string, email: string, phone?: string, message: string }`
  - Rate limited: 10 requests per 15 minutes per IP
  - Saves to database and sends email notification (if configured)

### Health Check

- `GET /api/health` - Server health check

## 📱 Pages & Components

### Pages

- **Home** (`/`) - Hero section with animated background, services preview, events preview, gallery preview
- **About** (`/about`) - Company information and mission
- **Services** (`/services`) - List of all event management services with professional icons
- **Gallery** (`/gallery`) - Image gallery with modal viewer
- **Videos** (`/videos`) - Advanced video gallery with hover previews, playback continuity, and full-screen player
- **Events** (`/events`) - Upcoming events display (currently from JSON, backend API available)
- **Contact** (`/contact`) - Contact information and quick actions
- **Links** (`/links`) - Social media and external links
- **Feedbacks** (`/feedbacks`) - Client reviews (currently from JSON) and feedback form (sends via EmailJS)
- **Enquiry** (`/enquiry`) - Contact form for event inquiries (sends via EmailJS, backend API available)

### Key Components

- **Navbar** - Responsive navigation with smooth scroll effects
- **Footer** - Contact information and quick links
- **Hero** - Full-screen hero section with animated overlays and contact buttons
- **CookieBanner** - GDPR-compliant cookie consent
- **ServicesPreview** - Homepage services preview
- **EventsPreview** - Homepage events preview
- **GalleryPreview** - Homepage gallery preview
- **FeaturedVideos** - Homepage featured videos showcase
- **VideoGallery** - Advanced video gallery component with:
  - YouTube-style hover previews with sound
  - Playback position continuity
  - Zoom animations
  - Mobile tap-to-play support
  - Keyboard navigation
  - Accessibility features
- **VideoPlayer** - Professional video player with:
  - Full playback controls
  - Timeline seeking
  - Volume control
  - Fullscreen support
  - Keyboard shortcuts
  - Buffering indicators
- **Alert** - Toast notification system
- **Loader** - Loading spinner component
- **QuickActionBox** - Quick action buttons component
- **AboutEuphoric** - About section component

## 🔄 Data Management Options

The project currently supports two data management approaches:

### Option 1: Static JSON Files (Current Implementation)

The frontend currently uses static JSON files for events and reviews:

- `frontend/src/data/events.json`
- `frontend/src/data/reviews.json`

**To update content:**

- Edit the JSON files directly
- Changes reflect immediately (after page refresh)

### Option 2: Backend API (Available)

The backend provides a complete API for dynamic data management. To switch to API-based data:

1. Update Redux slices to fetch from API endpoints
2. Configure `VITE_API_URL` in frontend `.env`
3. Update form submissions to use API endpoints instead of EmailJS

**Example API Integration:**

```javascript
// Fetch events from API
const response = await fetch(`${import.meta.env.VITE_API_URL}/events`);
const events = await response.json();

// Submit review via API
await fetch(`${import.meta.env.VITE_API_URL}/reviews`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name, message, rating }),
});
```

## 📧 Email Configuration

### EmailJS Setup (Frontend-Only)

1. Sign up at [EmailJS](https://www.emailjs.com/) (free tier available)
2. Create an email service (Gmail, Outlook, etc.)
3. Create email templates for:
   - Feedback submissions
   - Enquiry submissions
4. Get your Service ID, Template ID, and Public Key
5. Add them to `frontend/.env`

**EmailJS Templates:**

**Feedback Template:**

```
From: {{from_name}}
Rating: {{rating}}/5
Message: {{message}}
Date: {{feedback_date}}
```

**Enquiry Template:**

```
From: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Message: {{message}}
```

### Nodemailer Setup (Backend)

1. Configure email credentials in `backend/.env`
2. For Gmail:
   - Enable 2-factor authentication
   - Generate an [App Password](https://support.google.com/accounts/answer/185833)
   - Use the app password as `EMAIL_PASS`
3. The backend will automatically send email notifications for enquiries

## 🎨 Design System

### Colors

- **Primary Dark**: `#000000` (Black)
- **Primary Light**: `#1a1a1a` (Dark Gray)
- **Accent**: `#ffff00` (Yellow)
- **Grey**: `#808080` (Gray)

### Typography

- **Display Font**: Bebas Neue (for headings)
- **Body Font**: Inter (for body text)

### Animations

- Fade-in animations on page load
- Slide-up/slide-down transitions
- Hover scale effects
- Glow effects on interactive elements
- Smooth page transitions

## 📝 Managing Content

### Adding Events

**Option 1: Via JSON File (Current)**

Edit `frontend/src/data/events.json`:

```json
{
  "id": 3,
  "title": "New Event",
  "date": "2024-12-25",
  "location": "City, Country",
  "image": null,
  "description": "Event description"
}
```

**Option 2: Via API**

```bash
curl -X POST http://localhost:5000/api/events \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Event",
    "date": "2024-12-25",
    "location": "City, Country",
    "description": "Event description"
  }'
```

### Adding Reviews

**Option 1: Via JSON File (Current)**

Edit `frontend/src/data/reviews.json`:

```json
{
  "id": 6,
  "name": "Client Name",
  "message": "Amazing service!",
  "rating": 5,
  "created_at": "2024-01-20"
}
```

**Option 2: Via API**

```bash
curl -X POST http://localhost:5000/api/reviews \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Client Name",
    "message": "Amazing service!",
    "rating": 5
  }'
```

**Note**: When users submit feedback via the form, it's currently sent via EmailJS. With backend integration, reviews can be automatically saved to the database.

## 🚢 Deployment

### Frontend-Only Deployment (Static Site)

#### GitHub Pages (Automated CI/CD)

This repository includes a GitHub Actions workflow that automatically deploys to GitHub Pages on every push to `main` or `master` branch.

**Setup Instructions:**

1. **Enable GitHub Pages:**

   - Go to your repository Settings → Pages
   - Under "Source", select "GitHub Actions"

2. **Add Secrets (for EmailJS):**

   - Go to Settings → Secrets and variables → Actions
   - Add the following secrets:
     - `VITE_EMAILJS_SERVICE_ID`
     - `VITE_EMAILJS_TEMPLATE_ID`
     - `VITE_EMAILJS_PUBLIC_KEY`

3. **Push to Main Branch:**

   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

4. **Automatic Deployment:**
   - The workflow will automatically build and deploy your site
   - Check the "Actions" tab to see deployment status
   - Your site will be live at: `https://yourusername.github.io/euphoric/`

#### Vercel / Netlify

1. Connect your repository
2. Set build command: `cd frontend && npm run build`
3. Set output directory: `frontend/dist`
4. Add environment variables (EmailJS credentials)
5. Deploy!

#### Hostinger / Any Static Hosting

1. Build the project: `cd frontend && npm run build`
2. Upload `frontend/dist/` contents to `public_html`
3. Configure `.htaccess` for SPA routing (if needed)

### Full-Stack Deployment

#### Backend Deployment (Railway, Render, Heroku, etc.)

1. **Set Environment Variables:**

   - `PORT` (usually auto-set by platform)
   - `FRONTEND_URL` (your frontend URL)
   - `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` (database credentials)
   - `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASS` (optional)

2. **Database Setup:**

   - Use a managed MySQL service (e.g., Railway, PlanetScale, AWS RDS)
   - Update `DB_HOST` and credentials in backend `.env`

3. **Deploy Backend:**
   - Connect your repository
   - Set root directory to `backend`
   - Set start command: `npm start`
   - Deploy!

#### Frontend Deployment (with API Integration)

1. **Update Frontend Environment:**

   ```env
   VITE_API_URL=https://your-backend-url.com/api
   ```

2. **Deploy Frontend** (same as frontend-only deployment)

## 🔧 CI/CD Workflow

The repository includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that:

- Automatically builds the frontend on push to main/master
- Uses environment secrets for EmailJS configuration
- Deploys to GitHub Pages automatically
- Runs on every push and can be manually triggered

## 🎥 Video Features

### VideoGallery Component

The VideoGallery component provides a premium video viewing experience:

- **Hover Previews**: Hover over any video thumbnail to see a preview with sound (YouTube-style)
- **Playback Continuity**: Videos remember where you left off when switching between thumbnails
- **Smooth Animations**: Zoom animations and transitions for a polished feel
- **Mobile Support**: Tap once to preview, tap twice to open full video
- **Keyboard Navigation**:
  - `Arrow Left/Right` - Navigate between videos
  - `Space/Enter` - Play/Pause
  - `Escape` - Close video
- **Accessibility**: Full ARIA support, focus trap, keyboard navigation
- **Blurred Previews**: See blurred previews of next/previous videos in full-screen mode

### VideoPlayer Component

A professional video player with:

- **Full Controls**: Play, pause, volume, fullscreen
- **Timeline Seeking**: Click or drag on timeline to seek
- **Keyboard Shortcuts**:
  - `Space` - Play/Pause
  - `Arrow Left/Right` - Seek backward/forward 10 seconds
  - `Arrow Up/Down` - Increase/Decrease volume
  - `F` - Toggle fullscreen
  - `M` - Toggle mute
- **Auto-hide Controls**: Controls automatically hide during playback
- **Buffering Indicator**: Shows loading state during buffering
- **Start Time Support**: Can resume playback from a specific timestamp

## 🔒 Security Features

- **Helmet.js** - Sets various HTTP headers for security
- **CORS** - Configured to allow requests only from frontend URL
- **Rate Limiting** - Prevents abuse on review and enquiry endpoints
- **Input Validation** - Validates request data before processing
- **SQL Injection Protection** - Uses parameterized queries
- **Environment Variables** - Sensitive data stored in `.env` files
- **Redis Caching** - Optional caching layer for improved performance (graceful fallback if unavailable)

## 📧 Contact Information

- **Phone**: +91 9727579905
- **WhatsApp**: +91 9727579905
- **Email**: euphoricparth1003@gmail.com
- **Instagram**: [@_euphoric_live_](https://www.instagram.com/_euphoric_live_)

## 🐛 Troubleshooting

### Backend Issues

**Database Connection Failed:**

- Verify MySQL server is running
- Check database credentials in `backend/.env`
- Ensure database `euphoric_db` exists
- Check firewall settings if using remote database

**Port Already in Use:**

- Change `PORT` in `backend/.env`
- Or kill the process using the port: `lsof -ti:5000 | xargs kill`

**Email Not Sending:**

- Verify email credentials in `backend/.env`
- For Gmail, ensure you're using an App Password
- Check email service logs in console

### Frontend Issues

**EmailJS Not Working:**

- Verify environment variables are set correctly in `frontend/.env`
- For GitHub Pages, ensure secrets are added in repository settings
- Check EmailJS service and template IDs
- Ensure EmailJS account is active
- Check browser console for errors

**API Connection Failed:**

- Verify `VITE_API_URL` is set correctly in `frontend/.env`
- Ensure backend server is running
- Check CORS configuration in backend
- Verify backend URL is accessible

**Images Not Loading:**

- Verify image paths in `frontend/src/utils/imageImports.js`
- Ensure assets are in `frontend/src/assets/`
- Check file extensions match (case-sensitive)

**Build Errors:**

- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version: `node --version` (should be v18+)
- Verify all dependencies are installed

**GitHub Pages Routing Issues:**

- Ensure `base: '/euphoric/'` is set in `vite.config.js` (already configured)
- All routes should work correctly with React Router

### Monorepo Issues

**Concurrent Scripts Not Working:**

- Ensure `concurrently` is installed: `npm install`
- Check that both `frontend` and `backend` directories exist
- Verify package.json scripts are correct

## 📄 License

This project is proprietary and confidential.

## 🤝 Contributing

This is a private project. For contributions, please contact the project owner.

---

**Built with ❤️ for Stackified**
