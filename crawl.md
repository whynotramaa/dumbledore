# 🧙‍♂️ Dumbledore - Project Architecture Audit

**Project Type**: AI-Powered Interactive Voice Learning Platform  
**Tech Stack**: Next.js 15, TypeScript, React 19  
**Audit Date**: November 13, 2025  
**Deployment**: Vercel  

---

## 📋 Executive Summary

Dumbledore is a sophisticated voice-first AI tutoring platform that enables real-time conversational learning through GPT-4 powered assistants. The application leverages modern web technologies with enterprise-grade authentication, subscription management, and error monitoring.

### Key Metrics
- **Framework**: Next.js 15.3.3 with Turbopack
- **Runtime**: React 19.0.0
- **Type Safety**: TypeScript 5
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Clerk v6.22.0
- **AI Integration**: OpenAI GPT-4, Vapi, ElevenLabs

---

## 🏗️ Architecture Overview

### **1. Application Architecture**

```
┌─────────────────────────────────────────────────────────────┐
│                      Next.js 15 App Router                   │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Frontend   │  │  Server      │  │   External   │      │
│  │   Layer      │  │  Actions     │  │   Services   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│         │                 │                   │              │
│         │                 │                   │              │
│    ┌────▼────┐      ┌────▼────┐        ┌────▼────┐        │
│    │ React   │      │  Clerk  │        │  Vapi   │        │
│    │ 19 +    │◄────►│  Auth   │◄──────►│  Voice  │        │
│    │ Client  │      │ Middle  │        │   SDK   │        │
│    │Components│     │  ware   │        └─────────┘        │
│    └────┬────┘      └────┬────┘                            │
│         │                 │                                 │
│         │           ┌─────▼─────┐                          │
│         └──────────►│  Supabase │                          │
│                     │  Database │                          │
│                     └───────────┘                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### **2. Data Flow Architecture**

```
User Action
    │
    ▼
Middleware (Clerk Auth Check)
    │
    ▼
Page Component (Server Component)
    │
    ├──► Server Actions (companion.actions.ts)
    │         │
    │         ▼
    │    Supabase Client (RLS enabled)
    │         │
    │         ▼
    │    PostgreSQL Database
    │
    └──► Client Components (Interactive UI)
              │
              ▼
         Vapi SDK (Voice Interface)
              │
              ▼
         AI Processing (GPT-4 + ElevenLabs)
```

---

## 📁 Project Structure Analysis

### **Core Directories**

#### `/app` - Next.js 15 App Router
**Purpose**: Application routes and page components  
**Pattern**: File-system based routing with React Server Components

**Key Routes**:
- `/` - Home dashboard with popular companions
- `/companions` - Browse all AI companions (filterable)
- `/companions/[id]` - Individual companion session page
- `/companions/new` - Create new companion (gated)
- `/my-journey` - User profile and session history
- `/subscription` - Clerk pricing table integration
- `/interview` - Placeholder feature (incomplete)
- `/api/sentry-example-api` - Error tracking test route

**Architecture Notes**:
- Heavy use of React Server Components for data fetching
- Async components with Supabase queries at page level
- No client-side state management library (Context/Redux)
- Dynamic routes use Promise-based params (Next.js 15)

#### `/components`
**Purpose**: Reusable UI components  
**Pattern**: Mix of server and client components

**Critical Components**:

1. **`CompanionComponent.tsx`** (Client Component)
   - Core voice interaction UI
   - Manages Vapi SDK lifecycle
   - Real-time call status and transcript display
   - Uses Lottie animations for visual feedback
   - Handles microphone toggle and session control

2. **`CompanionForm.tsx`** (Client Component)
   - React Hook Form + Zod validation
   - Creates new AI companion configurations
   - Form schema: name, subject, topic, voice, style, duration

3. **`Navbar.tsx`** (Server Component)
   - Clerk SignIn/UserButton integration
   - Conditional "Become Pro" vs "Make Companion" button
   - Uses `auth()` server-side check for plan status

4. **`BecomePro.tsx`** (Server Component)
   - Dynamic CTA based on user subscription tier
   - Checks `has({ plan: 'pro_learner' })`

**UI Library Components** (`/components/ui`):
- Radix UI primitives: Accordion, Select, Label
- Custom form components with React Hook Form
- Tailwind-styled button variants

#### `/lib`
**Purpose**: Business logic, utilities, and service integrations

**Key Files**:

1. **`lib/actions/companion.actions.ts`** (Server Actions)
   ```typescript
   // Core CRUD operations
   - createCompanion()      // Insert with duplicate check
   - getAllCompanions()     // Paginated query with filters
   - getCompanion()         // Single companion fetch
   - addToSessionHistory()  // Track user sessions
   - recentSession()        // Recent activity feed
   - userSession()          // User-specific history
   - getUserCompanion()     // User's created companions
   - newCompanionPermission() // Feature gating logic
   ```

   **Security**: All use `'use server'` directive + Clerk `auth()`

2. **`lib/supabase.ts`**
   ```typescript
   createSupabaseClient()
   - Integrates @supabase/supabase-js
   - Uses Clerk JWT as accessToken
   - Enables Row Level Security (RLS)
   ```

3. **`lib/vapi.sdk.ts`**
   ```typescript
   - Singleton Vapi instance
   - Configured with env key
   - Exported for client-side voice interactions
   ```

4. **`lib/utils.ts`**
   ```typescript
   - cn()                  // Tailwind class merger
   - getSubjectColor()     // Subject theme mapping
   - configureAssistant()  // Vapi assistant config builder
   ```

   **Assistant Configuration**:
   - GPT-4 model with custom system prompts
   - ElevenLabs voice selection (male/female, casual/formal)
   - Deepgram transcription (nova-3 model)
   - Dynamic variable injection: {{topic}}, {{subject}}, {{style}}

#### `/constants`
**Purpose**: Static configuration and theme data

```typescript
subjects = ["maths", "language", "science", "history", "coding", "economics"]

