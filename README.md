# WhyCrew Portfolio Website

A Fortune 500-level Next.js portfolio website for WhyCrew - Elite staff offshoring company specializing in cybersecurity and AI development.

## Features

- **Modern Tech Stack**: Next.js 14, TypeScript, Tailwind CSS, Framer Motion
- **Responsive Design**: Mobile-first approach with glass morphism effects
- **Performance Optimized**: Image optimization, lazy loading, and SEO-ready
- **Dynamic Portfolio**: Automatically generates portfolio from images folder structure
- **Cybersecurity Focus**: Custom cyber-themed design elements and animations
- **Fortune 500 Ready**: Enterprise-grade code quality and structure

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom cyber theme
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **UI Components**: Radix UI primitives
- **Image Optimization**: Next.js Image component with Sharp

## Project Structure

```
src/
├── app/                 # Next.js 14 App Router
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components
│   ├── header.tsx      # Navigation header
│   ├── hero.tsx        # Hero section
│   ├── services.tsx    # Services showcase
│   ├── portfolio.tsx   # Dynamic portfolio
│   ├── expertise.tsx   # Technical skills
│   ├── contact.tsx     # Contact form
│   └── footer.tsx      # Site footer
├── data/               # Static data and configurations
├── lib/                # Utility functions and configurations
└── images/             # Portfolio project images
```

## Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   npm start
   ```

## Portfolio Management

The portfolio system automatically reads from the `images/` folder structure:

```
images/
├── project-name-1/
│   ├── image1.png
│   ├── image2.png
│   └── image3.png
└── project-name-2/
    ├── screenshot1.png
    └── screenshot2.png
```

Each folder becomes a project with:
- Auto-generated title from folder name
- All images in the folder as project screenshots
- Customizable project details in `src/data/projects.ts`

## Customization

### Brand Colors
Update cyber theme colors in `tailwind.config.ts`:
```typescript
cyber: {
  blue: '#00d4ff',
  purple: '#8b5cf6',
  green: '#10b981',
  orange: '#f59e0b',
}
```

### Content
- **Services**: Edit `src/components/services.tsx`
- **Expertise**: Modify `src/components/expertise.tsx`
- **Projects**: Update `src/data/projects.ts`
- **Contact Info**: Change `src/components/contact.tsx`

## Performance Features

- ✅ Image optimization with Next.js Image
- ✅ Lazy loading for all components
- ✅ SEO-optimized metadata
- ✅ Structured data for search engines
- ✅ Progressive Web App ready
- ✅ Core Web Vitals optimized

## Deployment

This project is optimized for:
- **Vercel** (recommended)
- **Netlify**
- **AWS Amplify**
- **Any Node.js hosting**

## License

Private - WhyCrew Proprietary