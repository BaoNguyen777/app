# Professional Copywriting Portfolio - TypeScript Version

A fully type-safe, professional copywriting portfolio website built with **Next.js 14**, **TypeScript**, **MongoDB**, and **shadcn/ui**.

## 🎯 TypeScript Features

### Full Type Safety
- ✅ Strongly typed components with interfaces
- ✅ Type-safe API routes with Next.js 14
- ✅ MongoDB type definitions
- ✅ React event handlers with proper types
- ✅ Form data validation with TypeScript

### Type Definitions

#### Frontend Types (`types/index.ts`)
```typescript
interface FormData {
  name: string
  email: string
  message: string
}

interface Service {
  icon: JSX.Element
  title: string
  description: string
}

interface PortfolioItem {
  title: string
  category: string
  description: string
  image: string
  results: string
}

interface Testimonial {
  name: string
  role: string
  content: string
  rating: number
}
```

#### Backend Types (`app/api/[[...path]]/route.ts`)
```typescript
interface ContactSubmission {
  id: string
  name: string
  email: string
  message: string
  status: string
  createdAt: string
  updatedAt: string
}

interface ApiResponse<T = any> {
  success?: boolean
  message?: string
  data?: T
  total?: number
  error?: string
  details?: string
}
```

## 📁 Project Structure

```
/app
├── app/
│   ├── api/
│   │   └── [[...path]]/
│   │       └── route.ts          # TypeScript API routes
│   ├── page.tsx                   # Main portfolio page (TypeScript)
│   ├── layout.tsx                 # Root layout (TypeScript)
│   └── globals.css                # Global styles
├── types/
│   └── index.ts                   # Shared TypeScript types
├── components/
│   └── ui/                        # shadcn/ui components
├── tsconfig.json                  # TypeScript configuration
├── next-env.d.ts                  # Next.js type definitions
├── package.json                   # Dependencies
└── README.md                      # Documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ with TypeScript support
- MongoDB running locally or connection string
- Yarn package manager

### Installation

1. **Install dependencies:**
```bash
yarn install
```

2. **Set up environment variables:**
Create or update `.env`:
```env
MONGO_URL=mongodb://localhost:27017
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

3. **Run development server:**
```bash
yarn dev
```

4. **Open your browser:**
Navigate to [http://localhost:3000](http://localhost:3000)

### TypeScript Compilation

Check TypeScript types:
```bash
npx tsc --noEmit
```

Build for production:
```bash
yarn build
```

## 💻 Source Code Files

### Main Files (TypeScript)

#### 1. `/app/app/page.tsx` - Main Portfolio Page
The complete portfolio page with:
- Type-safe state management
- Properly typed event handlers
- Interface definitions for all data structures
- Type-safe form submission

Key features:
```typescript
const [formData, setFormData] = useState<FormData>({
  name: '',
  email: '',
  message: ''
})

const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
  e.preventDefault()
  // ... type-safe form handling
}

const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  })
}
```

#### 2. `/app/app/layout.tsx` - Root Layout
Type-safe Next.js layout with:
- Metadata type definitions
- Props interface for children
- Type-safe font configuration

```typescript
interface RootLayoutProps {
  children: ReactNode
}

export const metadata: Metadata = {
  title: 'Professional Copywriter | Words That Convert',
  description: '...',
  // ... more metadata
}

export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  )
}
```

#### 3. `/app/app/api/[[...path]]/route.ts` - API Routes
Fully typed API handlers with:
- Request/Response type definitions
- MongoDB type safety
- Error handling with proper types
- Generic API response types

```typescript
export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse>> {
  try {
    const body: ContactFormData = await request.json()
    const { name, email, message } = body

    // Type-safe validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Type-safe MongoDB operations
    const contactSubmission: ContactSubmission = {
      id: uuidv4(),
      name,
      email,
      message,
      status: 'new',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    await db.collection<ContactSubmission>('contacts').insertOne(contactSubmission)

    return NextResponse.json(
      { success: true, message: '...', data: { ... } },
      { status: 201 }
    )
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { error: 'Internal server error', details: errorMessage },
      { status: 500 }
    )
  }
}
```

#### 4. `/app/types/index.ts` - Shared Types
Central location for all TypeScript type definitions:
- Form data types
- Component prop types
- API response types
- Database model types

## 🎨 Component Types

### Services
```typescript
const services: Service[] = [
  {
    icon: <Pen className="w-8 h-8 text-primary" />,
    title: 'Website Copy',
    description: 'Compelling website content...'
  },
  // ... more services
]
```

### Portfolio Items
```typescript
const portfolio: PortfolioItem[] = [
  {
    title: 'E-commerce Product Launch',
    category: 'Website Copy',
    description: 'Created compelling product descriptions...',
    image: 'https://...',
    results: '+45% Conversion Rate'
  },
  // ... more items
]
```

### Testimonials
```typescript
const testimonials: Testimonial[] = [
  {
    name: 'Sarah Johnson',
    role: 'CEO, TechStart Inc.',
    content: 'The copy transformed our website...',
    rating: 5
  },
  // ... more testimonials
]
```

## 🔧 TypeScript Configuration

### `tsconfig.json`
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "paths": {
      "@/*": ["./*"]
    },
    "forceConsistentCasingInFileNames": true
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts"
  ],
  "exclude": ["node_modules"]
}
```

### Strict Mode Benefits
- ✅ Catch errors at compile time
- ✅ Better IDE autocomplete
- ✅ Self-documenting code
- ✅ Safer refactoring
- ✅ Improved maintainability

## 📦 Dependencies

### TypeScript Dependencies
```json
{
  "devDependencies": {
    "@types/node": "^20.11.0",
    "@types/react": "^18.2.48",
    "@types/react-dom": "^18.2.18",
    "@types/uuid": "^9.0.7",
    "typescript": "^5.3.3"
  }
}
```

## 🧪 Type Checking

### Manual Type Check
```bash
npx tsc --noEmit
```

### VS Code Integration
TypeScript errors will appear inline in VS Code with:
- Red squiggly lines for errors
- Hover tooltips for type information
- IntelliSense autocomplete

## 🎯 API Endpoints

### POST /api/contact
Submit a contact form with full type safety.

**TypeScript Request:**
```typescript
const response = await fetch('/api/contact', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    message: 'Hello!'
  })
})

