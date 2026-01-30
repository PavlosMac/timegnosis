# Project Context & Rules

## Project Overview
Mystical Tarot website for divination and spiritual guidance.



## Architecture Patterns

### Next.js App Router Structure

```
app/
├── components /         # Components
│   ├── layout.tsx       # layout with nav
│   └── page.tsx
    |--- serializer.ts
    --- view-models /
└── layout.tsx           # Root layout

components/
├── ui/                  # Shadcn/ui components
└── [feature]/           # Feature-specific components

lib/
├── types/               # TypeScript types
└── utils/               # Helper functions
```

### Server vs Client Components

**DEFAULT: Server Components**

Server Components are the default. ONLY use Client Components when you need:
- Event handlers (onClick, onChange, onSubmit)
- Browser APIs (localStorage, window, navigator)
- React hooks (useState, useEffect, useContext)
- Third-party libraries that need browser APIs

**Marking Client Components:**
```typescript
// ONLY add this when absolutely necessary
'use client'

export function InteractiveButton() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
```

**Server Component Pattern (prefer this):**
```typescript
// No 'use client' directive
import { getUsers } from '@/lib/api/users'

export default async function UsersPage() {
  const users = await getUsers() // Direct data fetching
  return <UsersList users={users} />
}
```

### Data Fetching Patterns

**✅ DO: Fetch in Server Components**
```typescript
// app/dashboard/users/page.tsx
export default async function UsersPage() {
  const users = await fetch('http://localhost:8000/api/users', {
    headers: { Authorization: `Bearer ${await getToken()}` },
    cache: 'no-store' // or { next: { revalidate: 60 } }
  }).then(r => r.json())
  
  return <UsersTable users={users} />
}
```

**✅ DO: Use Server Actions for mutations**
```typescript
// app/actions/user.ts
'use server'

export async function createUser(formData: FormData) {
  const email = formData.get('email')
  // Validate, call API, revalidate
  await fetch('http://localhost:8000/api/users', {
    method: 'POST',
    body: JSON.stringify({ email })
  })
  revalidatePath('/dashboard/users')
}
```

**❌ DON'T: Use useEffect for data fetching**
```typescript
// Bad - don't do this
'use client'
function UsersPage() {
  const [users, setUsers] = useState([])
  useEffect(() => {
    fetch('/api/users').then(r => r.json()).then(setUsers)
  }, [])
}
```

### API Client Pattern

