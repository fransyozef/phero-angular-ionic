export interface Article {
    id: string
    title: string
    components: ArticleComponent[]
  }
  
export enum ArticleComponentType {
    Paragraph = "paragraph",
    Image = "image",
    Quote = "quote",
  }
  
export type ArticleComponent =
    | { type: ArticleComponentType.Paragraph; content: string }
    | { type: ArticleComponentType.Image; url: string }
    | { type: ArticleComponentType.Quote; quote: string; source: string }

export class ArticleNotFoundError extends Error {
  constructor() {
    super(`Article not found`)
  }
}
  