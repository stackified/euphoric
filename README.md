# EUPHORIC LIVE - Professional Event Management Website

A professional, bold, responsive, and animated event management website built with modern web technologies. The design is inspired by the sleek, minimalistic dark theme of Enrique Iglesias' website, featuring smooth animations, clean layouts, and consistent typography.

## 🚀 Features

- **Modern Frontend**: React.js with Vite for fast development and optimized builds
- **Beautiful UI**: TailwindCSS with custom animations matching Enrique Iglesias design
- **Smooth Animations**: Framer Motion for fluid page transitions and interactions
- **State Management**: Redux Toolkit for global state management
- **Email Integration**: EmailJS for contact forms and feedback submissions (no backend needed!)
- **Static Data**: JSON files for events and reviews (easy to edit)
- **Responsive Design**: Mobile-first approach with perfect responsiveness
- **Cookie Management**: GDPR-compliant cookie consent banner
- **Image Gallery**: Modal image viewer with smooth zoom animations
- **Video Integration**: YouTube and Google Drive video embedding
- **Event Management**: Static events display (edit JSON to update)
- **Reviews System**: Static reviews display (edit JSON to update)
- **CI/CD**: Automated deployment to GitHub Pages

## 📁 Project Structure

```
euphoric/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions CI/CD workflow
├── frontend/                    # React frontend application
│   ├── public/                 # Static assets (favicon, etc.)
│   ├── src/
│   │   ├── assets/            # Images, logos, gallery
│   │   ├── components/         # Reusable React components
│   │   ├── pages/             # Page components
│   │   ├── data/              # JSON files for events and reviews
│   │   ├── store/             # Redux store and slices
│   │   ├── utils/             # Utility functions
│   │   ├── App.jsx            # Main app component
│   │   └── main.jsx           # Entry point
│   ├── package.json
│   └── vite.config.js
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
- **EmailJS** - Email service integration (no backend needed!)
- **React Icons** - Icon library

## 📦 Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/euphoric.git
cd euphoric
```

### Step 2: Install Dependencies

**Frontend:**

```bash
cd frontend
npm install
```

### Step 3: Set Up Environment Variables

Create `frontend/.env`:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

**Note**: Get these from [EmailJS](https://www.emailjs.com/) - it's free!

### Step 4: Configure Static Data

Edit JSON files to customize:

**Events** (`frontend/src/data/events.json`):

```json
[
  {
    "id": 1,
    "title": "Summer Concert 2024",
    "date": "2024-06-15",
    "location": "Mumbai, India",
    "image": null,
    "description": "An amazing summer concert event"
  }
]
```

**Reviews** (`frontend/src/data/reviews.json`):

```json
[
  {
    "id": 1,
    "name": "Client Name",
    "message": "Great service!",
    "rating": 5,
    "created_at": "2024-01-15"
  }
]
```

## 🚀 Running the Application

### Development Mode

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

## 📱 Pages & Components

### Pages

- **Home** (`/`) - Hero section with animated background, services preview, events preview, gallery preview
- **About** (`/about`) - Company information and mission
- **Services** (`/services`) - List of all event management services with professional icons
- **Gallery** (`/gallery`) - Image gallery with modal viewer
- **Videos** (`/videos`) - Video showcase with embedded players
- **Events** (`/events`) - Upcoming events display (from JSON)
- **Contact** (`/contact`) - Contact information and quick actions
- **Links** (`/links`) - Social media and external links
- **Feedbacks** (`/feedbacks`) - Client reviews (from JSON) and feedback form (sends via EmailJS)
- **Enquiry** (`/enquiry`) - Contact form for event inquiries (sends via EmailJS)

### Key Components

- **Navbar** - Responsive navigation with smooth scroll effects
- **Footer** - Contact information and quick links
- **Hero** - Full-screen hero section with animated overlays and contact buttons
- **CookieBanner** - GDPR-compliant cookie consent
- **ServicesPreview** - Homepage services preview
- **EventsPreview** - Homepage events preview
- **GalleryPreview** - Homepage gallery preview

## 📧 EmailJS Setup

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

### Adding Reviews

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

**Note**: When users submit feedback via the form, it's sent directly to your email via EmailJS. You can manually add approved reviews to the JSON file.

## 🚢 Deployment

### GitHub Pages (Automated CI/CD)

This repository includes a GitHub Actions workflow that automatically deploys to GitHub Pages on every push to `main` or `master` branch.

#### Setup Instructions:

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

#### Manual Deployment:

If you need to deploy manually:

```bash
cd frontend
npm run build
# The dist/ folder is ready for deployment
```

### Vercel / Netlify

1. Connect your repository
2. Set build command: `cd frontend && npm run build`
3. Set output directory: `frontend/dist`
4. Add environment variables (EmailJS credentials)
5. Deploy!

### Hostinger / Any Static Hosting

1. Build the project: `cd frontend && npm run build`
2. Upload `frontend/dist/` contents to `public_html`
3. Configure `.htaccess` for SPA routing (if needed)

## 🔧 CI/CD Workflow

The repository includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that:

- Automatically builds the frontend on push to main/master
- Uses environment secrets for EmailJS configuration
- Deploys to GitHub Pages automatically
- Runs on every push and can be manually triggered

## 📧 Contact Information

- **Phone**: +91 9727579905
- **WhatsApp**: +91 9727579905
- **Email**: euphoricparth1003@gmail.com
- **Instagram**: [@_euphoric_live_](https://www.instagram.com/_euphoric_live_)

## 🐛 Troubleshooting

### EmailJS Not Working

- Verify environment variables are set correctly in `frontend/.env`
- For GitHub Pages, ensure secrets are added in repository settings
- Check EmailJS service and template IDs
- Ensure EmailJS account is active
- Check browser console for errors

### Images Not Loading

- Verify image paths in `frontend/src/utils/imageImports.js`
- Ensure assets are in `frontend/src/assets/`
- Check file extensions match (case-sensitive)

### Build Errors

- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version: `node --version` (should be v18+)
- Verify all dependencies are installed

### GitHub Pages Routing Issues

- Ensure `base: '/euphoric/'` is set in `vite.config.js` (already configured)
- All routes should work correctly with React Router

## 📄 License

This project is proprietary and confidential.

## 🤝 Contributing

This is a private project. For contributions, please contact the project owner.

---

**Built with ❤️ for Stackified**
