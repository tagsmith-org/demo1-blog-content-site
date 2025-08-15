# Blog Homepage - Vue 3 + Tailwind CSS

A responsive blog homepage built with Vue 3, TypeScript, and Tailwind CSS. Features a modern, content-focused design with smooth animations and hover effects.

## Features

- **Responsive Design**: Mobile-first approach with responsive grid layouts
- **Modern UI**: Clean, content-focused design with the specified color scheme
- **Smooth Animations**: Fade-in animations for post cards and hover effects
- **TypeScript**: Full TypeScript support with proper interfaces
- **Vue 3 Composition API**: Modern Vue 3 with script setup syntax
- **Tailwind CSS**: Utility-first CSS framework with custom configurations
- **Unsplash Images**: High-quality images from Unsplash for blog posts

## Design Specifications

- **Primary Color**: #4B5563 (Gray)
- **Secondary Color**: #10B981 (Green)
- **Background**: #FFFFFF (White)
- **Fonts**: 
  - Titles: 'Merriweather', serif
  - Body: 'Open Sans', sans-serif

## Project Structure

```
src/
├── components/
│   ├── BlogHomepage.vue          # Main homepage component
│   ├── HeroSection.vue           # Featured article section
│   ├── RecentPostsSection.vue    # Recent posts grid
│   ├── PostCard.vue              # Individual post card
│   ├── CategoriesSection.vue     # Categories grid
│   ├── CategoryCard.vue          # Individual category card
│   ├── NewsletterSection.vue     # Newsletter signup form
│   └── FooterSection.vue         # Footer with navigation
├── types/
│   └── blog.ts                   # TypeScript interfaces
├── data/
│   └── blog-data.ts              # Sample blog data
├── style.css                     # Global styles and Tailwind imports
├── main.ts                       # Vue app entry point
└── App.vue                       # Root component
```

## Sections

1. **Hero Section**: Featured article with large image and call-to-action buttons
2. **Recent Posts**: 6-card grid with image, title, excerpt, and read more link
3. **Categories**: Clickable category tags with hover effects
4. **Newsletter**: Email signup form with validation
5. **Footer**: Navigation links and social media icons

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd demo-blog-content-site
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Customization

### Adding New Posts

Edit `src/data/blog-data.ts` to add new blog posts:

```typescript
{
  id: 'unique-id',
  title: 'Your Post Title',
  excerpt: 'Brief description of the post...',
  content: 'Full article content...',
  image: 'https://images.unsplash.com/your-image-id?w=800&h=600&fit=crop',
  category: 'Category Name',
  author: 'Author Name',
  date: '2024-01-15',
  readTime: '5 min read',
  featured: false // Set to true for hero section
}
```

### Adding New Categories

Add new categories to the `categories` array in `src/data/blog-data.ts`:

```typescript
{
  id: 'unique-id',
  name: 'Category Name',
  count: 5,
  color: 'bg-blue-100 text-blue-800' // Tailwind color classes
}
```

### Customizing Colors

Edit `tailwind.config.js` to modify the color scheme:

```javascript
colors: {
  primary: '#4B5563',    // Your primary color
  secondary: '#10B981',  // Your secondary color
  background: '#FFFFFF', // Your background color
}
```

## Technologies Used

- **Vue 3**: Progressive JavaScript framework
- **TypeScript**: Type-safe JavaScript
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **VueUse**: Vue composition utilities
- **Unsplash**: High-quality stock photos

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the [MIT License](LICENSE).

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Support

For support and questions, please open an issue in the repository.