subjectsColors = {
  science: "#E5D0FF",
  maths: "#FFDA6E",
  language: "#BDE7FF",
  // ... color mappings
}

voices = {
  male: { casual: "6MoEUz34rbRrmmyxgRm4", formal: "ByWUwXA3MMLREYmxtB32" },
  female: { casual: "FzV1qDk1i6MbsuwXpJ46", formal: "kPzsL2i3teMYv0FxEYQ6" }
}
```

**Note**: ElevenLabs voice IDs are hardcoded - consider moving to env vars

#### `/types`
**Purpose**: TypeScript type definitions

**Key Types**:
```typescript
interface CreateCompanion {
  name: string
  subject: string
  topic: string
  voice: string
  style: string
  duration: number
}

interface CompanionComponentProps {
  companionId: string
  subject: string
  topic: string
  name: string
  userName: string
  userImage: string
  voice: string
  style: string
}

interface SavedMessage {
  role: "user" | "system" | "assistant"
  content: string
}
```

---

## 🔐 Authentication & Authorization

### **Clerk Integration**

**Middleware** (`middleware.ts`):
```typescript
export default clerkMiddleware()
```
- Protects all routes except static assets
- Runs on every request (API + pages)
- JWT token management automatic

**Feature Gating**:
```typescript
// Check subscription tier
has({ plan: 'pro_learner' })

