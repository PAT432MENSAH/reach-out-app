# REACH OUT - Learning Platform

A comprehensive laptop-responsive learning platform with authentication, course tracking, and blog integration.

## Features

### ✅ Authentication System
- **Sign Up** (`signup.html`) - Create new account with email/password
- **Login** (`login.html`) - Authenticate to access the platform
- **Forgot Password** (`forgot-password.html`) - Reset password securely
- All credentials stored locally in browser (localStorage)

### 🎓 Learning Paths
Four comprehensive courses to overcome fear:

1. **Clarity** (`clarity.html`) - Master clear thinking and communication
2. **Confidence** (`confidence.html`) - Build self-assurance and overcome imposter syndrome
3. **Critical Thinking** (`critical-thinking.html`) - Develop powerful analytical skills
4. **AI Coach** (`ai-coach.html`) - Get personalized guidance with interactive chatbot

### 📊 Dashboard (`dashboard.html`)
- Track overall learning progress
- Monitor individual course completion (0-100%)
- View learning statistics (courses completed, total hours, streak)
- See recent activity feed
- Quick access to all courses

### 📝 Blog
- **Blog Listing** (`blog.html`) - View all articles
- **Blog Detail** (`blog-detail.html`) - Read full articles
- 6 pre-loaded articles on personal growth and learning
- Filter by category (Clarity, Confidence, Critical Thinking, etc.)

### 🎠 Home Page Features
- **Image Slider** - Auto-rotating hero images with manual controls
- **Feature Showcase** - Key capabilities
- **Blog Preview** - Featured articles on home page
- **Contact Form** - Get in touch

### 📱 Responsive Design
- Laptop-first design
- Mobile-friendly breakpoints
- Touch-friendly interface
- Adaptive layouts

## File Structure

```
index.html                 # Home page with slider & blog preview
login.html                 # Login page
signup.html                # Registration page
forgot-password.html       # Password reset
dashboard.html             # Main dashboard
clarity.html               # Clarity course
confidence.html            # Confidence course
critical-thinking.html     # Critical Thinking course
ai-coach.html              # AI Coach with chat
blog.html                  # Blog listing
blog-detail.html           # Individual blog post
auth.js                    # Authentication & account management
dashboard.js               # Dashboard functionality
course.js                  # Course management
script.js                  # General interactivity
styles.css                 # All styling
```

## How to Use

### Getting Started
1. Open `index.html` in your browser
2. Click "Get Started" → Sign Up to create an account
3. Fill in your details (email & password)
4. You'll be automatically logged in to the Dashboard

### Logging In
1. Go to Login page (or click Dashboard when logged out)
2. Enter your email and password
3. Access your personalized dashboard

### Taking Courses
1. From Dashboard, click "Continue Learning" on any course
2. Each course has 4 interactive lessons
3. Click lesson to complete it
4. Progress updates automatically on dashboard

### Reading Articles
1. Go to Blog from navigation or home page
2. Read individual articles by clicking titles
3. View related articles at bottom of post

### Tracking Progress
- Dashboard shows real-time progress for each course
- Track completed courses, total study time, and learning streak
- Activity feed logs all your learning actions

## Authentication Details

**Demo Credentials:**
- Create your own account - all data is stored locally
- Accounts are stored in browser localStorage
- You can have multiple accounts (each with unique email)
- Data persists even after closing browser

### Sample Test Account
1. Sign up with: test@example.com / password123
2. Complete lessons to see progress tracking

## Customization

### Add New Articles
Edit `blog-detail.html` - Add new entries to the `blogPosts` object with:
- title, category, date, excerpt, image (gradient), content, tags

### Add New Courses
Create similar course pages to `clarity.html` with:
- Course hero section
- Sidebar with progress tracking
- Lesson items (click to complete)
- Course content modules

### Update Colors
Edit `styles.css`:
- Primary color: `--accent: #7c3aed`
- Secondary colors in course headers (`.clarity-bg`, `.confidence-bg`, etc.)

## Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Requires JavaScript enabled

## Data Storage
- All user data stored in browser localStorage
- No server required
- Data cleared if browser storage is cleared
- Separate storage for each domain

## Features Implemented ✓

✅ Authentication (Sign up, Login, Forgot Password)
✅ Dashboard with progress tracking
✅ 4 comprehensive courses
✅ Interactive lesson completion
✅ Progress metrics and activity feed
✅ Blog with 6 articles
✅ Image slider on home page
✅ Responsive design (laptop-first)
✅ Interactive AI coach chatbot
✅ Local storage for persistent data
✅ Link all pages appropriately
✅ Form validation and error handling

## Tips

1. **Navigation**: All pages link properly. Use "Dashboard" button when logged in
2. **Progress**: Complete lessons to see dashboard update
3. **Blog**: Articles are pre-populated with real content
4. **Mobile**: Works on tablets/phones but optimized for laptops
5. **Data**: Use browser DevTools → Application → Local Storage to see stored data

---

**REACH OUT** - Communication Mastery for Modern Teams
© 2026 REACH OUT