**Create typed API functions in lib/api/**

```typescript
// lib/api/users.ts
import { getAuthToken } from '@/lib/auth/token'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export async function getUsers(): Promise<User[]> {
  const token = await getAuthToken()
  const response = await fetch(`${API_BASE}/api/users`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    cache: 'no-store'
  })
  
  if (!response.ok) {
    throw new Error(`Failed to fetch users: ${response.statusText}`)
  }
  
  return response.json()
}

export async function createUser(data: UserCreate): Promise<User> {
  const token = await getAuthToken()
  const response = await fetch(`${API_BASE}/api/users`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.detail || 'Failed to create user')
  }
  
  return response.json()
}
```
### Form Handling

**✅ Prefer Server Actions over API routes**

```typescript
// app/users/new/page.tsx
import { createUserAction } from '@/app/actions/users'

export default function NewUserPage() {
  return (
    <form action={createUserAction}>
      <input name="email" type="email" required />
      <input name="name" type="text" required />
      <button type="submit">Create User</button>
    </form>
  )
}

// app/actions/users.ts
'use server'

import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const userSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2)
})

export async function createUserAction(formData: FormData) {
  const parsed = userSchema.safeParse({
    email: formData.get('email'),
    name: formData.get('name')
  })
  
  if (!parsed.success) {
    return { error: 'Invalid input' }
  }
  
  // Call backend API
  await createUser(parsed.data)
  
  revalidatePath('/users')
  redirect('/users')
}
```

**For complex forms with validation feedback, use Client Components:**

```typescript
'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { createUserAction } from '@/app/actions/users'

export function UserForm() {
  const [state, formAction] = useFormState(createUserAction, null)
  
  return (
    <form action={formAction}>
      <input name="email" type="email" required />
      {state?.error && <p className="error">{state.error}</p>}
      <SubmitButton />
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button disabled={pending}>
      {pending ? 'Creating...' : 'Create User'}
    </button>
  )
}
```

## TypeScript Standards

### Strict Type Safety

```typescript
// tsconfig.json should have:
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitAny": true
  }
}
```

**✅ DO: Explicit types for all functions**
```typescript
export async function getUser(userId: string): Promise<User> {
  // implementation
}

export function formatDate(date: Date): string {
  return date.toISOString()
}
```

**✅ DO: Define interfaces for API responses**
```typescript
// lib/types/user.ts
export interface User {
  id: string
  email: string
  name: string
  created_at: string
}

export interface UserCreate {
  email: string
  name: string
  password: string
}

export interface UserUpdate {
  name?: string
  email?: string
}
```

**❌ DON'T: Use 'any' type**
```typescript
// Bad
function processData(data: any) { }

// Good
function processData(data: unknown) {
  if (typeof data === 'object' && data !== null) {
    // Type guard
  }
}
```

**✅ DO: Use Zod for runtime validation**
```typescript
import { z } from 'zod'

const userSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2).max(50),
  age: z.number().int().positive().optional()
})

type User = z.infer<typeof userSchema>

// Use in server actions
export async function createUser(formData: FormData) {
  const result = userSchema.safeParse({
    email: formData.get('email'),
    name: formData.get('name')
  })
  
  if (!result.success) {
    return { errors: result.error.flatten() }
  }
  
  // result.data is fully typed
}
```

## Styling with Tailwind

**✅ DO: Use Tailwind utility classes**
```typescript
<div className="flex items-center gap-4 rounded-lg border p-4">
  <Avatar className="h-10 w-10" />
  <div className="flex-1">
    <h3 className="font-semibold">{user.name}</h3>
    <p className="text-sm text-muted-foreground">{user.email}</p>
  </div>
</div>
```

**✅ DO: Extract repeated patterns to components**
```typescript
// components/ui/card.tsx
export function Card({ children, className }: CardProps) {
  return (
    <div className={cn('rounded-lg border bg-card p-6', className)}>
      {children}
    </div>
  )
}
```

**❌ DON'T: Use inline styles or CSS modules**
```typescript
// Bad - don't do this
<div style={{ padding: '16px' }}>...</div>

// Bad - don't do this
import styles from './Component.module.css'
<div className={styles.container}>...</div>
```

## Error Handling

**✅ DO: Use error boundaries for Client Components**
```typescript
// app/error.tsx
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="error-container">
      <h2>Something went wrong!</h2>
      <button onClick={reset}>Try again</button>
    </div>
  )
}
```

**✅ DO: Handle API errors gracefully**
```typescript
export async function getUsers(): Promise<User[]> {
  try {
    const response = await fetch(`${API_BASE}/api/users`)
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Failed to fetch users')
    }
    
    return response.json()
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error // Re-throw to let error boundary handle it
  }
}
```

**✅ DO: Show user-friendly error messages**
```typescript
'use client'

export function UsersList() {
  const [error, setError] = useState<string | null>(null)
  
  async function handleDelete(userId: string) {
    try {
      await deleteUser(userId)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete user')
    }
  }
  
  return (
    <>
      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {/* ... */}
    </>
  )
}
```

## Performance Optimization

**✅ DO: Use Next.js Image component**
```typescript
import Image from 'next/image'

<Image
  src="/profile.jpg"
  alt="Profile"
  width={100}
  height={100}
  priority // for above-the-fold images
/>
```

**✅ DO: Implement loading states**
```typescript
// app/dashboard/users/loading.tsx
export default function Loading() {
  return <UsersSkeleton />
}
```

**✅ DO: Use React.memo for expensive Client Components**
```typescript
'use client'

import { memo } from 'react'

