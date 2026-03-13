export type AppendedArticleAttributes = { slug: string; banner: string | null };
export type ArticleAttributes = {
  createdAt: string;
  updatedAt: string;
  title: string;
  publishedAt?: string;
  authors: string[];
  summary: string;
  videoId?: string;
};
export type ArticleModel = { attributes: ArticleAttributes & AppendedArticleAttributes };
