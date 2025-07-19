# SMKWeb Blog System

A comprehensive blog system integrated with the existing SMK Web project, featuring a modern admin panel and beautiful GSAP animations.

## Features

### Blog System
- ✅ Blog listing page with responsive grid layout (3 cards per row)
- ✅ Individual blog post pages with detailed view
- ✅ GSAP animations matching existing site design
- ✅ Responsive design with Tailwind CSS
- ✅ SEO-friendly URLs with slugs
- ✅ Published/draft status management

### Admin Panel
- ✅ Secure login system with JWT authentication
- ✅ Dashboard for managing blog posts
- ✅ Create, edit, delete blog posts
- ✅ Rich content editor
- ✅ Image upload support
- ✅ Draft/published status toggle

### Technical Implementation
- ✅ MongoDB Atlas integration with Mongoose
- ✅ Next.js API routes for backend functionality
- ✅ TypeScript throughout
- ✅ Session-based authentication
- ✅ Secure password hashing with bcryptjs

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in the root directory:

```env
# MongoDB connection string
MONGODB_URI=your_mongodb_atlas_connection_string

# JWT secret for admin authentication
JWT_SECRET=your_jwt_secret_key_here
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create Admin User

Run the setup script to create the initial admin user:

```bash
node scripts/create-admin.js
```

Default credentials:
- Username: `admin`
- Password: `admin123`

⚠️ **Important**: Change the default password after first login!

### 4. Start Development Server

```bash
npm run dev
```

## Usage

### Accessing the Blog
- **Public Blog**: Visit `/blog` to see all published posts
- **Individual Posts**: Visit `/blog/[slug]` for specific posts
- **Admin Panel**: Visit `/admin` to manage posts (requires login)

### Managing Blog Posts

1. **Login**: Go to `/admin/login` and use your credentials
2. **Dashboard**: After login, you'll see the admin dashboard at `/admin/dashboard`
3. **Create Post**: Click "Create New Post" to add content
4. **Edit Post**: Click "Edit" on any existing post
5. **Delete Post**: Click "Delete" to remove posts
6. **Publish**: Toggle the "Published" checkbox to make posts public

### Navigation Integration

The blog has been integrated into the main site navigation:
- Added "Блог" link to the header navigation
- Updated navigation data in `data/data.ts`
- Consistent styling with existing site design

## File Structure

```
app/
├── blog/
│   ├── page.tsx              # Blog listing page
│   └── [slug]/
│       └── page.tsx          # Individual post page
├── admin/
│   ├── page.tsx              # Admin redirect
│   ├── login/
│   │   └── page.tsx          # Admin login
│   └── dashboard/
│       └── page.tsx          # Admin dashboard
└── api/
    ├── blog/
    │   ├── route.ts          # Blog CRUD operations
    │   └── [slug]/
    │       └── route.ts      # Individual post operations
    └── admin/
        ├── login/
        │   └── route.ts      # Admin authentication
        └── logout/
            └── route.ts      # Admin logout

components/
├── blog/
│   ├── BlogCard.tsx          # Blog post card component
│   └── BlogGrid.tsx          # Blog grid layout
└── admin/
    └── BlogPostForm.tsx      # Form for creating/editing posts

lib/
├── db.ts                     # Database connection
├── auth.ts                   # Authentication utilities
└── models/
    ├── BlogPost.ts           # Blog post schema
    └── Admin.ts              # Admin user schema

scripts/
└── create-admin.js           # Admin user creation script
```

## Database Schema

### BlogPost
```typescript
interface IBlogPost {
  _id: string;
  title: string;
  description: string;
  content: string;
  image: string;
  slug: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### Admin
```typescript
interface IAdmin {
  _id: string;
  username: string;
  password: string; // hashed with bcryptjs
  createdAt: Date;
  updatedAt: Date;
}
```

## API Endpoints

### Blog Posts
- `GET /api/blog` - Get all posts (with pagination)
- `POST /api/blog` - Create new post
- `GET /api/blog/[slug]` - Get specific post
- `PUT /api/blog/[slug]` - Update post
- `DELETE /api/blog/[slug]` - Delete post

### Admin
- `POST /api/admin/login` - Admin login
- `POST /api/admin/logout` - Admin logout

## Security Features

- JWT-based authentication
- HTTP-only cookies for session management
- Password hashing with bcryptjs
- Protected admin routes
- Input validation and sanitization

## Development Notes

- The system uses the existing design system and color scheme
- GSAP animations are consistent with the rest of the site
- All components are responsive and mobile-friendly
- TypeScript is used throughout for type safety
- ESLint warnings about `<img>` vs `<Image>` are intentional for simplicity

## Future Enhancements

Potential improvements that could be added:
- File upload to cloud storage (Cloudinary, AWS S3)
- Rich text editor (TinyMCE, Quill)
- Categories and tags system
- Comment system
- Search functionality
- RSS feed generation
- Social media sharing
- SEO meta tags optimization