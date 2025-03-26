# Job Listings App

A mobile-friendly job listings application built with Ionic React, Redux Toolkit, and TypeScript. This app allows users to browse job listings, view job details, and apply for positions.

## Features

- 📱 Mobile-first, responsive design
- 🔍 Real-time job search with debounce
- 📄 Detailed job listings with pagination
- 📝 Job application system
- 💾 Local storage for applied jobs

## Technology Stack

- Ionic React
- Redux Toolkit for state management
- React Router for navigation
- Axios for API integration
- TypeScript for type safety
- Vite for build tooling

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Android Studio (for APK generation)
- JDK 11 or higher (for Android build)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/job-listings-app.git
cd job-listings-app
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

## Project Structure

```
job-listings-app/
├── src/
│   ├── components/    # Reusable UI components
│   ├── pages/        # Page components
│   ├── services/     # API and utility services
│   ├── store/        # Redux store configuration
│   └── theme/        # Global styles and theme
├── public/           # Static assets
└── ...
```

## Features Implemented

1. **Navigation**
   - Home page with job listings
   - Job details page
   - Job application page
   - About page
   - 404 Not Found page

2. **State Management**
   - Global state management with Redux Toolkit
   - Job listings state
   - Selected job details

3. **API Integration**
   - Job listings fetch
   - Job details fetch
   - Job application submission

4. **UI/UX Features**
   - Responsive design
   - Search functionality with debounce
   - Pagination with items per page selection
   - Applied jobs tracking

## Additional Improvements

- Implemented proper form validation
- Added loading states and error handling
- Optimized performance with lazy loading
- Enhanced UI with smooth animations
- Added proper TypeScript types