// Check feature entitlements
has({ feature: "3_active_companions" })
has({ feature: "10_active_companions" })
```

**Permission Logic** (`newCompanionPermission()`):
- Pro users: Unlimited companions
- Free users: 3 companion limit
- Standard tier: 10 companion limit
- Queries Supabase to count user's companions

**User Activity Tracking**:
- Uses `currentUser().lastActiveAt`
- Displays "Active Now" if < 5 mins
- Shows IST timezone formatted last active time

---

## 💾 Database Architecture

### **Supabase Schema** (Inferred from code)

**`companions` Table**:
```sql
id          UUID PRIMARY KEY
name        VARCHAR(255)
subject     VARCHAR(50)
topic       TEXT
voice       VARCHAR(20)
style       VARCHAR(20)
duration    INTEGER
author      VARCHAR(255)  -- Clerk user ID
created_at  TIMESTAMP
```

**`session_history` Table**:
```sql
id            UUID PRIMARY KEY
companion_id  UUID REFERENCES companions(id)
user_id       VARCHAR(255)  -- Clerk user ID
created_at    TIMESTAMP
```

**Row Level Security (RLS)**:
- Enabled via Clerk JWT in Supabase client
- Users can only query their own data
- No explicit RLS policies visible in code

**Query Patterns**:
- `.maybeSingle()` for duplicate checks
- `.or()` for multi-field search
- `.range()` for pagination
- `.order()` with `.limit()` for recent sessions

---

## 🎙️ Voice AI Integration

### **Vapi Configuration**

**Assistant Setup**:
```typescript
{
  transcriber: {
    provider: "deepgram",
    model: "nova-3",
    language: "en"
  },
  voice: {
    provider: "11labs",
    voiceId: <dynamic>,
    stability: 0.4,
    similarityBoost: 0.8,
    speed: 0.9,
    style: 0.5,
    useSpeakerBoost: true
  },
  model: {
    provider: "openai",
    model: "gpt-4",
    messages: [/* system prompt */]
  }
}
```

**System Prompt Engineering**:
- Expert tutor persona
- Topic/subject variable injection
- Style adaptation (formal/casual)
- Voice-optimized responses (<150 words)
- Check-in prompts every few minutes
- No emoji/formatting (voice-only)

**Event Handling** (CompanionComponent):
```typescript
vapi.on('call-start', onCallStart)
vapi.on('call-end', onCallEnd)
vapi.on('message', onMessage)        // Transcript capture
vapi.on('speech-start', onSpeechStart)
vapi.on('speech-end', onSpeechEnd)
vapi.on('error', onError)
```

**Call States**:
- `INACTIVE` - Default state
- `CONNECTING` - Loading state with pulse animation
- `ACTIVE` - Live conversation with Lottie soundwave
- `FINISHED` - Session complete, saves to history

---

## 🎨 UI/UX Architecture

### **Design System**

**Styling Approach**:
- Tailwind CSS with custom config
- CSS variables for theming (`--font-manrope`)
- Manrope font family (weights: 200-800)
- Component-level style isolation

**Theme Colors**:
- Primary: `#fe5933` (orange - Clerk theme)
- Subject-based color coding
- Muted grays for secondary UI

**Responsive Strategy**:
- Mobile-first breakpoints
- `max-md:`, `max-sm:` for mobile
- `max-lg:` for tablet adjustments
- Flexbox/Grid layouts

**Animation Libraries**:
- Lottie React for soundwave animation
- Tailwind animate classes
- Custom transition durations

**Component Patterns**:
1. **Card-based layouts** (CompanionCard)
2. **Form wizards** (CompanionForm)
3. **Modal overlays** (Clerk SignIn modal)
4. **Badge/pill UI** (subject badges)
5. **Transcript auto-scroll** (reverse chronological)

---

## 🚀 Performance Optimizations

### **Next.js 15 Features**

1. **Turbopack** (dev mode):
   ```json
   "dev": "next dev --turbopack"
   ```
   - Faster hot reload
   - Improved dev server performance

2. **Server Components**:
   - Default for all page components
   - Data fetching at server level
   - Reduced client bundle size

3. **Image Optimization**:
   ```typescript
   images: {
     remotePatterns: [{ hostname: 'img.clerk.com' }]
   }
   ```
   - Automatic WebP conversion
   - Lazy loading
   - Responsive sizes

4. **Build Optimizations**:
   ```typescript
   typescript: { ignoreBuildErrors: true }  // ⚠️ Risky
   eslint: { ignoreDuringBuilds: true }     // ⚠️ Risky
   ```

### **Data Fetching Strategy**

- **Server-side**: All initial page loads
- **No client state**: Direct Supabase queries
- **Pagination**: Range-based (10 items default)
- **Caching**: Relies on Next.js automatic caching

**Optimization Opportunities**:
- Implement React Query for client caching
- Add ISR for static companion pages
- Stream loading states with Suspense

---

## 📊 Monitoring & Error Tracking

### **Sentry Integration**

**Configuration** (`sentry.server.config.ts`):
```typescript
Sentry.init({
  dsn: "<sentry_project_dsn>",
  tracesSampleRate: 1,        // 100% trace sampling
  debug: false
})
```

**Instrumentation**:
- `instrumentation.ts` - Node.js runtime
- `instrumentation-client.ts` - Browser runtime
- `sentry.edge.config.ts` - Edge runtime

**Next.js Plugin** (`next.config.ts`):
```typescript
withSentryConfig(nextConfig, {
  org: "eleven33",
  project: "javascript-nextjs",
  widenClientFileUpload: true,
  disableLogger: true,
  automaticVercelMonitors: true
})
```

