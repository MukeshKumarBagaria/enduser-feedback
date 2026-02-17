# Project Prompt: Next.js User Feedback Collection Website (PDF Theme Review)

## Objective
Build a professional, self-describing web application using **Next.js** and **Supabase** that allows end users to review **three Figma design themes (PDF format)** and submit structured feedback **only after viewing all designs**.

The purpose of the application is to collect unbiased user preference feedback for UI color themes.

---

## Core User Flow
1. User opens a **shared public link** (no login required).
2. User is guided through **three embedded PDF design previews**:
   - Theme 1: Green
   - Theme 2: Purple
   - Theme 3: Blue
3. User **must view all three PDFs** before being allowed to proceed.
4. After viewing all designs, a **feedback survey form** is unlocked.
5. User submits feedback successfully.
6. Show a **thank-you confirmation screen**.

---

## Tech Stack
- **Frontend**: Next.js (App Router preferred)
- **Styling**: Tailwind CSS
- **Backend / Database**: Supabase
- **PDF Rendering**: Native `<iframe>` or `react-pdf`
- **Deployment Ready**: Vercel-compatible

---

## UI / UX Requirements
### General
- Clean, modern, professional UI
- Self-describing interface (no external instructions needed)
- Clear progress indication
- Mobile + Desktop responsive

### Theme Preview Section
- Each theme displayed in a **dedicated card or step**
- Embedded PDF viewer per theme
- Label clearly as:
  - “Green Theme”
  - “Purple Theme”
  - “Blue Theme”

### Progress Enforcement (Critical)
- Users **cannot submit feedback unless all 3 themes are viewed**
- Track PDF viewing state (e.g.:
  - Scroll completion
  - Time spent
  - Explicit “Mark as Viewed” button)
- Show visual progress indicator (e.g. 1/3 → 2/3 → 3/3)

---

## Survey Form Requirements
Displayed **only after all PDFs are viewed**

### Fields
- **Full Name** (Text, required)
- **Department** (Text, required)
- **Preferred Color Theme** (Radio buttons)
  - Green
  - Purple
  - Blue

### Validation
- All fields mandatory
- Disable submit button until valid
- Prevent multiple submissions from same session

---

## Database Schema (Supabase)

### Table: `design_feedback`
| Column Name        | Type        | Description |
|--------------------|-------------|-------------|
| id                 | uuid        | Primary key |
| name               | text        | User full name |
| department         | text        | User department |
| preferred_color    | text        | Selected theme |
| viewed_green       | boolean     | Viewed green PDF |
| viewed_purple      | boolean     | Viewed purple PDF |
| viewed_blue        | boolean     | Viewed blue PDF |
| created_at         | timestamp   | Submission time |

---

## Functional Requirements
- Store feedback securely in Supabase
- Prevent form submission if any theme not viewed
- Handle refresh without losing progress (use localStorage/session)
- Basic anti-spam protection (single submission per session)

---

## Pages / Routes
- `/` → Introduction + Instructions
- `/review` → PDF viewer step-by-step
- `/feedback` → Survey form (locked until review complete)
- `/thank-you` → Confirmation screen

---

## UI Components Needed
- PDFViewer component
- ProgressTracker component
- FeedbackForm component
- SuccessMessage component

---

## Non-Functional Requirements
- Fast loading
- SEO-friendly meta tags
- Accessible (ARIA labels, keyboard navigation)
- Production-ready code structure

---

## Deliverables
- Complete Next.js project setup
- Supabase integration
- Clean, reusable component structure
- Ready for deployment

---

## Success Criteria
- User can **only** submit feedback after viewing all three designs
- Feedback stored correctly in Supabase
- UI feels intuitive without instructions
- Professional, enterprise-ready look and feel
