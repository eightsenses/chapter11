import { Category } from './categories';

export type Post = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  thumbnailImageKey: string;
  postCategories: {
    category: Category;
  }[];
};

export type PostInput = {
  title: string;
  content: string;
  thumbnailImageKey: string;
  categories: { id: number }[];
};
