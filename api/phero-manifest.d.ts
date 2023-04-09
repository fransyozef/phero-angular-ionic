export interface Article {
    id: string;
    title: string;
    components: ArticleComponent[];
}
export type ArticleComponent = {
    type: ArticleComponentType.Paragraph;
    content: string;
} | {
    type: ArticleComponentType.Image;
    url: string;
} | {
    type: ArticleComponentType.Quote;
    quote: string;
    source: string;
};
export enum ArticleComponentType {
    Paragraph = "paragraph",
    Image = "image",
    Quote = "quote"
}
export class ArticleNotFoundError extends Error {
    constructor(message: string);
}
export abstract class PheroService<TContext = {}> {
}
export class articleService extends PheroService {
    getArticle(id: string): Promise<Article>;
    listArticles(): Promise<Article[]>;
}