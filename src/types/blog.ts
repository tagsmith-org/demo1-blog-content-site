export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  authorId?: string;
  date: string;
  readTime: string;
  featured?: boolean;
  isPublished?: boolean;
}

export interface Category {
  id: string;
  name: string;
  count: number;
  color: string;
}

export interface NewsletterForm {
  email: string;
}

export interface Comment {
  id: string;
  articleId: string;
  author: string;
  authorId?: string;
  content: string;
  date: string;
  avatar?: string;
  replies?: Comment[];
  isNew?: boolean; // Для отслеживания новых комментариев
  isGuest?: boolean; // Для гостевых комментариев
}

export interface CommentForm {
  content: string;
  author: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  avatar?: string;
  bio?: string;
  joinDate: string;
  isGuest: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  username: string;
  email: string;
  password: string;
  fullName: string;
}

export interface ProfileForm {
  username: string;
  fullName: string;
  bio?: string;
  avatar?: string;
}

export interface LoginResult {
  success: boolean;
  error?: string;
}