const data: ApiResponse = await response.json()
```

**TypeScript Response:**
```typescript
interface ApiResponse {
  success: true
  message: string
  data: {
    id: string
    name: string
    email: string
  }
}
```

### GET /api/contacts
Retrieve all contacts with type-safe response.

**TypeScript Response:**
```typescript
interface ContactsResponse {
  success: true
  data: ContactSubmission[]
  total: number
}
```

## 🌟 Features

### Type-Safe Features
- ✅ Fully typed React components
- ✅ Type-safe API routes
- ✅ MongoDB operations with types
- ✅ Form validation with TypeScript
- ✅ Event handlers with proper types
- ✅ Generic utility types
- ✅ Strict null checks
- ✅ Type inference throughout

### UI/UX Features
- 🎨 Beautiful, responsive design
- 📱 Mobile-first approach
- ⚡ Fast page loads with Next.js 14
- 🎭 Smooth animations
- 🔔 Toast notifications
- 📝 Form validation
- 🖼️ Professional imagery

## 🔒 Type Safety Examples

### Form Handling
```typescript
// Type-safe input change handler
const handleChange = (
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
): void => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  })
}
```

### API Calls
```typescript
// Type-safe fetch with error handling
try {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  })
  
  const data: ApiResponse = await response.json()
  
  if (response.ok) {
    // Type-safe success handling
    toast.success(data.message)
  } else {
    // Type-safe error handling
    toast.error(data.error || 'Failed')
  }
} catch (error) {
  // Proper error type handling
  const message = error instanceof Error ? error.message : 'Unknown error'
  console.error(message)
}
```

### Database Operations
```typescript
// Type-safe MongoDB operations
await db
  .collection<ContactSubmission>('contacts')
  .insertOne(contactSubmission)

const contacts = await db
  .collection<ContactSubmission>('contacts')
  .find({})
  .toArray()
```

## 📚 Best Practices

### 1. Always Define Interfaces
```typescript
// ✅ Good
interface Props {
  name: string
  age: number
}

// ❌ Avoid
const props: any = { name: 'John', age: 30 }
```

### 2. Use Generic Types
```typescript
// ✅ Good
interface ApiResponse<T> {
  data: T
  error?: string
}

// Usage
const response: ApiResponse<ContactSubmission[]> = await fetchContacts()
```

### 3. Proper Event Typing
```typescript
// ✅ Good
const handleClick = (e: MouseEvent<HTMLButtonElement>): void => {
  e.preventDefault()
  // ...
}

// ❌ Avoid
const handleClick = (e: any) => { /* ... */ }
```

### 4. Use Type Inference
```typescript
// ✅ Good - TypeScript infers the type
const services = [{ title: 'Service 1', icon: <Icon /> }]

// ❌ Unnecessary - type is already inferred
const services: Array<{ title: string; icon: JSX.Element }> = [...]
```

## 🚀 Production Build

Build with TypeScript checking:
```bash
yarn build
```

This will:
1. Run TypeScript type checking
2. Compile TypeScript to JavaScript
3. Optimize for production
4. Generate static pages where possible

## 📝 Customization

All types are defined in `/app/types/index.ts`. Update them as needed:

```typescript
// Add new fields to ContactSubmission
export interface ContactSubmission {
  id: string
  name: string
  email: string
  message: string
  status: 'new' | 'read' | 'replied'  // Union type for status
  phone?: string  // Optional field
  createdAt: string
  updatedAt: string
}
```

## 🤝 Contributing

When adding new features:
1. Define types in `/app/types/index.ts`
2. Use proper TypeScript syntax
3. Run `npx tsc --noEmit` to check for errors
4. Test thoroughly

## 📄 License

All rights reserved © 2025

---

## 🎓 Learning Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Next.js with TypeScript](https://nextjs.org/docs/basic-features/typescript)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [MongoDB TypeScript](https://www.mongodb.com/docs/drivers/node/current/fundamentals/typescript/)

---

**Built with ❤️ using TypeScript, Next.js 14, MongoDB, and shadcn/ui**
