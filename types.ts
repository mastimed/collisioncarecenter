
export enum Category {
  REPAIR = 'Repair & Bodywork',
  INSURANCE = 'Insurance & Claims',
  SAFETY = 'Safety & Innovation',
  MAINTENANCE = 'Auto Maintenance',
  INDUSTRY = 'Industry News'
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: Category;
  author: string;
  publishDate: string;
  imageUrl: string;
  featured?: boolean;
  tags: string[];
}
