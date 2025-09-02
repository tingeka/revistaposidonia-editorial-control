// Core WordPress entities
export interface WPAuthor {
  id: number;
  name: string;
}

export interface WPFeaturedMedia {
  source_url: string;
}

export interface WPPost {
  id: number;
  title: { rendered: string };
  link: string;
  date: string;
  _embedded?: {
    author?: WPAuthor[];
    'wp:featuredmedia'?: WPFeaturedMedia[];
  };
}