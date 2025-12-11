# SpeakMaster - Spoken English Learning App

## Overview
SpeakMaster is a web-based English learning application designed for Indian learners. It features interactive conversations, speech recognition for pronunciation practice, grammar lessons, and quizzes across a 3-week curriculum.

## Recent Changes
- **December 2024**: Initial development
  - Created complete 3-week curriculum with Indian context
  - Implemented Web Speech API for pronunciation practice
  - Built responsive UI with dark mode support
  - Added mock authentication with localStorage

## Project Architecture

### Frontend Structure
```
client/src/
├── components/       # Reusable UI components
│   ├── ChatBubble.tsx        # Message bubbles for dialogues
│   ├── FeedbackDisplay.tsx   # Speech feedback UI
│   ├── Footer.tsx            # Site footer
│   ├── GrammarCard.tsx       # Grammar rule cards
│   ├── Header.tsx            # Navigation header
│   ├── MicrophoneButton.tsx  # Pulsing mic button
│   ├── QuizCard.tsx          # Quiz components
│   ├── ThemeProvider.tsx     # Dark/light mode
│   └── WeekCard.tsx          # Week progress cards
├── hooks/
│   └── useSpeechRecognition.ts  # Web Speech API hook
├── lib/
│   ├── auth.ts              # Authentication utilities
│   ├── weekData.ts          # Curriculum content
│   └── queryClient.ts       # React Query setup
├── pages/
│   ├── dashboard.tsx        # Main dashboard
│   ├── login.tsx            # Login page
│   ├── signup.tsx           # Signup page
│   ├── profile.tsx          # User profile
│   ├── week.tsx             # Week detail view
│   ├── topic.tsx            # Topic with chat bubbles
│   ├── practice.tsx         # Speech practice
│   ├── grammar.tsx          # Grammar lessons
│   └── quiz.tsx             # Quiz page
└── App.tsx                  # Routes and providers
```

### Curriculum
- **Week 1 - Introduction**: Greetings, self-introduction, Am/Is/Are grammar
- **Week 2 - My World**: Family, This/That/These/Those
- **Week 3 - Daily Routine**: Morning activities, Present Simple S/ES rules

### Key Features
1. **Chat Interface**: Left-aligned bubbles for teachers (Amit, Priya), right-aligned for learner
2. **Speech Recognition**: Web Speech API with visual feedback (green/red)
3. **Progress Tracking**: localStorage-based progress persistence
4. **Dark Mode**: System preference detection with toggle

## User Preferences
- Using localStorage for mock authentication and progress
- Indian context with local names and scenarios
- Mobile-first responsive design

## Running the App
The app runs on port 5000 with `npm run dev` which starts both the Express backend and Vite frontend.
