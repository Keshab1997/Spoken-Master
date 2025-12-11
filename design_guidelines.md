# SpeakMasterApp Design Guidelines

## Design Approach
**Utility-Focused Educational Platform** - Function and learnability are paramount for this language learning application. The design emphasizes clear information hierarchy, immediate feedback mechanisms, and accessible interaction patterns.

## Color System
Primary: `#4A90E2` (Blue - Trust, learning, professionalism)
Secondary: `#50E3C2` (Teal - Success, encouragement, energy)
Background: `#F4F7F6` (Light neutral - Clean, distraction-free)
Feedback Colors:
- Success: Green (Correct pronunciation/answers)
- Error: Red (Incorrect pronunciation/answers)

## Typography
- Primary font: Clean, readable sans-serif (Poppins or Inter via Google Fonts)
- Hierarchy: Large headings for week titles, medium for topics, regular for dialogue content
- Chat bubbles: 16px body text, 14px timestamps
- Grammar rules: Bold for key terms, regular for explanations

## Layout System
Use Tailwind spacing units: **2, 4, 8, 12, 16** for consistency
- Card padding: p-4 or p-6
- Section spacing: mb-8 or mb-12
- Chat message gaps: gap-4
- Grid gaps: gap-6

## Core Components

### Dashboard (index.html)
- Week cards in responsive grid (1 col mobile, 2-3 cols desktop)
- Each card shows: Week number, title, progress indicator, topics count
- Locked/unlocked states with visual differentiation

### Chat Interface (topic.html)
**Critical Pattern**: Message bubble layout
- Left-aligned bubbles: Indian character names (Amit/Priya) with avatar placeholder
- Right-aligned bubbles: User/learner responses
- Rounded corners, subtle shadows
- Alternating message flow with breathing room

### Practice Sessions (practice.html)
**Hero Element**: Large pulsing microphone button (center-aligned)
- Circular button (120px diameter)
- Pulsing animation on active state
- Feedback text below: Green for correct, Red for incorrect
- Target phrase displayed prominently above mic

### Grammar Pages
- Rule cards with icon + title + explanation format
- Example sentences in highlighted boxes
- Quiz components at bottom with radio buttons/checkboxes

### Authentication Pages
- Centered form layout (max-width: 400px)
- Simple input fields with clear labels
- Primary CTA button (full-width)
- Link to alternate action (Login ↔ Signup)

## Navigation
- Top header: Logo left, Profile/Logout right
- Mobile: Hamburger menu
- Footer: Minimal links (About, Contact)

## Responsive Behavior
**Mobile-First**: All interactions thumb-friendly
- Minimum tap target: 44px
- Chat bubbles: Full width with 16px side margins
- Week cards: Stack vertically on mobile
- Microphone button: Always prominent and centered

## Interactive States
- Buttons: Subtle hover lift + shadow
- Cards: Hover reveals "Start" or "Continue" CTA
- Active mic: Continuous pulse animation
- Disabled states: 50% opacity, no pointer

## Accessibility
- ARIA labels for microphone button states
- Focus indicators on all interactive elements
- Sufficient color contrast (WCAG AA)
- Clear error messages for speech recognition

## Content Presentation
- Week titles: Bold, large (32px)
- Topic dialogues: Chat bubble format with character avatars
- Grammar: Structured cards with examples
- Indian context: Use local names (Amit, Priya), scenarios (tea, bus commute, phone)

## Images
**Minimal approach**: No large hero images
- Avatar placeholders for characters (40px circles)
- Icon set for topics (Heroicons or Font Awesome)
- Grammar illustrations: Simple line icons
- No decorative imagery - focus on functionality

**Key Principle**: Clean, distraction-free learning environment where speech practice and content comprehension are the primary focus. Visual feedback (colors, animations) guides learning progress without overwhelming the user.