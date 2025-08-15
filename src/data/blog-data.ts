import type { BlogPost, Category, Comment } from '../types/blog';

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of Web Development: What to Expect in 2024',
    excerpt: 'Explore the latest trends and technologies that will shape the web development landscape in the coming year.',
    content: 'Full article content here...',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop',
    category: 'Technology',
    author: 'Sarah Johnson',
    date: '2024-01-15',
    readTime: '5 min read',
    featured: true
  },
  {
    id: '2',
    title: 'Sustainable Living: Small Changes, Big Impact',
    excerpt: 'Discover simple yet effective ways to reduce your environmental footprint and live more sustainably.',
    content: 'Full article content here...',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
    category: 'Lifestyle',
    author: 'Michael Chen',
    date: '2024-01-12',
    readTime: '4 min read'
  },
  {
    id: '3',
    title: 'The Art of Mindful Cooking: Finding Joy in the Kitchen',
    excerpt: 'Transform your cooking experience from a chore into a meditative practice that nourishes both body and soul.',
    content: 'Full article content here...',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop',
    category: 'Food',
    author: 'Emma Rodriguez',
    date: '2024-01-10',
    readTime: '6 min read'
  },
  {
    id: '4',
    title: 'Digital Nomad Life: Working from Anywhere',
    excerpt: 'Learn the ins and outs of building a successful remote career while traveling the world.',
    content: 'Full article content here...',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    category: 'Travel',
    author: 'David Kim',
    date: '2024-01-08',
    readTime: '7 min read'
  },
  {
    id: '5',
    title: 'The Psychology of Color in Design',
    excerpt: 'Understanding how color choices influence user behavior and create emotional connections.',
    content: 'Full article content here...',
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&h=600&fit=crop',
    category: 'Design',
    author: 'Lisa Wang',
    date: '2024-01-05',
    readTime: '5 min read'
  },
  {
    id: '6',
    title: 'Building Healthy Habits: A Science-Based Approach',
    excerpt: 'Discover the neuroscience behind habit formation and how to create lasting positive changes.',
    content: 'Full article content here...',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
    category: 'Health',
    author: 'Alex Thompson',
    date: '2024-01-03',
    readTime: '8 min read'
  }
];

export const categories: Category[] = [
  { id: '1', name: 'Technology', count: 12, color: 'bg-blue-100 text-blue-800' },
  { id: '2', name: 'Lifestyle', count: 8, color: 'bg-green-100 text-green-800' },
  { id: '3', name: 'Food', count: 15, color: 'bg-orange-100 text-orange-800' },
  { id: '4', name: 'Travel', count: 10, color: 'bg-purple-100 text-purple-800' },
  { id: '5', name: 'Design', count: 6, color: 'bg-pink-100 text-pink-800' },
  { id: '6', name: 'Health', count: 9, color: 'bg-red-100 text-red-800' }
];

export const comments: Comment[] = [
  {
    id: '1',
    articleId: '1',
    author: 'Alex Johnson',
    content: 'This is exactly what I was looking for! The insights about web development trends are spot on. Looking forward to more content like this.',
    date: '2024-01-15T10:30:00Z',
    replies: [
      {
        id: '1-1',
        articleId: '1',
        author: 'Sarah Chen',
        content: 'I agree! The section about AI integration was particularly interesting.',
        date: '2024-01-15T11:15:00Z'
      }
    ]
  },
  {
    id: '2',
    articleId: '1',
    author: 'Mike Rodriguez',
    content: 'Great article! I\'ve been following these trends and it\'s good to see them all summarized in one place. The predictions for 2024 seem very realistic.',
    date: '2024-01-14T16:45:00Z'
  },
  {
    id: '3',
    articleId: '2',
    author: 'Emma Wilson',
    content: 'I\'ve been trying to live more sustainably and these tips are really practical. The small changes approach makes it feel achievable.',
    date: '2024-01-13T09:20:00Z'
  },
  {
    id: '4',
    articleId: '3',
    author: 'David Kim',
    content: 'As someone who loves cooking, this article really resonated with me. The mindful approach to cooking has completely changed my relationship with food.',
    date: '2024-01-12T14:30:00Z'
  }
];
