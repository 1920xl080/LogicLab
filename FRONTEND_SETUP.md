# LogicLab React Native Frontend Setup

This document describes the React Native frontend that was created for LogicLab, similar to the PWAM web application.

## 📁 Project Structure

```
LogicLab/
├── app/
│   ├── _layout.tsx              # Root layout with AuthProvider
│   ├── (tabs)/
│   │   ├── _layout.tsx         # Tab navigation layout
│   │   └── index.tsx           # Home screen
│   ├── auth.tsx                # Authentication screen
│   ├── dashboard.tsx           # User dashboard with stats
│   ├── challenges.tsx          # List of all challenges
│   └── exercise/
│       └── [id].tsx            # Exercise detail/quiz screen
├── components/
│   └── ui/
│       ├── Button.tsx          # Reusable button component
│       ├── Card.tsx            # Card components
│       ├── Badge.tsx          # Badge component
│       └── Progress.tsx       # Progress bar component
├── context/
│   └── AuthContext.tsx        # Authentication context provider
├── data/
│   └── mockData.ts            # Challenge and question data
└── lib/
    └── supabase.ts            # Supabase client setup
```

## 🚀 Features Implemented

### 1. Authentication
- Google OAuth integration via Supabase
- Email domain restriction (STEI ITB)
- Session management with AsyncStorage
- Automatic session restoration

### 2. Screens
- **Home Screen**: Landing page with app information
- **Auth Screen**: Google login interface
- **Dashboard Screen**: User statistics and progress tracking
- **Challenges Screen**: List of all available exercises
- **Exercise Detail Screen**: Interactive quiz interface

### 3. UI Components
- Button (with variants: default, outline, ghost)
- Card (with Header, Content, Title)
- Badge (with variants: default, outline, success, warning, danger)
- Progress bar

### 4. Data Management
- Challenge data structure with questions and options
- User progress tracking
- Local draft saving for exercises
- Backup submission sync to database

## 📦 Dependencies Added

- `@supabase/supabase-js`: Supabase client
- `@react-native-async-storage/async-storage`: Local storage

## 🔧 Setup Instructions

### 1. Install Dependencies

```bash
cd LogicLab
npm install
```

### 2. Environment Variables

Create a `.env` file or update `app.json` with:

```json
{
  "expo": {
    "extra": {
      "supabaseUrl": "your-supabase-url",
      "supabaseAnonKey": "your-anon-key",
      "allowedEmailDomain": "std.stei.itb.ac.id",
      "productionUrl": "your-redirect-url"
    }
  }
}
```

Or use environment variables:
- `EXPO_PUBLIC_SUPABASE_URL`
- `EXPO_PUBLIC_SUPABASE_ANON_KEY`
- `EXPO_PUBLIC_ALLOWED_EMAIL_DOMAIN`
- `EXPO_PUBLIC_PRODUCTION_URL`

### 3. Run the App

```bash
npm start
# Then press 'i' for iOS or 'a' for Android
```

## 🎯 Key Features

### Authentication Flow
1. User clicks "Sign in with Google"
2. Redirects to Google OAuth
3. Returns to app with session
4. User data synced from Supabase
5. Progress tracked locally and in database

### Exercise Flow
1. Browse challenges on Challenges screen
2. Select a challenge to start
3. Answer multiple-choice questions
4. Submit answers
5. View results and explanations
6. Progress automatically saved

### Dashboard Features
- Total score tracking
- Completion statistics
- Average score calculation
- Recent submissions list
- Progress visualization

## 🔄 Data Flow

1. **Challenges**: Loaded from `data/mockData.ts`
2. **User Progress**: Stored in Supabase `user_challenge_submissions` table
3. **Local Storage**: Used for drafts and backup submissions
4. **Sync**: Automatic sync of backup submissions on login

## 📱 Navigation Structure

- **Tabs**: Home, Explore
- **Stack**: Auth, Dashboard, Challenges, Exercise Detail
- **Protected Routes**: Dashboard and Challenges require authentication

## 🎨 Styling

- Uses React Native StyleSheet
- Consistent color scheme matching PWAM
- Responsive design for mobile devices
- Themed components support light/dark mode

## 🔐 Security

- Email domain restriction enforced
- Row Level Security (RLS) on Supabase
- Session validation before database operations
- Local backup for offline scenarios

## 📝 Notes

- The app structure mirrors PWAM but uses React Native components
- Navigation uses Expo Router (file-based routing)
- State management via React Context API
- AsyncStorage used instead of localStorage
- Supabase client configured for React Native

## 🐛 Known Limitations

- OAuth redirect URL needs to be configured for your deployment
- Some animations from PWAM (Framer Motion) not implemented
- Image loading may need optimization for production
- Error handling could be enhanced with retry logic

## 🚧 Next Steps

1. Configure Supabase backend
2. Set up Google OAuth in Supabase dashboard
3. Test authentication flow
4. Add more challenges to mockData
5. Implement additional UI polish
6. Add loading states and error boundaries
7. Test on physical devices