export const UserCard = memo(function UserCard({ user }: { user: User }) {
  return <div>{user.name}</div>
})
```

**✅ DO: Use streaming with Suspense**
```typescript
import { Suspense } from 'react'

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Suspense fallback={<StatsLoading />}>
        <Stats />
      </Suspense>
      <Suspense fallback={<UsersLoading />}>
        <RecentUsers />
      </Suspense>
    </div>
  )
}
```

## File Naming Conventions

- **Pages**: `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`
- **Components**: `PascalCase.tsx` (e.g., `UserCard.tsx`)
- **Utilities**: `kebab-case.ts` (e.g., `format-date.ts`)
- **Types**: `kebab-case.ts` (e.g., `user-types.ts`)
- **Constants**: `UPPER_SNAKE_CASE` in `constants.ts`

## Environment Variables

**✅ DO: Use proper naming**
```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_AUTH0_DOMAIN=your-domain.eu.auth0.com
AUTH0_CLIENT_SECRET=secret_goes_here  # NOT public
```

**✅ DO: Validate env vars on startup**
```typescript
// lib/env.ts
import { z } from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url(),
  NEXT_PUBLIC_AUTH0_DOMAIN: z.string(),
  AUTH0_CLIENT_SECRET: z.string().min(1)
})

export const env = envSchema.parse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_AUTH0_DOMAIN: process.env.NEXT_PUBLIC_AUTH0_DOMAIN,
  AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET
})
```

## Testing Strategy

**✅ DO: Write tests for utilities and API functions**
```typescript
// __tests__/lib/api/users.test.ts
import { describe, it, expect, vi } from 'vitest'
import { getUsers } from '@/lib/api/users'

describe('getUsers', () => {
  it('fetches users successfully', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [{ id: '1', name: 'Test' }]
    })
    
    const users = await getUsers()
    expect(users).toHaveLength(1)
  })
})
```

## Important Rules Summary

### DO:
- ✅ Check `CODE_INDEX.md` for existing components before creating new ones
- ✅ Default to Server Components, use Client Components only when necessary
- ✅ Fetch data in Server Components, not useEffect
- ✅ Use Server Actions for mutations
- ✅ Store auth tokens in HTTP-only cookies, never localStorage
- ✅ Validate all form input with Zod
- ✅ Define explicit TypeScript types for all functions
- ✅ Use Tailwind utility classes for styling
- ✅ Handle errors gracefully with error boundaries
- ✅ Use Next.js Image component for images
- ✅ Implement loading and error states
- ✅ Keep API logic in `lib/api/` functions
- ✅ Use `revalidatePath` after mutations
- ✅ Add proper TypeScript types from backend contracts

### DON'T:
- ❌ Don't create duplicate components (check CODE_INDEX.md first)
- ❌ Don't add 'use client' unless absolutely necessary
- ❌ Don't use useEffect for data fetching
- ❌ Don't create API routes when Server Actions work
- ❌ Don't store sensitive data in localStorage or sessionStorage
- ❌ Don't use 'any' type in TypeScript
- ❌ Don't use inline styles or CSS modules
- ❌ Don't ignore error states
- ❌ Don't hardcode API URLs (use env vars)
- ❌ Don't skip input validation
- ❌ Don't use regular <img> tags (use next/image)
- ❌ Don't create Client Components for static content

## Backend API Integration

**Base URL**: `http://localhost:8000` (dev) / `https://api.example.com` (prod)

**All API calls must:**
1. Include Authorization header with Bearer token
2. Handle 401 (redirect to login)
3. Handle 403 (show permission error)
4. Handle 500 (show generic error)
5. Use TypeScript types matching backend Pydantic models

**Example API function structure:**
```typescript
export async function apiFunction<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const token = await getAuthToken()
  
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...options?.headers
    }
  })
  
  if (!response.ok) {
    if (response.status === 401) {
      redirect('/login')
    }
    const error = await response.json()
    throw new Error(error.detail || 'API request failed')
  }
  
  return response.json()
}
```

## Current Focus Areas
*Update this section with active work*

- Authentication flow with Auth0
- User management dashboard
- Real-time data visualization
- Admin interfaces

## Questions to Ask Before Coding

1. **Is this a Server or Client Component?** (default to Server)
2. **Does a similar component exist?** (check CODE_INDEX.md)
3. **Should this be a Server Action or API route?** (prefer Server Action)
4. **Are the types defined?** (check lib/types/)
5. **Is input validated?** (use Zod)
6. **Is error handling in place?**
7. **Are loading states handled?**

---

*Last updated: 2026-01-29*