**Captured Events**:
- Request errors (via `onRequestError`)
- Client exceptions
- Server-side crashes
- Performance traces

---

## 🔧 Configuration Files

### **TypeScript** (`tsconfig.json`)
```json
{
  "target": "ES2017",
  "module": "esnext",
  "moduleResolution": "bundler",
  "paths": { "@/*": ["./*"] },
  "strict": true
}
```

### **ESLint** (`eslint.config.mjs`)
- Next.js recommended config
- Disabled during builds (⚠️ not recommended)

### **PostCSS** (`postcss.config.mjs`)
- Tailwind CSS integration
- AutoPrefixer

### **Components.json**
- Shadcn UI configuration
- Radix UI component mappings

---

## 🔑 Environment Variables (Required)

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Supabase Database
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Vapi Voice AI
NEXT_PUBLIC_VAPI_API_KEY=xxx

# Sentry Monitoring
SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
SENTRY_AUTH_TOKEN=xxx

# Optional - Vercel
VERCEL_URL=dumbledore.vercel.app
```

---

## 🎯 Core Features Deep Dive

### **1. Companion Creation Flow**

**User Journey**:
1. Navigate to `/companions/new`
2. Check permissions via `newCompanionPermission()`
3. If gated: Show upgrade CTA
4. If allowed: Display `CompanionForm`
5. Submit form → `createCompanion()` server action
6. Duplicate check via Supabase
7. Insert companion record
8. Redirect to `/companions/[id]`

**Permission Matrix**:
| Plan         | Limit    | Feature Flag              |
|--------------|----------|---------------------------|
| Free         | 3        | `3_active_companions`     |
| Standard     | 10       | `10_active_companions`    |
| Pro Learner  | Unlimited| `plan: 'pro_learner'`     |

### **2. Voice Session Lifecycle**

**State Management** (CompanionComponent):
```typescript
enum CallStatus {
  INACTIVE = 'INACTIVE',      // Initial state
  CONNECTING = 'CONNECTING',  // Vapi.start() called
  ACTIVE = 'ACTIVE',          // 'call-start' event
  FINISHED = 'FINISHED'       // 'call-end' event
}
```

**Session Flow**:
1. User clicks "Start Session"
2. `vapi.start()` with assistant config
3. `CONNECTING` → pulse animation
4. Vapi establishes connection
5. `ACTIVE` → Lottie soundwave animation
6. Real-time transcript capture
7. User clicks "End Session" or timeout
8. `FINISHED` → save to `session_history`
9. Display final transcript

**Message Handling**:
```typescript
onMessage = (message: Message) => {
  if (message.type === 'transcript' && 
      message.transcriptType === 'final') {
    setMessages((prev) => [newMessage, ...prev])
  }
}
```

### **3. Search & Filtering**

**URL Query Params** (`/companions?subject=maths&topic=calculus`):
```typescript
const companions = await getAllCompanions({ subject, topic })
```

**Supabase Query Logic**:
```typescript
if (subject && topic) {
  query.ilike('subject', `%${subject}%`)
       .or(`topic.ilike.%${topic}%, name.ilike.%${topic}`)
} else if (subject) {
  query.ilike('subject', `%${subject}%`)
} else if (topic) {
  query.or(`topic.ilike.%${topic}%, name.ilike.%${topic}`)
}
```

**UI Components**:
- `SearchInput` - Text search with debouncing
- `SubjectFilter` - Dropdown for subject selection
- URL state managed via Next.js navigation

### **4. User Journey Dashboard**

**Page**: `/my-journey`

**Data Sources**:
```typescript
const companions = await getUserCompanion(user.id)
const sessionHistory = await userSession(user.id)
```

**Metrics Displayed**:
- Lessons completed (session count)
- Companions created (companion count)
- Last active time (with 5-min active detection)
- Recent sessions list
- User's created companions

**Active Status Logic**:
```typescript
const isUserActive = (lastActiveAt: number) => {
  const now = Date.now()
  const fiveMinutes = 5 * 60 * 1000
  return now - lastActiveAt < fiveMinutes
}
```

---

## 📦 Dependencies Analysis

### **Production Dependencies** (23 packages)

**Framework & Core**:
- `next@15.3.3` - Latest Next.js with App Router
- `react@19.0.0` - Latest React with concurrent features
- `react-dom@19.0.0`

**Authentication & Authorization**:
- `@clerk/nextjs@6.22.0` - Full-stack auth solution
  - JWT management
  - User management
  - Subscription gates
  - Middleware protection

**Database**:
- `@supabase/supabase-js@2.50.0` - Supabase client
- `@supabase/auth-helpers-nextjs@0.10.0` - Next.js integration

**AI & Voice**:
- `@vapi-ai/web@2.3.6` - Voice assistant SDK
- OpenAI GPT-4 (via Vapi)
- ElevenLabs (via Vapi)

**UI Components**:
- `@radix-ui/react-accordion@1.2.11`
- `@radix-ui/react-label@2.1.7`
- `@radix-ui/react-select@2.2.5`
- `@radix-ui/react-slot@1.2.3`
- `lucide-react@0.517.0` - Icon library

**Forms & Validation**:
- `react-hook-form@7.58.1` - Form state management
- `@hookform/resolvers@5.1.1` - Validation adapters
- `zod@3.25.67` - Schema validation

**Styling**:
- `tailwind-merge@3.3.1` - Class name merger
- `clsx@2.1.1` - Conditional classes
- `class-variance-authority@0.7.1` - Variant system

**Animation**:
- `lottie-react@2.4.1` - JSON animations

**Monitoring**:
- `@sentry/nextjs@9.30.0` - Error tracking
- `@opentelemetry/core@2.0.1` - Telemetry (Sentry dep)

**Utilities**:
- `sonner@2.0.5` - Toast notifications
- `@jsmastery/utils@1.0.2` - Custom utilities

### **Dev Dependencies** (8 packages)

- `typescript@5`
- `@types/node@20`
- `@types/react@19`
- `@types/react-dom@19`
- `eslint@9` + `eslint-config-next@15.3.3`
- `@tailwindcss/postcss@4.1.14`
- `tw-animate-css@1.3.4` - Tailwind animation utilities

---

## 🐛 Known Issues & Technical Debt

### **🔴 Critical Issues**

1. **Build Error Suppression**:
   ```typescript
   typescript: { ignoreBuildErrors: true }
   eslint: { ignoreDuringBuilds: true }
   ```
   **Risk**: Type errors and lint issues in production  
   **Fix**: Remove flags, fix all errors properly

2. **Hardcoded API Keys**:
   - ElevenLabs voice IDs in `constants/index.ts`
   - Sentry DSN in `sentry.server.config.ts`
   **Risk**: Leaking credentials if repo goes public  
   **Fix**: Move to environment variables

3. **Missing Error Handling**:
   ```typescript
   const { data, error } = await supabase.from('companions').select()
   if (error) return console.log(error)  // ⚠️ Only logs, doesn't throw
   ```
   **Risk**: Silent failures in production  
   **Fix**: Implement proper error boundaries

### **🟡 Medium Priority**

4. **No Loading States**:
   - Missing Suspense boundaries
   - No skeleton loaders
   - Server components block rendering
   **Fix**: Add `loading.tsx` files, implement streaming

5. **No Client-Side Caching**:
   - Every navigation refetches from Supabase
   - No React Query or SWR
   **Fix**: Implement data caching strategy

6. **Incomplete Features**:
   - `/interview` page is empty (`<div>InterviewPage</div>`)
   **Fix**: Complete or remove route

7. **Type Safety Gaps**:
   ```typescript
   // @ts-expect-error type seems to be right
   vapi.start(configureAssistant(voice, style), assistantOverrides)
   ```
   **Fix**: Define proper Vapi types or update `vapi.d.ts`

### **🟢 Low Priority**

8. **Commented Code**:
   - Unused type definitions in `types/index.d.ts`
   - Commented `recentSessions` mock data
   **Fix**: Clean up dead code

9. **No Test Coverage**:
   - Zero unit tests
   - No E2E tests
   **Fix**: Add Vitest + Playwright

10. **Empty Tailwind Config**:
    - `tailwind.config.ts` is completely empty
    **Fix**: Define proper config or verify if intended

11. **Inconsistent Naming**:
    ```typescript
    getUserComapanion()  // Typo: "Comapanion"
    ```
    **Fix**: Rename to `getUserCompanion()`

---

## 🔒 Security Considerations

### **✅ Strengths**

1. **Row Level Security**:
   - Supabase RLS enabled
   - Clerk JWT validation

2. **Server-Side Auth**:
   - `'use server'` actions protected
   - Middleware on all routes

3. **Input Validation**:
   - Zod schemas on forms
   - Type-safe database queries

### **⚠️ Vulnerabilities**

1. **No Rate Limiting**:
   - API routes unprotected
   - Vapi calls not throttled
   **Fix**: Implement rate limiting middleware

2. **Client-Side API Keys**:
   ```typescript
   NEXT_PUBLIC_VAPI_API_KEY  // Exposed to browser
   ```
   **Risk**: API key theft, quota exhaustion  
   **Fix**: Use server-side proxy for Vapi calls

3. **No CSRF Protection**:
   - Form submissions lack CSRF tokens
   **Fix**: Add CSRF middleware (though Clerk mitigates some risk)

4. **Missing Content Security Policy**:
   - No CSP headers configured
   **Fix**: Add CSP in `next.config.ts` or middleware

---

## 🚦 Recommendations

### **Immediate Actions (P0)**

1. ✅ **Fix Build Errors**
   - Remove `ignoreBuildErrors` flags
   - Resolve all TypeScript errors
   - Fix ESLint warnings

2. ✅ **Secure API Keys**
   - Move all hardcoded keys to `.env`
   - Use server-side Vapi proxy
   - Add `.env.example` template

3. ✅ **Add Error Boundaries**
   - Implement React Error Boundaries
   - Add proper error handling in server actions
   - Use Sentry's error boundary wrapper

### **Short-Term Improvements (P1)**

4. ✅ **Implement Loading States**
   - Add `loading.tsx` files
   - Use Suspense boundaries
   - Streaming SSR for slow queries

5. ✅ **Add Data Caching**
   - Integrate React Query
   - Cache companion list
   - Implement optimistic updates

6. ✅ **Complete Feature Set**
   - Finish `/interview` page or remove
   - Add user onboarding flow
   - Implement session recording (optional)

7. ✅ **Add Rate Limiting**
   - Protect API routes
   - Limit companion creation
   - Throttle Vapi calls

### **Long-Term Enhancements (P2)**

8. ✅ **Test Coverage**
   - Unit tests for utilities
   - Integration tests for actions
   - E2E tests for critical flows

9. ✅ **Performance Monitoring**
   - Add Web Vitals tracking
   - Monitor Vapi latency
   - Track database query performance

10. ✅ **Accessibility Audit**
    - Keyboard navigation
    - Screen reader support
    - ARIA labels on voice controls

11. ✅ **Documentation**
    - Add JSDoc comments
    - Create API documentation
    - Write deployment guide

---

## 📈 Scalability Considerations

### **Current Bottlenecks**

1. **Database Queries**:
   - No connection pooling visible
   - N+1 queries in session history
   - Pagination limited to 10 items

2. **AI API Costs**:
   - GPT-4 + ElevenLabs per session
   - No usage tracking
   - No cost alerts

3. **Vercel Limits**:
   - Function execution time (10s free tier)
   - Bandwidth limits
   - Edge function quotas

### **Scaling Strategies**

**Database**:
- Implement connection pooling (Supabase supports)
- Add database indexes on `author`, `subject`, `created_at`
- Use materialized views for analytics

**AI Usage**:
- Switch to GPT-4 Turbo for lower costs
- Implement session time limits
- Cache common AI responses

**Infrastructure**:
- Upgrade Vercel plan for production
- Use Edge Functions for auth checks
- CDN for static assets

**Monitoring**:
- Track DAU/MAU metrics
- Monitor API quota usage
- Set up cost alerts (Sentry, Vercel, OpenAI)

---

## 🧪 Testing Strategy (Proposed)

### **Unit Tests**
```typescript
// lib/utils.test.ts
test('getSubjectColor returns correct color', () => {
  expect(getSubjectColor('maths')).toBe('#FFDA6E')
})

