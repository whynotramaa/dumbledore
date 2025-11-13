# 🧠 Dumbledore - AI Voice Tutoring Platform  
### Project-Based Technical Interview Questions (Tech Mahindra Focus)

---

## 1. Project Overview & Motivation
- What problem does Dumbledore solve, and how is it different from existing AI tutors like Duolingo or SpeakAI?
- Why did you choose a **voice-first** interface instead of traditional text-based chat?
- What made you pick **Next.js + Supabase + Clerk + GPT-4 + ElevenLabs** as your stack?
- How does your system ensure real-time interaction and minimal latency during voice sessions?

---

## 2. Frontend (Next.js, React 19, TypeScript)
- What’s the advantage of using **React Server Components** with the Next.js App Router?
- Explain how **data fetching** and **server actions** work in your app.
- What performance optimizations did you use with **Turbopack**, and how did it help dev builds?
- How do you manage **state** for active sessions and user stats (e.g., companions, session history)?
- How do you handle **conditional rendering** or **loading states** in your session dashboard?
- What’s your strategy for **responsive design** and accessibility (ARIA, keyboard navigation)?
- If I open the dashboard on mobile, how are the animations and components optimized to prevent jank?

---

## 3. Backend & Database (Supabase + RLS + Clerk)
- Why did you choose **Supabase PostgreSQL** over Firebase or Prisma with a custom DB?
- Can you explain how **Row Level Security (RLS)** works in Supabase and how you used it to protect user data?
- How do **JWTs from Clerk** integrate with Supabase for secure data access?
- What is the structure of your **users**, **companions**, and **session_history** tables?
- How would you implement a query to fetch all sessions of a specific user while ensuring they only see their own data?
- How do you handle **CRUD operations** — via API routes or **server actions**?
- What happens when an API key or token expires during a live session?

---

## 4. AI & Voice Integration (OpenAI + ElevenLabs + Deepgram + Vapi)
- Can you walk me through how a **voice session** is initiated, processed, and ended?
- What’s the flow of data between **user → microphone → transcription → GPT-4 → ElevenLabs → playback**?
- How did you handle **real-time streaming** of both text and audio responses?
- How do you ensure **session continuity** if the user’s connection drops?
- Why did you pick **Vapi SDK** instead of directly using WebRTC or Socket.io?
- What were the biggest **technical challenges** in integrating GPT-4 with ElevenLabs?

---

## 5. Authentication & Authorization (Clerk + Stripe)
- Why did you choose Clerk over NextAuth or Supabase Auth?
- How does **JWT-based route protection** work in your system?
- How are **subscription tiers** implemented — and how do they affect companion creation or session length?
- What happens when a user’s **subscription expires mid-session**?
- Can you explain how **Stripe webhooks** are used to update subscription status?

---

## 6. Performance & Monitoring (Sentry + Caching)
- How does **Sentry** help you monitor frontend and backend performance?
- What kind of issues has Sentry flagged in your project?
- How would you reduce the **latency** in live sessions or transcript updates?
- Why do you think **client-side caching (React Query)** is important for your app?
- If you wanted to scale this to 1,000 concurrent users, what bottlenecks would you expect?

---

## 7. Testing & Reliability
- What’s the difference between **unit**, **integration**, and **E2E** tests in your setup?
- Why did you pick **Playwright** for E2E testing?
- Can you show an example test case you’d write for validating a user session creation?
- How do you handle **test environment variables** securely?
- What’s currently missing from your testing pipeline?

---

## 8. Security & Risk Handling
- What are the biggest **security vulnerabilities** in your project right now?
- How would you fix the **API key exposure** issue you mentioned?
- What steps would you take to implement **CSRF protection**?
- How would you add **rate limiting** to prevent abuse of your API endpoints?
- Can you explain what **Zod** validation does and why it’s crucial?

---

## 9. Error Handling & Technical Debt
- What happens if **GPT-4 API** or **ElevenLabs API** fails mid-conversation?
- What’s your fallback mechanism for such errors?
- You mentioned “missing error boundaries” — can you explain what they are in React?
- How do you use **try/catch** or **error boundaries** to prevent full app crashes?
- How are **errors logged** and displayed to developers or admins?

---

## 10. Design & UX Decisions
- What principles guided your **UI/UX design** (color, layout, feedback animations)?
- How did you ensure a **modern and minimal** look using Tailwind + Radix UI?
- How do animated Lottie components enhance user experience?
- Did you perform any **usability testing** or user feedback loops?

---

## 11. DevOps & Deployment
- Why did you deploy on **Vercel** and not a self-hosted platform?
- How do you manage **environment variables** securely during deployment?
- What build optimizations did you configure for **SSR and caching**?
- How do you handle **rollback** if a deployment introduces a critical bug?
- What would be your plan to enable **CI/CD** integration?

---

## 12. Advanced/Scenario-Based Questions
- Suppose your voice session is **lagging by 2 seconds** — how would you debug it?
- If GPT-4’s cost per session becomes too high, what optimizations or architectural changes could you introduce?
- How would you support **multi-language transcription and voices**?
- If you wanted to build a **“group session” feature** (multiple users + AI), what changes would you make?
- How would you **cache AI responses** to reduce repeated token usage?

---

## 13. Reflection & Learnings
- What was the **most technically challenging** part of this project and how did you solve it?
- What part of the project are you **most proud of**?
- If you had to redo the project, what would you **do differently**?
- What did this project teach you about **real-time systems**, **authentication**, or **scaling AI apps**?

---

### ✅ Bonus Tip:
Tech Mahindra interviewers often check:
- **Depth > Buzzwords** — they want to see if you understand your stack’s internals.
- **Team adaptability** — can you explain trade-offs clearly?
- **Error handling and edge cases** — they love hearing “what happens if X fails?”
- **Security awareness** — always mention JWT, RLS, rate limiting, and Zod validation.

---

