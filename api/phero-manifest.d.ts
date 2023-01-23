export declare namespace domain {
    namespace v_1_0_0 {
        enum ArticleComponentType {
            Paragraph = "paragraph",
            Image = "image",
            Quote = "quote"
        }
        type ArticleComponent = {
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
        interface Article {
            id: string;
            title: string;
            components: domain.v_1_0_0.ArticleComponent[];
        }
        class ArticleNotFoundError extends Error {
            constructor(message: string);
        }
    }
}
export declare namespace articleService {
    namespace v_1_0_0 {
        function getArticle(id: string): Promise<domain.v_1_0_0.Article>;
        function listArticles(): Promise<domain.v_1_0_0.Article[]>;
    }
}
