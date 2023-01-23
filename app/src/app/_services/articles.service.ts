import { Injectable } from '@angular/core';


import { PheroClient,Article } from "../../phero.generated";
const fetch = window.fetch.bind(this);
const pheroClient = new PheroClient(fetch);

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor() { }

  async getArticles(): Promise<Article[]> {
    return await pheroClient.articleService.listArticles()
  }

  async getArticle(id: string): Promise<Article> {
    return await pheroClient.articleService.getArticle(id)
  }

}
