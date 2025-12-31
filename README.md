# Champ Code Academy — Tutor Portal

A modern, responsive Tutor Portal frontend for Champ Code Academy that allows tutors to log in, view their teaching schedule, and take on available classes.

## 🎯 Features

### Core Features
- **Login Page**: Mock authentication system (any email/password works)
- **Tutor Dashboard**: Comprehensive lesson management with four sections:
  - **Today's Lessons**: Lessons scheduled for today
  - **Upcoming Lessons**: Confirmed future lessons
  - **Available Lessons**: Open slots tutors can take
  - **Historic Lessons**: Completed lessons
- **Monthly Grouping**: Lessons are grouped by month by default for better organization
- **Date Filters**: 
  - Filter by specific month
  - Filter by date range
  - Dynamic re-rendering when filters are applied
- **Take Class**: Tutors can claim available lessons with a single click

### UI/UX Features
- Clean, modern, and intuitive interface
- Consistent component design
- Loading states for async operations
- Error handling with user-friendly messages
- Responsive design (mobile-friendly)
- Dark/Light mode toggle

### Technical Features
- React with TypeScript
- Zustand for state management
- TailwindCSS for styling (no UI kits)
- Mock API with configurable delay
- Protected routes
- Persistent authentication and theme preferences

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd tutor-portal
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
# or
yarn build
# or
pnpm build
```

Preview the production build:
```bash
npm run preview
# or
yarn preview
# or
pnpm preview
```

## 📁 Project Structure

```
tutor-portal/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Layout/          # Layout components (TopNavbar, PageHeader)
│   │   ├── LessonCard.tsx   # Individual lesson card component
│   │   ├── LessonSection.tsx # Section wrapper for lessons
│   │   ├── Filters.tsx      # Date/month filter component
│   │   ├── ProtectedRoute.tsx # Route protection component
│   │   ├── LoadingSpinner.tsx # Loading indicator
│   │   └── ErrorMessage.tsx # Error display component
│   ├── pages/              # Page components
│   │   ├── Login.tsx       # Login page
│   │   └── Dashboard.tsx   # Main dashboard page
│   ├── store/              # Zustand state management
│   │   ├── authStore.ts   # Authentication state
│   │   ├── lessonsStore.ts # Lessons data and filtering
│   │   └── themeStore.ts  # Theme (dark/light) state
│   ├── services/          # API services
│   │   └── api.ts         # Mock API implementation
│   ├── types/             # TypeScript type definitions
│   │   └── index.ts
│   ├── data/              # Mock data
│   │   └── mockData.ts
│   ├── App.tsx            # Main app component
│   ├── main.tsx           # Entry point
│   └── index.css          # Global styles
├── package.json
├── tailwind.config.js     # TailwindCSS configuration
├── tsconfig.json          # TypeScript configuration
└── vite.config.ts         # Vite configuration
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory (optional):

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

If not set, the app will use mock data by default.

### API Integration

The app is configured to work with a mock API by default. To connect to a real FastAPI backend:

1. Update `VITE_API_BASE_URL` in your `.env` file
2. Modify `src/services/api.ts` to use real API endpoints
3. Ensure your backend follows the expected data structure (see `src/types/index.ts`)

## 📝 Usage

### Login
- Enter any email and password (mock authentication)
- Click "Login" to access the dashboard

### Dashboard
- **Default View**: Lessons are grouped by month, then by type (Upcoming, Available, Historic)
- **Filtered View**: When filters are applied, lessons are shown by type only
- **Take Class**: Click "Take Class" button on available lessons to claim them

### Filters
- **By Month**: Select a specific month to filter lessons
- **Date Range**: Select a start and end date to filter lessons within that range
- **Clear Filters**: Click "Clear Filters" to reset all filters

### Theme Toggle
- Click the sun/moon icon in the top navbar to toggle between light and dark mode
- Theme preference is saved and persists across sessions

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **State Management**: Zustand
- **Routing**: React Router v6
- **Date Handling**: date-fns
- **Icons**: Heroicons
- **HTTP Client**: Axios