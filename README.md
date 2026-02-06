# Professional Copywriting Portfolio Website

A stunning, modern portfolio website built with Next.js for showcasing copywriting services and work samples.

## Features

### 🎨 Beautiful Sections
- **Hero Section**: Eye-catching introduction with professional workspace imagery and key statistics (50+ projects, 98% satisfaction, 5+ years experience)
- **Services Section**: 6 comprehensive copywriting services with icons and descriptions
  - Website Copy
  - Brand Storytelling
  - Email Marketing
  - Social Media Content
  - Ad Copy
  - Blog Posts & Articles
- **Portfolio Section**: 3 featured work samples with images, categories, and measurable results
- **About Section**: Professional bio with skills and expertise
- **Testimonials**: 3 client testimonials with 5-star ratings
- **Contact Form**: Fully functional form that saves submissions to MongoDB

### 💻 Technical Stack
- **Frontend**: Next.js 14 with React
- **UI Components**: shadcn/ui + Radix UI
- **Styling**: Tailwind CSS with custom design tokens
- **Database**: MongoDB
- **Form Handling**: React Hook Form with validation
- **Notifications**: Sonner toast notifications
- **Icons**: Lucide React

### 🎯 Key Features
- Fully responsive design (mobile, tablet, desktop)
- Smooth scroll navigation
- Form validation (email format, required fields)
- MongoDB integration for contact submissions
- Beautiful gradients and animations
- Professional color scheme
- SEO-optimized metadata

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB running locally or connection string in .env
- Yarn package manager

### Installation

1. Install dependencies:
```bash
yarn install
```

2. Set up environment variables:
The `.env` file should contain:
```
MONGO_URL=your_mongodb_connection_string
NEXT_PUBLIC_BASE_URL=your_app_url
```

3. Run the development server:
```bash
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## API Endpoints

### POST /api/contact
Submit a contact form entry.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Your message here"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Your message has been sent successfully!",
  "data": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Validation Errors (400):**
- Missing required fields
- Invalid email format

### GET /api/contacts
Retrieve all contact submissions (admin endpoint).

**Response (200 OK):**
```json
{
  "success": true,
  "data": [...],
  "total": 10
}
```

## Database Schema

### contacts Collection
```javascript
{
  id: UUID (string),
  name: string,
  email: string,
  message: string,
  status: "new",
  createdAt: ISO timestamp,
  updatedAt: ISO timestamp
}
```

## Customization

### Update Personal Information
Edit `/app/app/page.js` to customize:
- Name and tagline
- Services offered
- Portfolio projects
- Testimonials
- Contact information (email, phone, location)
- Statistics (projects completed, satisfaction rate, years of experience)

### Change Color Scheme
The site uses Tailwind CSS with shadcn/ui design tokens. Colors automatically support dark mode:
- `bg-primary` - Primary brand color
- `bg-secondary` - Secondary accent color
- `bg-muted` - Subtle backgrounds
- `text-foreground` - Main text color

### Add More Services or Projects
In `/app/app/page.js`, find the `services` or `portfolio` arrays and add new entries following the existing structure.

## Project Structure
```
/app
├── app/
│   ├── api/
│   │   └── [[...path]]/
│   │       └── route.js          # Backend API routes
│   ├── page.js                    # Main portfolio page
│   ├── layout.js                  # Root layout with metadata
│   └── globals.css                # Global styles
├── components/
│   └── ui/                        # shadcn/ui components
├── lib/
│   └── utils/                     # Utility functions
├── .env                           # Environment variables
├── package.json                   # Dependencies
└── README.md                      # This file
```

## Testing

The contact form API has been thoroughly tested:
- ✅ Valid form submissions
- ✅ Field validation (name, email, message)
- ✅ Email format validation
- ✅ MongoDB integration
- ✅ Error handling

## Production Deployment

1. Build the application:
```bash
yarn build
```

2. Start the production server:
```bash
yarn start
```

## Support

For questions or issues, please submit a message through the contact form on the website.

## License

All rights reserved © 2025
