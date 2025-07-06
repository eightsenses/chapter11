import { Category } from './categories';

export type Post = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  thumbnailUrl: string;
  postCategories: {
    category: Category;
  }[];
};

export type PostInput = {
  title: string;
  content: string;
  thumbnailUrl: string;
  categories: { id: number }[];
};
