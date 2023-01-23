import { Article, ArticleNotFoundError } from "./article.types";

const articles: Article[] = [
    {
        id: 'asd',
        title : 'article 1',
        components: []
    },
    {
        id: 'lklk',
        title : 'article 2',
        components: []
    }  
]

export async function getArticle(id: string): Promise<Article> {
//     const article: Article = {
//         id,
//         title: `${id} title`,
//         components : []
//     }
//   return article;
throw new ArticleNotFoundError()
}


export async function getArticles(): Promise<Article[]> {
  return articles;
}
