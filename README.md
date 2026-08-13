# Crowna 👑

> "Your hair, your crown. Never worry about what hairstyle to do next."

Crowna is a personalized hairstyle planning application that helps women decide what hairstyle to do next. It creates a hair profile based on the user's hair type, texture, length, face shape, and preferences, then generates a recommended schedule of hairstyles. 

## Features (MVP)
- **Personalized Hair Profile**: Quick onboarding quiz to determine your hair type, texture, length, and face shape.
- **Smart Hairstyle Planner**: A calendar view (Current → Next → Upcoming) that suggests styles tailored to you.
- **10 Options Per Slot**: Don't like the primary recommendation? Browse 10 alternative styles with match scores.
- **Hairstyle Library**: Browse curated styles with categories like Braids, Natural, and Locs.
- **At-Home Tutorials**: Watch step-by-step tutorials for styles you prefer to do yourself.
- **Style History**: Automatically tracks your past hairstyles so you know what worked.

## Tech Stack
- **Frontend**: React Native with Expo (Cross-platform iOS, Android, Web)
- **Navigation**: Expo Router (File-based routing)
- **State Management**: React Context / Zustand
- **Backend (Planned)**: Supabase (PostgreSQL, Auth, Storage)

## Getting Started

### Prerequisites
- Node.js (v18 or newer)
- npm or yarn
- Expo Go app on your iOS/Android device (optional, for physical device testing)

### Installation

1. Clone the repository
   ```bash
   git clone <your-repo-url>
   cd crowna
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the Expo development server
   ```bash
   npm start
   ```

4. Press `a` to open in Android emulator, `i` for iOS simulator, or scan the QR code with the Expo Go app on your physical device.

## Future Roadmap
- **V2**: Better AI/Rule-based personalization & alternative suggestions.
- **V3**: Hair care tracking (wash days, deep conditioning routines).
- **V4**: Hair product discovery and tracking.
- **V5**: Local salon and stylist discovery.
- **V6**: User-Creator Platform (users post their own styles).

## License
MIT License