// lib/actions/companion.actions.test.ts
test('newCompanionPermission enforces limits', async () => {
  // Mock Supabase query
  // Test free tier limit
})
```

### **Integration Tests**
```typescript
// Companion creation flow
test('creates companion with valid data', async () => {
  const companion = await createCompanion({
    name: 'Test Companion',
    subject: 'maths',
    topic: 'Algebra'
    // ...
  })
  expect(companion).toHaveProperty('id')
})
```

### **E2E Tests** (Playwright)
```typescript
test('complete voice session flow', async ({ page }) => {
  await page.goto('/companions/123')
  await page.click('text=Start Session')
  await expect(page.locator('.companion-lottie')).toBeVisible()
  // Test voice interaction
  await page.click('text=End Session')
  await expect(page).toHaveURL('/my-journey')
})
```

---

## 📚 Key Pages Documentation

### **Home Page** (`app/page.tsx`)
**Purpose**: Landing page with popular companions  
**Data**: 
- Top 3 companions (most recent)
- Recent session history (10 items)
**Components**: CompanionCard, CompanionList, Cta

### **Companions Library** (`app/companions/page.tsx`)
**Purpose**: Browse all AI companions  
**Features**: 
- Search by topic
- Filter by subject
- Pagination
**Server Component**: Async with searchParams

### **Companion Session** (`app/companions/[id]/page.tsx`)
**Purpose**: Live voice learning session  
**Components**: CompanionComponent (client)  
**Auth Required**: Redirects to sign-in if unauthenticated

### **New Companion** (`app/companions/new/page.tsx`)
**Purpose**: Create custom AI companion  
**Features**: 
- Permission gating
- Upgrade CTA if limited
- Form validation
**Server Component**: Checks permissions server-side

### **My Journey** (`app/my-journey/page.tsx`)
**Purpose**: User profile and history  
**Data**: 
- User stats (lessons, companions)
- Session history
- Created companions
**Auth Required**: Yes

### **Subscription** (`app/subscription/page.tsx`)
**Purpose**: Pricing and plan upgrades  
**Component**: Clerk `<PricingTable />`  
**Integration**: Direct Clerk + Stripe

---

## 🛠️ Development Workflow

### **Setup**
```bash
git clone https://github.com/whynotramaa/dumbledore.git
cd dumbledore
npm install
# Configure .env.local
npm run dev  # Starts on http://localhost:3000
```

### **Build**
```bash
npm run build  # Next.js production build
npm run start  # Start production server
```

### **Lint**
```bash
npm run lint  # ESLint (currently ignored in CI)
```

### **Deployment**
- **Platform**: Vercel
- **Branch**: `main` (auto-deploy)
- **Preview**: Every PR gets preview URL
- **Environment**: Configured in Vercel dashboard

---

## 🎓 Learning Resources

**Next.js 15**:
- [App Router Migration Guide](https://nextjs.org/docs/app/building-your-application/upgrading)
- [Server Actions Best Practices](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)

**Clerk**:
- [Next.js Quickstart](https://clerk.com/docs/quickstarts/nextjs)
- [Subscription Gates](https://clerk.com/docs/organizations/subscription-gates)

**Supabase**:
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Next.js Integration](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)

**Vapi**:
- [Web SDK Docs](https://docs.vapi.ai/sdk/web)
- [Assistant Configuration](https://docs.vapi.ai/assistants)

---

## 📝 Final Notes

### **Project Strengths**
✅ Modern tech stack (Next.js 15, React 19)  
✅ Strong authentication (Clerk)  
✅ Real-time voice AI (Vapi + GPT-4)  
✅ Enterprise monitoring (Sentry)  
✅ Type-safe (TypeScript + Zod)  

### **Areas for Improvement**
⚠️ Build error suppression  
⚠️ Missing test coverage  
⚠️ No loading states  
⚠️ Client-side API key exposure  
⚠️ Incomplete features  

### **Production Readiness**
**Current State**: 70% ready  
**Blockers**: 
1. Fix TypeScript errors
2. Secure API keys
3. Add error boundaries
4. Implement rate limiting

**Estimated Work**: 40-60 hours to production-ready

---

## 🏆 Conclusion

Dumbledore is a well-architected voice learning platform with solid foundations. The codebase demonstrates good understanding of modern Next.js patterns, server components, and AI integration. However, there are critical issues around error handling, security, and technical debt that must be addressed before production launch.

**Recommended Next Steps**:
1. Create GitHub issues from recommendations
2. Prioritize P0 items
3. Set up CI/CD pipeline with tests
4. Schedule security audit
5. Performance testing under load

**Overall Assessment**: 🟡 **Good foundation, needs production hardening**

---

*Audit performed by: Senior Developer Review*  
*Project URL*: https://dumbledore.vercel.app/  
*GitHub*: https://github.com/whynotramaa/dumbledore  
*Contact*: Made with ❤️ by Rama
