import { Component, OnInit } from '@angular/core';
import { Article, ArticleNotFoundError } from "../../phero.generated";
import { ArticlesService } from '../_services/articles.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  articles: Article[] = [];

  constructor(
    private articlesService: ArticlesService
  ) {}

  async getArticles() {
    try {
      const articles = await this.articlesService.getArticles();
      console.log(articles);
      this.articles = articles;
    } catch (e) { 
      console.log("Something went wrong");
    }
  }

  async getArticle() {
    try {
      const article = await this.articlesService.getArticle('aaaaa');
      console.log(article);
    } catch (error) {
      if (error instanceof ArticleNotFoundError) {
        console.log(error.message);
      } else {
        console.log("Something went wrong")
      }
    }
  }

}
